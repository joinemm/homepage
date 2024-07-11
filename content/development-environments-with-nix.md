---
title: Easy development environments with Nix shells
abstract: Say goodbye to installing every package on the system level
published: true
date: 2024-01-23
image: shell.jpg
tags: [devops, nix, python]
---

I work on a lot of projects, on many computers. Trying to keep all the software I need on all of them (and on a consistent version) has proved to be a challenging task. Sure virtualenvs or docker containers solve this partially, when you expect some cli tool to be there and it's not, that can really break your flow.

## Devenv

Meet [devenv](https://devenv.sh/).

> Fast, Declarative, Reproducible, and Composable Developer Environments using Nix

Not only does this solve my problem, it also feeds my recent obsession with Nix :D

Devenv can be set up a couple of ways, but I immediately jumped into [flakes](https://devenv.sh/guides/using-with-flakes/) as I've been writing a lot of flakes for my [NixOS configuration](http://git.joinemm.dev/snowflake).

Here is the `flake.nix` boilerplate to use devenv. Simply copy this into the root of your project and start adding configuration:

```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
    devenv.url = "github:cachix/devenv";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = {
    nixpkgs,
    devenv,
    ...
  } @ inputs: let
    pkgs = nixpkgs.legacyPackages."x86_64-linux";
  in {
    devShell.x86_64-linux = devenv.lib.mkShell {
      inherit inputs pkgs;
      modules = [
        ({
          pkgs,
          lib,
          ...
        }: {
          # devenv configuration goes here
        })
      ];
    };
  };
}
```

## Configuration

So what can you configure then?

### Languages

Enabling the python interpreter and installing poetry for dependency management.

```nix
... }: {
  languages.python = {
    enable = true;
    poetry.enable = true;
  };
}
```

### Packages

Installing packages from nixpkgs, like ffmpeg and python linting/formatting tools.

```nix
... }: {
  packages = with pkgs; [
    ffmpeg
    isort
    black
    ruff
    reuse
  ];
}
```

### Scripts / Aliases

You can even write custom shell scripts to be added to the environment. This is useful to avoid typing out long commands you use often (poetry...).

```nix
... }: {
  scripts."run".exec = ''
    poetry run python main.py $1
  '';
}
```

This way I can easily run `main.py foo` by just typing `run foo`.

### Pre-commit hooks

Take away the pain of managing pre-commit hooks and let nix do it for you. This option has one pretty big flaw though: It overwrites your manually written `.pre-commit-config.yml` with a symlink to the nix store. This means you will not be able to use hooks written by your non-enlightened (not using nix) coworkers, nor share this one with them. The files will be in conflict. **You have been warned**.

For personal projects it's nice though.

```nix
... }: {
  pre-commit.hooks = {
    isort.enable = true;
    black.enable = true;
    ruff = {
      enable = true;
      entry = lib.mkForce "${pkgs.ruff}/bin/ruff --fix --ignore=E501";
    };
  };
}
```

Here I am adding `isort`, `black` and `ruff` as pre-commit hooks for my project, and adding extra args for ruff to ignore `E501` (line too long) errors.

> Note that these tools do *not* have to be installed separately as packages to use them in pre-commit hook. I am just doing it so I can run them manually.

### Bringing it together

Here is my current `flake.nix` for [Miso Bot](https://git.joinemm.dev/miso-bot)

```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
    devenv.url = "github:cachix/devenv";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = {
    nixpkgs,
    devenv,
    ...
  } @ inputs: let
    pkgs = nixpkgs.legacyPackages."x86_64-linux";
  in {
    devShell.x86_64-linux = devenv.lib.mkShell {
      inherit inputs pkgs;
      modules = [
        ({
          pkgs,
          lib,
          ...
        }: {
          dotenv.disableHint = true;

          packages = with pkgs; [
            ffmpeg
            isort
            black
            ruff
            reuse
          ];

          pre-commit.hooks = {
            isort.enable = true;
            black.enable = true;
            ruff = {
              enable = true;
              entry = lib.mkForce "${pkgs.ruff}/bin/ruff --fix --ignore=E501";
            };
          };

          languages.python = {
            enable = true;
            poetry.enable = true;
          };

          scripts."run".exec = ''
            poetry run python main.py $1
          '';
        })
      ];
    };
  };
}
```

## Usage

Now that we have this environment configured in `flake.nix`, how do we use it?

Simply run:

```sh
nix develop --impure
```

The building of the nix packages will take some time but eventually you will be dropped in a bash shell containing the environment you specified. If you're a zsh (or some other shell) user like me, you might be wondering; Do I really have to use bash now? Don't worry. There is a fix for that:

```sh
# exit the bash shell you're now in
exit

# relaunch the devshell with your own shell
nix develop --impure -c $SHELL
```

Now you have the same shell but it's using zsh and keeps all your zsh config/aliases. Speaking of aliases, I have made this alias to greatly simplify the change into a devshell:

```sh
alias dev="nix develop --impure -c $SHELL"
```

Allowing me to simply write "dev" once I'm in my project folder.

> It is possible to use `direnv` and `.envrc` to change into the devshell automatically, but I tried that and did not like it. I don't *always* need the devshell if I'm simply browsing files and it's easy enough to do manually.

## Caching

If you are using nix garbage collection, then the devshell derivations are deleted by the nix garbage collector. This can be annoying, as you will have to rebuild your environment all the time. To remedy this, add this to your nix configuration:

```nix
nix.extraOptions = ''
  keep-outputs = true
  keep-derivations = true
'';
```
