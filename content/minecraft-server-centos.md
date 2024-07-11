---
title: Setting up a Minecraft server with mods on CentOS
abstract: The best way to set up your next Minecraft server
published: true
date: 2022-09-11
image: minecraft.jpg
tags: [gaming, linux, server]
---

Always wanted to host your own Minecraft server but don't know how? In this tutorial, we'll go through the steps necessary to install and configure Minecraft Server on a CentOS 9 headless server. We're going to use systemd to run the Minecraft server and the mcrcon utility for server maintenance. We'll also set up automated server backups using a cron job.

## Prerequisites

First you obviously need a CentOS server. My preferred provider is [Hetzner](https://hetzner.joinemm.dev) due to them being based in Europe and offering competitive prices. For my small server I chose a 3 vcore 4gb Ram machine.

We'll also need [EPEL](https://docs.fedoraproject.org/en-US/epel/) to install the latest version of java on CentOS.

```sh
dnf config-manager --set-enabled crb
dnf install epel-release epel-next-release
```

Since the Minecraft Server doesn't need a graphical user interface, we can install the headless version of the openjdk.

```sh
yum install java-latest-openjdk-headless
```

For editing the config files I like to use vim, but you can substitute that with your favourite text editor such as nano.

```sh
yum install git neovim
```

### Create the minecraft user

We don't want to run the minecraft server as root for security reasons. Let's create a new user and group `minecraft` with home directory `/opt/minecraft`:

```sh
useradd -r -m -U -d /opt/minecraft -s /bin/bash minecraft
```

We are not going to set a password for this user. This is good security practice because this user will not be able to login via SSH. To change to the minecraft user you'll need to be logged in to the server as root or user with sudo privileges.

Switch to the minecraft user:

```sh
su - minecraft
```

First we're going to make some folders. Make sure you're in the home folder (`/opt/minecraft` in our case).

```sh
mkdir {server,scripts,backups}
```

## Download the server.jar

Vanilla minecraft versions can be found [here](https://mcversions.net). Browse to your preferred version and right click the `Download Server Jar` button. Choose to copy the link.

For this tutorial I'm going to use Minecraft 1.18.2

```sh
cd server
wget https://launcher.mojang.com/v1/objects/c8f83c5655308435b3dcf03c06d9fe8740a77469/server.jar
```

If you want to run a modded server, you're going to need the Forge version of the server. Find your preferred version of Forge [here](https://files.minecraftforge.net/net/minecraftforge/forge) and copy the download link.

Remove the leading <code>{`https://adfoc.us/serve/sitelinks/?id=271228&url=`}</code> ad tracker from the link.

For this tutorial I'm going to use Forge 1.18.2

```sh
wget https://maven.minecraftforge.net/net/minecraftforge/forge/1.18.2-40.1.80/forge-1.18.2-40.1.80-installer.jar
java -jar forge-1.18.2-40.1.80-installer.jar --installServer
```

## Configure the server

First try starting the server. Modify the Xmx and Xms flags according to your server resources. The Xmx flag defines the maximum memory allocation pool for a Java virtual machine (JVM), while Xms defines the initial memory allocation pool.

If using forge, the memory configuration is done by editing the `user_jvm_args.txt` file.

```sh
# vanilla
java -Xmx4116M -Xms1024M -jar server.jar nogui
# forge
./run.sh nogui
```

You will not get far before the server asks you to accept the EULA. Shut it down and go edit `eula.txt`

change `eula=false` to `eula=true`.

Next we're going to edit the `server.properties` file. Locate and edit the following lines. This is for mcrcon to work properly. You should also change the password to something stronger. While you're here, you can set whatever [server properties](https://minecraft.fandom.com/wiki/Server.properties) you would like your server to have.

```sh
rcon.password=amazing-password
enable-rcon=true
```

## Running through systemd

First switch back to your root user by typing `exit`.

Create a new service file:

```sh
nvim /etc/systemd/system/minecraft.service
```

Paste this configuration in, changing the mcrcon password to whatever you set it to be earlier:

```ini
[Unit]
Description=Minecraft Server
After=network.target

[Service]
User=minecraft
Nice=1
KillMode=none
SuccessExitStatus=0 1
ProtectHome=true
ProtectSystem=full
PrivateDevices=true
NoNewPrivileges=true
WorkingDirectory=/opt/minecraft/server
ExecStart=/usr/bin/java -Xmx4116M -Xms1024M -jar server.jar nogui
ExecStop=/opt/minecraft/tools/mcrcon/mcrcon -H 127.0.0.1 -P 25575 -p awesome-password stop

[Install]
WantedBy=multi-user.target
```

Edit the `ExecStart` to your preferred memory configuration. If running forge, change it to `/opt/minecraft/server/run.sh nogui`

Start the service and enable it to start on boot.

```sh
systemctl daemon-reload
systemctl start minecraft
systemctl enable minecraft
```

You can see the status of your server by typing:

```sh
systemctl status minecraft
```

Or if you want to follow the logs:

```sh
journalctl -fu minecraft
```

## mcrcon

[mcrcon](https://github.com/Tiiffi/mcrcon) is console based Minecraft rcon client for remote administration and server maintenance scripts. We're going to install it system wide.

Install the building tools:

```sh
yum group install "Development Tools"
```

Compile and install mcrcon:

```sh
git clone https://github.com/Tiiffi/mcrcon.git
cd mcrcon
make
sudo make install
```

Test that everything works. This should output the mcrcon help.

```sh
mcrcon -h
```

### Configuring daily backups

Start by switching to the minecraft user:

```sh
su - minecraft
```

Create a backup script in the scripts folder we created.

```sh
nvim ~/scripts/backup.sh
```

Paste the following configuration, and change the rcon password to whatever you set it to earlier:

```sh
#!/bin/bash

function rcon {
  /opt/minecraft/tools/mcrcon/mcrcon -H 127.0.0.1 -P 25575 -p awesome-password "$1"
}

rcon "save-off"
rcon "save-all"
tar -cvpzf /opt/minecraft/backups/server-$(date +%F-%H-%M).tar.gz /opt/minecraft/server
rcon "save-on"

## Delete older backups
find /opt/minecraft/backups/ -type f -mtime +7 -name '*.gz' -delete
```

Make the script executable:

```sh
chmod +x ~/scripts/backup.sh
```

Edit your crontab:

```sh
crontab -e
```

Paste in the following. We'll run the backup every day at 6am.

```sh
0 6 * * * /opt/minecraft/tools/backup.sh
```

### Using mcrcon manually

To issue commands to the minecraft console:

```sh
mcrcon -H 127.0.0.1 -P 25575 -p awesome-password -t
```

You should see the following:

```sh
Logged in. Type "Q" to quit!
>
```

Instead of typing this manually, you should create an alias:

```sh
alias mc="mcrcon -H 127.0.0.1 -P 25575 -p awesome-password -t"
```

To make this persist, add it to the end of your `.bashrc`.

## Adding mods and resource packs

If you want to add mods to your forge server, you can download the mod `.jar` files and add them to the `~/server/mods` folder.

If you want your players to be prompted for a resource pack, add the direct download link to `server.properties`

```ini
require_resource_pack=false
resource_pack=link-to-zip-file
resource_pack_prompt={"text": "get this pls", "color": "gold"}
```

## Credits

Thanks to Linuxize for [this](https://linuxize.com/post/how-to-install-minecraft-server-on-centos-7/) tutorial which I used as a basis for this article.
