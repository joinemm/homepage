---
title: Adding Github login to your Grafana instance
abstract: OAuth2 for the win
date: 2025-02-07
published: true
image: grafana-login.png
tags:
  - devops
  - grafana
  - nix
---
Managing Grafana users and password manually is so `$currentYear - 1`. Why not delegate this to Github? Assuming you keep the permissions of your Github organization up to date, the Grafana access will sync with it.

Grafana does have [documentation](https://grafana.com/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/github/) for this, but it's not up to date, and only describes how to use the legacy OAuth App for the process. Github now recommends using the new Github Apps instead when possible. The difference between these two is subtle, but very important:

- OAuth app acts on behalf of a user. If you want the whole org to be able to log in, the org admin has to create this app in the org settings.
- Github App is a first-class integration to Github, and acts independent of any users. It can be created by a developer, and then installed into the org that needs it.

## Create the Github App

1. Navigate to [https://github.com/settings/apps/new](https://github.com/settings/apps/new)
2. Fill in the required fields:
    - App name and homepage can be whatever you want.
    - Callback URL is the important part, enter the following: `https://<YOUR-GRAFANA-URL>/login/github` and substitute with the domain of your Grafana instance.
    - Disable the webhook, we don't need it.
    - In organization permissions, allow read-only access to "Members".
    - Allow the app to be installed to any account.
    - Rest can be left default.

3. Once created, generate a private key and client secret. You will need the client secret and client id so save these somewhere.
4. Go to advanced tab and make the app public. Without this you cannot install it into any org.
5. Install the app into your org. If you are not the admin, you can request the installation.

## Grafana configuration

I have my Grafana instance configured in nix, but anything under the `settings` attribute set can be applied identically into `grafana.ini`.

```nix
 services.grafana = {
 enable = true;

    settings = {
      server = {
        http_port = 3300;
        http_addr = "127.0.0.1";
        
        enforce_domain = true;
        domain = "monitoring.misobot.xyz";
        root_url = "https://%(domain)s/";
      };

      "auth.github" = {
        enabled = true;
        
        client_id = "$__file{${config.sops.secrets.github_client_id.path}}";
        client_secret = "$__file{${config.sops.secrets.github_client_secret.path}}";
        
        allowed_organizations = [ "miso-bot" ];
        allow_assign_grafana_admin = true;
        role_attribute_path = "login == joinemm && 'GrafanaAdmin'";
      };

      "auth.basic".enabled = false;
    };
};
```

In the `server` section, it's important to set a domain name and change the `root_url` if you are running Grafana behind a reverse proxy, as by default tries using http with port 3000 as the redirect url for auth. Read more [here](https://github.com/grafana/grafana/issues/11817#issuecomment-387131608)

`"auth.github"` this is where we configure the Github auth. You can fill in your `client_id` and `client_secret` that you saved earlier. I have defined them as [sops](https://github.com/Mic92/sops-nix) secrets, and Grafana can read them from the files at `/run/secrets` by using `$__file{}`.

The access control comes next. The Github organization where I've installed this app is called `miso-bot`, and I'm only allowing people within this org to log in. `role_attribute_path` defines what Grafana roles the users should get. Here I have created a simple check to give myself the `GrafanaAdmin` role. For a more granular permission check, you could use something like:

```nix
role_attribute_path = lib.strings.concatStringsSep " || " [
  "contains(groups[*], '@miso-bot/admins') && 'GrafanaAdmin'"
  "contains(groups[*], '@miso-bot/contributors') && 'Editor'"
];
```

This example maps the `admins` team to `GrafanaAdmin`, and `contributors` to `Editor`. If the user is not part of either, they will get the `Viewer` role by default.

Finally, I disable the basic auth with username and password. This is optional, but makes it clear that you should use Github to log in.

And there you have it! A secure way to control your Grafana access!
