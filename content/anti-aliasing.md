---
title: Anti-aliasing
abstract: "Anti-Aliasing in video games and rendering applications set out to solve a problem inherent with our displays: pixels."
published: true
date: 2023-03-27
image: anti-aliasing.jpg
tags: [gaming,  graphics]
---

Anti-Aliasing in video games and rendering applications set out to solve a problem inherent with our displays: **pixels**. The very things that compose the images we see on our screens are simultaneously what cause a lot of issues and break immersion. Pixels are aligned in perfectly straight lines, which means that unless you have equally perfectly straight vertical or horizontal lines being displayed on your screen, you will encounter a form of artifacting known as aliasing. In layman's terms, these are also referred to as “stairstepping” or “jaggies”.

A very simple way of visualizing it is like trying to make a smooth 45° line with Minecraft blocks. On the surface, you can't, because each block is a perfect cube (or a square, if viewed head-on), and since they don't line up horizontally or vertically, but diagonally, you get this “stairstepping” effect. Fortunately, several different methods of combatting this effect have been developed over the years. Generally speaking, these can be divided into two camps, the “supersampling” forms and the “post-processing” forms, the latter of which also has another “temporal” subcategory.

## SSAA

Stands for **Supersampling Anti-Aliasing**. This method essentially renders the frame at a higher resolution internally in order to gather more data for the pixels, which it then uses to smooth these out. More specifically, it samples these pixels multiple times to calculate an average for said pixel, which is what it will then use for the actual rendered frame. SSAA is essentially a more intensive but also more extensive method than MSAA, although both operate using the same principle, just with differing implementation.

You can imagine this as watching a 4K video on a 1080p screen, the original 4K frame is downscaled to your 1080p viewport, however since the 4K frame has far more pixels, it has far more data to work with when trying to smooth out aliasing. In that sense, SSAA is both the simplest and the most intensive form of anti-aliasing.

## MSAA

Stands for **Multi-Sampling Anti-Aliasing**. Technically speaking, it is a form of SSAA (supersampling). With MSAA, instead of rendering the entire frame at a higher resolution and then downscaling to the viewport, it only renders certain parts of the frame at a “higher resolution”. Strictly speaking, it doesn't do so at a higher resolution, but rather it samples and re-renders certain pixels several times to calculate the pixels along an object edge for example. The functionality of MSAA can be further increased by technologies such es edge detection, which can reduce the computational load incurred by MSAA by only applying it to relevant sections, which are almost always edges of objects.

## FXAA

Stands for **Fast Approximate Anti-Aliasing**. Developed by an Nvidia engineer called Timothy Lottes; however the technology is not exclusive to Nvidia cards. FXAA uses an algorithm which requires a rendered frame and its luminance data. You can think of luminance data almost like a heatmap of which parts of a frame are dark, and which ones are light. Using the frame and the data, it then searches for high contrast edges, where the frame goes from light to dark back to light, such as a powerline in the sky. It then focuses on that part of the frame and calculates a factor to essentially blend the pixels along the edge to reduce their perceived jaggedness.

## TAA

Stands For **Temporal Anti-Aliasing**. Does what it says on the box; it uses temporal information in order to eliminate aliasing. This temporal information usually consists of the preceding frame and its motion vectors. Furthermore, TAA also uses something called subpixel jittering, which, put simply, just means that the frame is slightly shuffled around, resulting in pixels being sampled in different locations. Using that information, the GPU then blends pixels along edges in order to smooth these out. Similar to FXAA, it is also a form of post processing anti-aliasing, but it's the additional temporal information being incorporated that sets it apart.

## SMAA

Stands for **Subpixel Morphological Anti-Aliasing**. This is one of the newer technologies, and incorporates a variety of tech, including edge detection (like MSAA), along with pattern, gradient and depth recognition in order to more accurately apply anti-aliasing to relevant areas. It includes parts of the supersampling, the post-processing and the temporal approach. Due to this, it is relatively intensive, roughly on par with MSAA, while in practice producing very similar results. As such, SMAA hasn't found very widespread adoption in the past 10+ years since its inception, as developers for the most part simply stick to the tried and tested MSAA, which has been around for much longer.

## DLAA

Stands for **Deep Learning Anti-Aliasing**. Like DLSS, this leverages machine learning, except rather than training algorithms for upscaling, it uses algorithms trained for anti-aliasing. Most of the heavy lifting was done on Nvidia supercomputers, giving birth to an algorithm which is very good at detecting edges, corners, high contrast areas, identifying which of these need anti-aliasing, and then applying it. Unlike for example MSAA, DLAA only samples each pixel once, but similar to TAA, it integrates motion vectors, and uses the available data to compare against 16K reference images, just like DLSS would do. As such, DLAA is only available for Nvidia GPUs, specifically those with tensor cores, so the RTX 2000, 3000 and 4000 series.

## Conclusion

This list only covered the 6 most common types of anti-aliasing techniques found in games today. There are certainly many more methods, although a lot of these are either Nvidia or AMD exclusive, are often simply tweaks to the sampling methods of MSAA, and have for the most part fallen into disuse. Booting up an older game, it's very possible you'll find settings for CSAA, QSAA or EQAA, which are all proprietary, tweaked version of MSAA.

> "the world does NOT need another goober like me with a blog that nobody reads"  
> — muggs
