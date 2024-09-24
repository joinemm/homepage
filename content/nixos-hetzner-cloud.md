---
title: NixOS on Hetzner cloud VPS
abstract: Installing and configuring NixOS on a Hetzner cloud server
published: false
date: 2024-09-24
image: nixos-cloud.jpg
tags:
  - nix
  - devops
  - linux
---

> This guide assumes you have basic knowledge of NixOS and nix flakes.

Hetzner is a great cloud server provider. It's very cheap and has servers in Germany, Finland and the US. As I'm located in Finland, that datacenter is very useful to me. I can have very low latency VPS in the same country, for very cheap price.

As a NixOS enthusiast, I like to run NixOS on everything. This includes my cloud servers and even my Raspberry Pi 4. Unfortunately, Hetzner does not offer NixOS as one of their OS options when setting up a server. This is where nixos-anywhere comes in.

By using [nixos-anywhere](https://github.com/nix-community/nixos-anywhere), it's possible to replace the operating system of the server while it's running, through an ssh connection.

## Hetzner setup

First you have to set up a new Hetzner server by following the steps on the cloud dashboard. Simply choose Ubuntu as the OS and install your SSH keys as normal. If you are able to SSH as root now, you're good to go.

```sh
ssh root@1.2.3.4
```
## Disks

For formatting the disks, we are going to use disko. This integrates with nixos-anywhere, and it runs the required `fdisk` commands during the installation process.

First we need the device names for the block devices we are going to format. You *could* simply use `/dev/sda`,`/dev/nvme` etc. but it's not very reliable, especially if your server has additional block devices attached (For example Hetzner volumes). Those volume labels can switch around during reboot and cause the system to try to boot from the wrong disk. For this reason, we will use `/dev/disk/by-id`. You could also use UUID, or something else that doesn't change. By running these commands, you should be able to determine the devices you need:

```sh
lsblk
ls -la /dev/disk/by-id
```

Now let's create the  `disk-config.nix` file. Here is an example that defines a single GPT disk with three partitions: `boot`, `ESP` and `root`. The first two are used by the UEFI bootloader, and the rest of the disk is used as the root storage of the server. Note the device string: This should be the one you got from the previous step.

```nix
{
  disko.devices.disk.os = {
    device = "/dev/disk/by-id/scsi-0QEMU_QEMU_HARDDISK_52101387";
    type = "disk";
    content = {
      type = "gpt";
      partitions = {
        boot = {
          type = "EF02";
          size = "1M";
        };
        ESP = {
          type = "EF00";
          size = "512M";
          content = {
            type = "filesystem";
            format = "vfat";
            mountpoint = "/boot";
          };
        };
        root = {
          size = "100%";
          content = {
            type = "filesystem";
            format = "ext4";
            mountpoint = "/";
          };
        };
      };
    };
  };
}
```

In case you need additional volumes, more disks can be added. This example is for Hetzner block storage:

```nix
disko.devices.disk.block = {
  device = "/dev/disk/by-id/scsi-0HC_Volume_100874627";
  type = "disk";
  content = {
    type = "filesystem";
    format = "ext4";
    mountpoint = "/data";
  };
};
```

## System configuration

First we have to add `disko` modules to our `flake.nix`:

```nix
inputs = {
  disko = {
    url = "github:nix-community/disko";
    inputs.nixpkgs.follows = "nixpkgs";
  };
};
```

Now we can create a new host in the flake. The host should consist of `configuration.nix` and `disk-config.nix` in the same directory. Depending on the layout of your flake, it could look something like this:

```nix
nixosConfigurations = {
  hetzner = lib.nixosSystem {
    inherit specialArgs;
    modules = [ ./hosts/hetzner/configuration.nix ];
  };
};
```

We will start building our `configuration.nix` with the following skeleton, importing some things that we will need - including our disk configuration - and setting some basic variables. The [qemu-guest.nix](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/profiles/qemu-guest.nix) is imported from nixpkgs modules, and is responsible for loading the necessary kernel modules to make the VM bootable. Hetzner uses qemu under the hood for their cloud VMs.

```nix
{
  self,
  inputs,
  modulesPath,
  lib,
  ...
}:
{
  imports = [
    (modulesPath + "/profiles/qemu-guest.nix")
    inputs.disko.nixosModules.disko
    ./disk-config.nix
  ];

  system.stateVersion = "24.05"; # the current version at time of writing
  nixpkgs.hostPlatform = "x86_64-linux";
  hardware.enableRedistributableFirmware = true;
  networking.hostName = "hetzner";
  time.timeZone = "UTC";
}
```

For the networking, I've found using DHCP to be sufficient. The `net.ifnames=0` kernel parameter makes the network interfaces use more familiar names (`eth0`).

```nix
networking.useDHCP = true;

boot.kernelParams = [ "net.ifnames=0" ];
```

Grub as the bootloader works great with Hetzner. We will also be using UEFI.

```nix
boot.loader.grub = {
  efiSupport = true;
  efiInstallAsRemovable = true;
};
```

Next we need to add our user and enable SSH login. Don't forget this step or you will be locked out of the system. It's also a good idea to add some essential packages and enable bash completion.

```nix
users.users.admin = {
  isNormalUser = true;
  openssh.authorizedKeys.keys = [
    "ssh-ed25519 XXX"
  ];
  extraGroups = [ "wheel" ];
};

services.openssh.enable = true;

environment.systemPackages = with pkgs; [
  vim
  git
];

programs.bash.enableCompletion = true;
```

Finally, enable the user to use `sudo` without password. This makes it easier to update the server remotely.

```nix
security.sudo = {
  enable = true;
  wheelNeedsPassword = false;
};
```
## Installation

Now we are ready to proceed with the installation. `nixos-anywhere` can be easily used with `nix run`. This command builds the flake attribute `#hetzner`, and installs it into the server. More information is available in the [nixos-anywhere docs](https://github.com/nix-community/nixos-anywhere/blob/main/docs/quickstart.md)

```sh
nix run github:nix-community/nixos-anywhere -- --flake .#hetzner root@1.2.3.4
```

Once the installation completes, your server is running NixOS! You can now try doing a reboot and see that everything boots up fine and there are no errors in journalctl.

## Updating

You might have a NixOS server now, but it's not doing anything yet. After you have added more services to your configuration, you need to deploy this new configuration to the server. The simplest way to accomplish this is to use the built flags of`nixos-rebuild`:

```sh
nixos-rebuild switch --target-host admin@1.2.3.4 --use-remote-sudo --flake .#hetzner
```

For more advanced setups with multiple servers, I would recommend using [deploy-rs](https://github.com/serokell/deploy-rs).