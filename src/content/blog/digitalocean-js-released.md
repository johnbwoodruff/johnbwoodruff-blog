---
title: DigitalOcean JS 1.0 Released!
published: false
description: A library for the DigitalOcean API written in TypeScript. For use in Node or the browser!
date: 2018-08-26
tags:
  - showdev
  - opensource
  - node
cover_image: /img/digitalocean-js-v1.png
---

I've been writing a library, DigitalOcean JS, for the last year in my spare time. I started it because I was building a DigitalOcean mobile app using Ionic for use in managing your DigitalOcean resources from your phone. In looking at the various libraries available for my use, I disliked them for a few reasons, including use of callback functions instead of Promises, only being able to use some in Node and not the browser, among other things. Due to those issues, I decided to build my own that was structured how I would like to use it, with some key goals in mind:

- Be able to use in a Node or Browser environment with no difference in usage.
- Use Promises instead of callbacks so clients can make use of `async`/`await`.
- Be built in TypeScript so consumers of the library can benefit from excellent intellisense with the TypeScript definitions.
- Provide solid documentation including examples for usage.

To that end I started development on DigitalOcean JS. Instead of building it all out quickly I decided to build it out as I needed it for the app I was building. As is usual with my side projects, (see [my previous post](/posts/my-github-graveyard)) it languished to the side for a while. After writing that blog post, I decided that I wouldn't let this project die. I literally had one set of endpoints left to implement.

It is with great pleasure that I finally get to announce the official v1.0 release of DigitalOcean JS. Check it out at the repo below, and keep fighting to keep your side projects alive!

[digitalocean-js](https://github.com/johnbwoodruff/digitalocean-js)
