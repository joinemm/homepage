---
title: Scraping prometheus metrics through SSH with NixOS
abstract: Stop opening your ports to the whole world
published: true
date: 2023-12-12
image: prometheus.jpg
tags: [devops, nix, prometheus]
---

The other day I was setting up a Grafana + Prometheus monitoring stack for a client, and everything was going well. I was scraping metrics from various servers with https, protected behind http basic auth (thanks to nginx), until a security audit decided we do not want to open ports 80 or 443 to the world. In fact we don't want to run a web server at all on these servers. So how to get metrics without http access?

## Metrics through ssh?

There are multiple solutions to this problem, one of which would have been firewall setting allowing only connections from our monitoring server. This would still require us to have a running web server though, and keep the firewalls up to date. Then it occurred to me; could the metrics be scraped through ssh? I had not considered this approach but it would solve all our problems. The servers are already accessed with ssh by every other service we run. This required further investigation.

Unfortunately - after reading countless of docs - I found out prometheus does not support scraping metrics through ssh. At this point I was ready to scrap the whole idea, but then I found [sshified](https://github.com/hoffie/sshified).

> sshified acts as an HTTP proxy and forwards all received requests over server-specific SSH connections.

Wait, this sounds perfect for our use case!

<Aside>
Why not just use `ssh -L`? Because the ssh tunnel would have to be kept open indefinitely, which is not very reliable. `sshified` on the other hand opens a new ssh connection for each request.
</Aside>

## Trying out sshified

I got myself a copy of `sshified` and set up a little test.

> IP address `1.2.3.4` here refers to the remote server which does not have any ports open aside from port 22

On the remote server we have `node-exporter` running on port `9100`, and ssh keys set up so I can login with my user.

First we try to query the metrics without a proxy:

```sh
$ curl 1.2.3.4:9100/metrics --connect-timeout 5

curl: (28) Failed to connect to 1.2.3.4 port 9100 after 5002 ms: Timeout was reached
```

The request times out, as expected. It's hitting the firewall. Now lets spin up the proxy on port `8888`.

```sh
./sshified --proxy.listen-addr 127.0.0.1:8888 \
  --ssh.user joinemm \
  --ssh.key-file ~/.ssh/id_ed25519 \
  --ssh.known-hosts-file ~/.ssh/known_hosts \
  --ssh.port 22 -v
```

And request the metrics through that proxy:

```sh
curl --proxy 127.0.0.1:8888 1.2.3.4:9100/metrics
```

The terminal fills with `node-exporter` metrics. It's working! Now we just have to recreate this in nix configuration.

## The nix way

If these were traditional ubuntu servers we would just set these things up manually and be done with it, but we are using NixOS and flakes. Everything must be reproducable.

Unfortunately, `sshified` is not included in [nixpkgs](https://github.com/NixOS/nixpkgs), so installing it is not so straightforward. I had to write my own derivation to build the thing. Thankfully it's just a go module so it's relatively easy to build.

`./pkgs/sshified/default.nix`

```nix
{
  lib,
  buildGoModule,
  fetchFromGitHub,
}:
buildGoModule rec {
  pname = "sshified";
  version = "1.1.15";

  src = fetchFromGitHub {
    owner = "hoffie";
    repo = pname;
    rev = "v${version}";
    sha256 = "sha256-zbgwCWs+DNJ1ZmAl9h0PuJvLO3yMhE/t6T1aqpwYOgk=";
  };

  vendorHash = null;

  ldflags = [
    "-s"
    "-w"
    "-X main.Version=${version}"
  ];

  subPackages = ["."];

  meta = with lib; {
    description = "Acts as an HTTP proxy and forwards all received requests over server-specific SSH connections ";
    homepage = "https://github.com/hoffie/sshified";
    license = licenses.mit;
    maintainers = with maintainers; [joinemm];
    mainProgram = "sshified";
  };
}
```

I should make a PR to nixpkgs to get this merged but for now it's easily imported from a file in our configuration:

```nix
{ ... }: let
  sshified = pkgs.callPackage ../../pkgs/sshified/default.nix {};
in {
...
  environment.systemPackages = [
    sshified
  ];
...
```

After building this configuration, `sshified` is now available in our `$PATH`. But we don't want to launch it manually of course. That's where this systemd service comes in.

```nix
users.users."sshified" = {
  isNormalUser = true;
};

systemd.services."sshified" = {
  wantedBy = ["multi-user.target"];
  after = ["network.target"];
  description = "Run the sshified http-to-ssh proxy";
  serviceConfig = {
    User = "sshified";
    ExecStart = ''
      ${sshified}/bin/sshified \
      --proxy.listen-addr 127.0.0.1:8888 \
      --ssh.user sshified \
      --ssh.key-file ${config.sops.secrets.sshified_private_key.path} \
      --ssh.known-hosts-file /etc/ssh/ssh_known_hosts \
      --ssh.port 22 \
      -v
    '';
  };
};
```

The service is run automatically and makes `sshified` available on port `8888`. You might be wondering where those ssh settings come from, but we'll get there.

Now.

## SSH configuration

The ssh keys need to be set up somehow without manual intervention, and they cannot be leaked to public. For this we use [sops-nix](https://github.com/Mic92/sops-nix). I will not go into usage of sops in this blog post but you can read the docs.

```nix
# this will make the private key readable by our sshified user
sops.secrets.sshified_private_key.owner = "sshified";

# this will create /etc/ssh/ssh_known_hosts
services.openssh.knownHosts = {
    "[1.2.3.4]:22".publicKey = "ssh-ed25519 XXX";
};
```

In addition to this, the public key has to be set up on the remote server side, so that user `sshified` can log in with this pivate key.

## Prometheus configuration

Now that we have a working http-to-ssh tunnel, we can finally tell prometheus to scrape the thing:

```nix
services.prometheus.scrapeConfigs = [
  {
    job_name = "ssh-tunnel";
    scheme = "http";
    proxy_url = "http://127.0.0.1:8888";
    static_configs = [
      {
        targets = [ "1.2.3.4:9100" ];
      }
    ];
  }
]
```

After checking the prometheus dashboard, we can verify that the target is alive! We have now successfully scraped metrics through SSH and our precious ports 80 and 443 stay unbothered.
