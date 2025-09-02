---
title: Novella
published: true
description: A quick look at my passion project for the last 6 years. A retrospective of my learnings. The good and the bad.
date: 2025-08-10
tags:
  - electron
  - node
  - angular
cover_image: /img/posts/novella/banner.png
cover_image_alt: Novella Logo
---

I have been looking forward to this post for a long time, but I can finally post it! I've finished my passion project that I've been working on for the last 6 years. Introducing [**Novella**](https://novella.app), the modern, distraction-free writing application.

![Novella](/img/posts/novella/novella.png)

## Why build this?

Honestly, there were a lot of reasons. My initial reason was purely technical, I wanted to try out Electron in a personal project after having spent quite a bit of time working on an Electron app at work that didn't end up going anywhere. Often I start side projects due to reasons like that, such as not being able to use a specific technology I want to at work, or even just using a technology "how I want to" rather than how the business wants to. The difference is most of my side projects end up falling by the side of the road once I get my enjoyment out of it.

Novella is the exception. As I said, I've been working on this since 2019. That's longer than any side project I've ever worked on, so what's the difference this time? Passion and excitement and, even better, desire to use it myself. I've always enjoyed writing, which is why I have done blogging many times over the years. (I've had a variety of blogs before this current one) One of my goals has been to write a book at some point. Before I started Novella I was looking at options for writing software. I didn't love the options I saw at the time. So, in traditional developer fashion, I decided that I may as well build my own! The funny thing is that I've spent far more time writing this software than actually writing. But honestly, when it comes down to it, I've been having so much fun building this that I don't mind.

## The Fun Parts

I have loved this project. It involves a lot of my favorite technologies, as well as some that I have had very little opportunity to use. There are obviously many things I'm using, but the following are a few of the biggest ones.

**Electron:** I have always been fascinated with [Electron](https://www.electronjs.org/). I used it when I worked at Domo to build a desktop version of their product ala-Tableau Desktop. That never saw the light of day but it was a ton of fun to build, and Electron was a big part of the reason I loved it so much. I know there are other great options out there, but I love Electron and am productive with it, which is the best praise I can give it.

**Angular:** If you know anything about me, it's that I'm a huge [Angular](https://angular.dev/) fan. I've used many frontend frameworks over the years but I always keep coming back to Angular because I love its opinionated nature and developer ergonomics. TypeScript is where it is today because of Angular choosing to use it exclusively. It's also had a major renaissance over the last couple years in terms of the tooling and build experience, so I've been having more fun than ever!

**SQLite:** I have loved the idea of using [SQLite](https://sqlite.org/) in an application somehow, and was excited to finally have a good usecase for it. Embedded databases are so cool to mess around with, and it's been a pleasure to work with during the last few years.

**Prosemirror:** Rich text editors are kind of a four-letter word in the web dev community. They're notoriously complex, heavy, and opinionated. Not to mention not always open source. I was originally using [Quill.js](https://quilljs.com/) for my editor but I didn't end up liking the developer experience of it. So I moved to [Prosemirror](https://prosemirror.net/), an absolutely fantastic building-blocks-style library where you can craft your own editor experience as simple or complex as you want. I've been extremely happy with it so far.

**Azure Trusted Signing:** I'll go over Windows Code Signing in the next section and the nightmare it was, but thankfully I finally found [Azure Trusted Signing](https://azure.microsoft.com/en-us/products/trusted-signing), a great service by Microsoft. It's a monthly service you can pay for to provide code signing for Windows apps. It's massively easier to use (my opinion) and MASSIVELY cheaper (not an opinion) than most of the alternatives. Once I got it set up, it was super easy to automate.

## The Not So Fun Parts

As with all projects, there were plenty of moments where I was slogging through nasty issues that made me question whether I even wanted to do this project or not. Thankfully I pushed through each one, and I'm sure there will be more in the future as well, but here are some of the biggest pain points I dealt with.

**Windows Code Signing:** This was the biggest nightmare of my time working on Novella, and it caused me to take huge breaks of time due to the frustration of it. Apple makes it so easy, certificates are included with your Developer Account, and you can very simply code sign and notarize your app. With Windows, you are required to get a Code Signing certificate from a third party company with a huge range of prices and quality of documentation on how to get it working. Then you have to deal with deciding between OV certificates vs EV certificates, paying the massive yearly cost, and even then some offerings end up only being able to be used via the company's special online sign tool that comes with its own cost. It's an absolute nightmare and nearly caused me to give up on releasing Novella on Windows. Thankfully I found Azure Trusted Signing as I mentioned above, and now it's smooth (and cheap) sailing.

**CJS to ESM:** During the course of my time working on Novella, I did many dependency upgrades and tooling changes. One of the biggest ones I decided to undertake was converting all my code from CommonJS to ES Modules. While I'm very happy with my decision now that it's done, it was quite the effort. Lots of dependencies needed to be updated to the versions that support ESM, I had to update my build tooling, and some dependencies were simply not compatible so I had to find alternatives. It was honestly a good learning experience, but not one I necessarily "enjoyed" doing.

**TypeORM:** I originally used [TypeORM](https://typeorm.io/) for database querying. Obviously there are many pros and cons to using an ORM vs raw SQL, but this section is not about that at all. I was generally happy with TypeORM for much of development. When I was in progress with my ESM migration, I realized that TypeORM bundles their CLI into the main package along with all of its dependencies. Some of these dependencies are CommonJS dependencies that don't support being loaded in an ESM environment. No matter what I tried, I could never get it to work with ESM, so I had to drop TypeORM. After evaluating a lot of options, the easiest path forward was move to [mikro-orm](https://mikro-orm.io/), which has a very similar API to TypeORM, but it's much more modern and was compatible with ESM. Whether I stay with that long term or not, I don't know, but I'm liking it at the moment.

**Perfection:** The phrase "Perfection is the enemy of good" applies so much to me and my history with Novella. This is the true reason it took me 6 years to release it. For most of that time I kept adding feature after feature to my backlog of things I "needed" before I could release it publicly. If I had stuck to that original plan, I would have never been able to release Novella, because it would never feel "done". I definitely felt like it had to essentially be perfect before releasing it, whereas that's simply not the case. So I finally was able to come to terms with the fact that I had to draw a line in the sand, which I did, and that allowed me to come to terms with Novella not being perfect before releasing it.

## Looking Ahead

In some ways releasing Novella publicly feels like I finally "finished", but obviously that's not actually the case, and I'm really just getting started. I have a ton of really exciting features I want to implement, and I feel like I can now. Even better, I can release them as they're done, rather than waiting for one grand release to the public. This will definitely help with the motivation to keep working on it.

Despite that, will there be periods where I feel stuck or unmotivated? Almost certainly. Releasing Novella doesn't suddenly free me from those moments. It's a nice moment of extra motivation and a really good feeling at having accomplished something I've had a goal to do for years. I'm really proud of the work I did, and am proud of sticking to over the years. If you're interested in checking it out, go learn about it at the [Novella Website](https://novella.app) and download it. I hope you like it!
