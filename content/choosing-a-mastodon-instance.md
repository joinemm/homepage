---
title: Choosing a Mastodon instance
abstract: It's not as simple as you'd think
date: 2025-02-06
published: true
image: 
tags:
  - mastodon
  - fediverse
  - social-media
---
I finally decided to join Mastodon. Made an account on the biggest instance, `mastodon.social`. No big deal right? It's all federated... or so I thought.

## The censorship

I do not like censorship or some central authority choosing what I can and can't see. It turns out mastodon.social blocks quite a few instances and silencing many more. It would be nice if I could still see everything I want to see, and block what I don't want to see *myself*. On the user level. Not by the instance admins. 

I want to be able to follow Japanese artists that moved from twitter to `misskey.io`, but every profile from Misskey is silenced/hidden on `mastodon.social` for some reason. I *can* still follow them but I have to accept a warning every time and I'm not sure what implications this has on seeing their boosts (retweets) and so on.

> I will not be diving into what misskey is, but tldr: alternative to mastodon that implements the same protocol with additions, mostly used in japan.

In search of this "free speech zone", I created another account on a libertarian instance `liberdon.com`. This seemed to align more with my views as they don't block any other instances.

## The small instance problem

But it was not all sunshine and rainbows, I soon discovered the downsides of a small instance. liberdon has a mere 2k users. This meant that a lot of data was missing. The misskey profiles I wanted to follow were found this time, but I was not able to see any posts from them. After some research, I found out this is by design. Since nobody else from my instance was following them, their posts were never federated with liberdon :/

I tried a few other instances, one being `defcon.social`; At a first glance it looked great, with a community of like-minded people (hackers), but what drove me off was something as trivial as the background image of the instance. Yes, that's right. Also, being hosted in the US is not ideal for a european like myself.

I even looked into instances running misskey and it's various forks. I could create an account there and follow mastodon users from the "other side". I eventually scrapped this idea as most of the things that misskey adds into the activitypub protocol are just useless bloat.

### Why not self host?

Then - you might ask - if there are no public instances that I like, why don't I just host my own? After doing some research, I will present you with three points:

1. It's resource intensive (=expensive), especially if your toot (tweet) gets some traction.
2. It's actually not that straightforward
3. I would have the same issues as the small instances, but even worse (though there are some scripts I could use to maybe mitigate them).

## The compromise

And so we arrive at where I've finally got my account set up on: `ieji.dev`. 

It's not ideal - it's still blocking some instances - but they seem to be mostly spam and harassment, which I don't really mind being blocked. The member count is not huge, but at ~12k it's larger than the other instances I tried. Some replies to posts are still missing. The benefits outweigh these cons though. This is how the admins describe their instance:

> ieji.de is a generalistic mastodon instance, with the goal of being the fastest mastodon instance in Europe and with a focus on user privacy

Fast and private? Sign me up! The interface is also kept default with no weird background image, and the domain name is nice and short. As a bonus, the instance implements a translate button just like twitter! Though I will admit, I always forget what it's called. "ieji" doesn't exactly roll off the tongue.

You can now find me on mastodon at [@joinemm@ieji.de](https://ieji.de/@joinemm)