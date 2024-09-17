---
title: Next-gen Discord bot architecture idea
abstract: None
published: false
date: 2024-03-23
image: clouds.jpg
tags:
  - discord-bot
  - programming
---

*I wrote this during my 3 hour flight to Italy as I was really bored. It describes a hypothetical overengineered microservices based system for Miso Bot, my discord bot.*

## Gateway

We start with a **gateway service** that connects to the discord api. this service would handle any interaction with the discord api gateway and keep the shards open.

This service acts as a proxy for the real discord gateway, and as such would need to be drop-in compatible. The clients connecting to this service would think it is the real discord gateway.

From this service, the discord gateway events will enter a queue such as rabbitmq. The **queue service** filters and sorts the events, before dispatching them further for handler services.

This queue will integrate with the gateway, so clients will not need to know of it's existence. It will also work both ways, for incoming and outgoing events. The discord ratelimits are also respected, and events will remain enqueued until the rate limit allows them through. The goal is to have 0% dropped event rate. If there are no handlers available, the items remain queued until one appears online.

## Handlers

The **handler services** will connect to the gateway proxy as if it was the regular discord API. These clients can as such use any discord library implementation, as long as the URL can be configured.

### Event handler service

Subscribes to various discord events such as member joins and leaves, new guilds, reactions etc., and act accordingly.

### Message handler service

Subscribes to new message events to read their content. Based on the content, the messages can be redirected further to the **Command handler** or processed for passive events such as notifications or activity calculation.

### Command handler service

Will take in events where a command prefix has been detected. The arguments are parsed, and a request is sent to the internal **Command action API** if the syntax matches a valid command. Since commands are just messages, this handler will not subscribe to any discord events, but instead take in forwarded message events from the message handler. The response is formatted for discord and sent to the user. Not all commands need the action API, if their entire functionality is to display discord data in a pretty embed.

## APIs

REST API services running in the backend.

### Commands API

This is a REST service that executes commands. It takes in the command's arguments and any relevant context as JSON, and returns the response in another JSON. This service will not be connected to the discord API, and functions as it's own separate unit, being platform agnostic. This allows command usage from various clients, such as web browsers or other chat apps, without changing the core command functionality. The client's job is only to format the result. This should be the only service that has access to the database.

### Data API

This is a small REST service to facilitate querying discord data from the gateway proxy, as well as the discord OAuth API. It will provide data relating to the logged in user, such as their guilds, and channels in those guilds.

The data API has an active gateway connection, and maintains the in-memory cache of users and guilds members.

## Web control panel

This should be the main way for users to change the settings for themselves or their guild. The web panel will interact with the **Commands API** to change database fields as user selects them from a drop-down. The drop-downs will be populated using the **Data API** after user has logged in.

## Scaling

The gateway queue will act as a load-balancing service, dispatching events to handlers based on their load. The handlers - as well as the commands API - can be horizontally scaled and duplicated as they have no state.

## Command specific APIs

These services solve a problem specific to the commands implemented, and will be used by the commands API.

### Lastfm middleware

The purpose of this middleware API is to provide easier and less error-prone access to the real Lastfm API. It will also use web-scraping to augment and enhance the data received, and implement caching for frequently used routes and rarely changing data.

### Media embedder

This API would separate media scraping and retrieving of data from social media services into one unified schema.
