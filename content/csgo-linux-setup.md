---
title: Optimize CS:GO for Linux and Vulkan
abstract: Get the best performance out of Counter-Strike Global Offensive on your Linux pc.
published: true
date: 2023-06-12
image: csgo.jpg
tags:
  - gaming
  - linux
---

> **2024 Update**
> As CS2 is out and CSGO is no longer playable, the Vulkan and DXVK sections of this guide is now obsolete. CS2 runs pretty well on Linux out of the box, but the some of the tinkering steps here still apply, such as gamemode and compositor latency.

While csgo runs just fine out of the box on Linux thanks to Valve providing a native Linux build, more competitive players could be left disappointed with its performance and various graphical bugs. In this article I go through every tweak and change I made to optimize my csgo experience on Arch Linux running DWM window manager, and an AMD graphics card.

The finished result runs even better and smoother than the Windows counterpart, and with less input lag and latency.

## GameMode

> GameMode is a daemon/lib combo for Linux that allows games to request a set of optimisations be temporarily applied to the host OS and/or a game process.

Running csgo with [GameMode](https://github.com/FeralInteractive/gamemode) might be the easiest upgrade to the game's performance you can make. Simply add this to your csgo launch options:

```
gamemoderun %command%
```

## Vulkan

CSGO on Linux runs on OpenGL by default. This works on all platforms, but results in poor performance and numerous graphical bugs such as:

- [Textures on walls flickering](https://github.com/ValveSoftware/csgo-osx-linux/issues/3168)
- [All glove skins rendering fully black](https://github.com/ValveSoftware/csgo-osx-linux/issues/2102)

As someone who likes csgo skins, the glove issue was enough to push me away from OpenGL.

The solution? Use Vulkan! Simply add `-vulkan` to your launch options and the game now runs on the Vulkan API.

Unfortunately, just doing this results in unplayable levels of stuttering as the game compiles shaders during gameplay. This _might_ go away after playing for some time and running all around every map but I found that no matter how long I played there would still be stutters, especially when people are shooting or peeking me (and if you play cs, you know this is the _worst_ time to experience stuttering)

### Drivers

As per the vulkan page on [Arch Wiki](https://wiki.archlinux.org/title/Vulkan), There are three different implementations of the Vulkan driver for AMD:

- `vulkan-radeon` - RADV (part of Mesa project)
- `amdvlk` - AMDVLK Open (maintained by AMD)
- `vulkan-amdgpu-proAUR` - AMDVLK Closed (maintained by AMD)

What we need is the RADV driver. You can actually have all of these installed at the same time and choose which one to use on per application basis by using `amd-vulkan-prefixes` (from the AUR). Specify CSGO to use the RADV driver by prepending your launch options with `vk_radv`

```
vk_radv gamemoderun %command% -vulkan
```

### Fixing the stuttering

The CS:GO Linux build ships with an old version of dxvk-native (1.9.1), but what if I told you, you can actually update this binary in the game files to a newer version and the game still runs fine?

> "But why?" you ask.

Because DXVK 2.0 comes with bunch of performance improvements, the most important of which is **async shader compilation**. This is the secret sauce to fixing our stuttering game.

**Step 1.** Download the newest release of [dxvk-native-2.x-steamrt-sniper.tar.gz](https://github.com/doitsujin/dxvk/releases). At the time of this writing the newest version is 2.2.

**Step 2.** Extract the tar archive you downloaded and copy the 64 bit binary into your csgo folder, replacing the path with your own steam library location:

```sh
tar -xf dxvk-native-2.2-steamrt-sniper.tar.gz --one-top-level
cd lib
cp libdxvk_d3d9.so 'path/to/steamlibrary/steamapps/common/Counter-Strike Global Offensive/bin/linux64/'
```

**Step 3.** Enable the async shader compilation with `DXVK_ASYNC=1` env variable. This can be easily added to the beginning of your launch options. While we're here we can customize the DXVK hud. I've set mine to just an FPS counter, but you can find more options in the [README](https://github.com/doitsujin/dxvk#hud). There are some interesting options available such as `frametimes` and `compiler` you can play with.

```
DXVK_ASYNC=1 DXVK_HUD=fps vk_radv gamemoderun %command% -vulkan
```

## Compositor latency

If you run a compositor like most people (picom/compton) then you will have always-on VSYNC. As we all know, vsync introduces input lag. What can you do? Well you could just kill your compositor every time you play with a little `killall picom` and get it back up when you're done, but that's lame and a lot of manual work.

Thankfully, picom includes a very nice config option to disable compositing when there is only one fullscreen application on the screen. Just add this into your `.config/picom.conf`:

```
unredir-if-possible = true
```

This works for the most part, but if you get a notification that draws over the game window, it is no longer considered fullscreen and your vsync will be turned back on. To remedy this, we can set the wintypes like this:

```
wintypes:
{
  notification = { redir-ignore = true; }
  notify = { redir-ignore = true; }
};
```

## CSGO lauch options

These are the csgo launch options I like to use that are not Linux specific, but I'll list them here for completeness' sake.

- `-novid` Removes the intro video
- `-tickrate 128` Self explanatory. Enables 128 tick when available.
- `-fullscreen1` Force real fullscreen. Reduces latency.
- `-nojoy` Disable controllers.

Finally, here is my full launch options string in all its glory:

```
DXVK_ASYNC=1 DXVK_HUD=fps vk_radv gamemoderun %command% -novid -tickrate 128 -fullscreen1 -vulkan -nojoy
```
