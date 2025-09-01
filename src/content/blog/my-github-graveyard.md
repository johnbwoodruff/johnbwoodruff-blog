---
title: RIP Side Projects
published: false
description: Here lies my dead side projects. They lived quickly, taught excellently, and died quietly. This is my GitHub Graveyard.
date: 2018-08-14
tags:
  - graveyard
  - career
  - opensource
cover_image: /img/graveyard.png
---

In my previous post, [Epic Development Environment using Windows Subsystem for Linux](/posts/epic-dev-environment-wsl), I opened with my reasoning for buying a new laptop: the many side projects I had going on. Unfortunately, over the years, many of those side projects languished into obscurity and were never looked at again. Recently the venerable [Isaac Lyman](https://twitter.com/isaacandsuch) published the blog post [GitHub Graveyards: I'll show you mine...](https://dev.to/isaacandsuch/github-graveyards-ill-show-you-mine-49lh) and went through all the side projects that fizzled and died for various reasons, why he built them/what he learned from them.

I loved the idea, and it felt like a great way to memorialize those dead projects that benefitted me in so many ways. With that in mind, I present to you my GitHub Graveyard.

### [Default Stylesheet](https://github.com/jbw91/default-stylesheet)

_A beautifully simple default CSS stylesheet_

This was one of my first ever repositories on GitHub. I wanted to make a design system myself, ala Bootstrap at the time, but have it be simply providing default styles to standard HTML controls and elements as opposed to applying classes to everything. I created an incredibly simple design to the basic elements (buttons, inputs, selects, etc.) and created a stylesheet that one could simply link to on their unstyled site and get immediate benefit.

I used the stylesheet myself on a couple of small things before I stopped using it in favor of the many obviously superior CSS libraries.

**What I Learned:**

- I learned a great deal about styling from scratch with CSS, as I hadn't done much with that before then. Most of my experience was using stuff others had built.
- This was my first real open source thing I built that I wanted others to be able to use, even though I highly doubt anyone other than myself ever even saw it.

### [Barebones Grid](https://github.com/jbw91/barebones-grid)

_A simple responsive grid-based CSS framework_

Coming off of the high of building my first open source project, I quickly moved into once again building something Bootstrap and others had already built: A grid system. On this project, in fact, I shamelessly walked through the Bootstrap code itself and followed its example to essentially rebuild the same type of grid as a standalone library.

At the end I had a working responsive grid (practically identical in functionality to Bootstrap) and even wrote documentation on how to use it, and released it to [Bower](https://bower.io/). It died because I never used it, even in my own projects. I did, however, get a couple of stars on GitHub, which was another first for me!

**What I Learned:**

- I learned a great deal about [Less](http://lesscss.org/), and used that knowledge quite a bit in my job where we used Less extensively.
- Releasing the library on Bower was the first time I had ever released anything I wrote on a package manager, which I was stoked about.
- One other thing I learned was that there's no shame in creating a clone of something else that someone else wrote in order to learn something new.

### [Project Tracker](https://github.com/jbw91/project-tracker)

_A hybrid app built on Ionic for the purpose of tracking and managing projects_

Ah, my first [Ionic](https://ionicframework.com/) application. This was back on Ionic v1. It was love at first sight, a love that continues to this day. I was building a project at work to track department priorities and project timelines, and thought it would be fun to make a slimmed down version of the project as a mobile app. I had just attended [ng-conf](https://www.ng-conf.org/) in 2015 and learned a bunch about Ionic, so I was stoked to be able to build native apps with the web technologies I already knew.

This project fizzled out quickly because the design I was attempting was complicated enough that I quickly got frustrated and wanted to try something a little more simple.

**What I Learned:**

- This was my first time building an Ionic app from scratch, as well as working with Cordova.
- I learned a great deal about [SQLite](https://www.sqlite.org/index.html), and how different it was, being an embedded database instead of a hosted database which was all I had used at that point.

### [Cash Tracker](https://github.com/jbw91/cash-tracker)

_A simple cash income/expense tracker hybrid Ionic app_

This was the project I jumped on to after losing steam on Project Tracker. A much more simple design using mostly basic Ionic components. I also used [Chart.js](https://www.chartjs.org/) for the first time, which was quite fun and a good learning experience. I completed most of what I wanted to accomplish in the app before moving on to other projects.

**What I Learned:**

- I learned a great deal more about Ionic on this project, due to the fact that I worked on it longer and used more features of the framework.
- Using Chart.js was a great learning experience with regards to visualizations on the web.
- I actually packaged this app and sideloaded it onto my device to learn how to do that as well as show people how cool Ionic was.

### [Simple LMS API](https://github.com/jbw91/simple-lms-api)

_A Node.js and Express API for the Simple LMS project_

I was still in school at BYU during 2015, and they had an in-house Learning Management System (LMS) they built called Learning Suite. It was an atrocious experience. Slow, incredibly buggy, and everyone hated it when it came out. (it got vastly better over time, and I'm sure it's totally fine now) Due to this annoyance, however, I pledged to build a better LMS! As you can see from this project, I worked on the backend of the project for about a month before abandoning it.

This project was one of my better graveyard projects due to the sheer number of things I learned in the process. First, it was my first major foray into Node.js with [Express](https://expressjs.com/) as an API. Second, I used [Docker](https://www.docker.com/) with [Docker Compose](https://docs.docker.com/compose/) to spin up containers with the API linked to my local code with live reload and a MySQL database. I loved how I didn't have to install that whole environment locally, but could simply spin up and destroy containers as I wanted.

On the other hand, I also made tons of rookie mistakes. For example, I used simple string concatenation from params passed in by the user to build SQL queries instead of utilizing [parameterized SQL](https://blog.codinghorror.com/give-me-parameterized-sql-or-give-me-death/). Yep. I did that. It's [immortalized for all to see](https://github.com/jbw91/simple-lms-api/blob/development/app/api/user/controller.js). Look upon it and weep for my n00b idiocy. :)

**What I Learned:**

- This was my start into using Docker, something I now use frequently in my various projects.
- I gained a great love for Node.js, and have continued using it throughout the years for various projects.
- I learned later on that I committed egregious sins against my name as a developer. (SQL Injection vulnerabilities)

### [ChatHub](https://github.com/jbw91/chathub)

This was an incredibly fun project. I loved using web technologies for creating mobile apps, and got super excited at the prospect of doing that for desktop apps too. Enter [Electron](https://electronjs.org/). This has become one of my favorite technologies, something that I use to this day. I wanted to build a desktop application, so I decided to build a [Firebase](https://firebase.google.com/) chat app. (something that most web devs have done at some point in their career)

I used Angular.js's [Material Design library](https://material.angularjs.org/latest/) and had a ton of fun building a chat app hosted in Electron. I ended up using very little of Electron itself ironically in this project, I simply loaded up my app in an Electron window, but I thought I was a full-on Electron developer! Since then, I've gotten _substantially_ more knowledgeable about Electron and have been working with Electron professionally for the last year and a half.

**What I Learned:**

- I worked with Firebase and their realtime database product, which was a really fun experience. Firebase had been recently acquired by Google, so it was a fairly big thing at the time.
- I learned how cool Electron was, even though I didn't necessarily do very much at all with the platform itself during that project.

### Scheduling Hero [API](https://github.com/jbw91/scheduling-hero-api) & [Web](https://github.com/jbw91/scheduling-hero-web)

After doing many projects on my own, I wanted to host a little "Hack Night" once a month at my house with some friends. I started "Scheduling Hero" (the name was temporary but we never thought of anything better) which was a project to help manage availability between multiple people, and help schedule a time to get together, including sending out calendar appointments to the attendees.

This project lasted longer than most of my side projects, because I had a couple people working on it with me, and it was a fun social gathering where we would work together. Sadly I never ended up finishing it, as we all got busy with work and stopped doing those regular hack nights. It was a fun project, however, and I learned a lot from it.

**What I Learned:**

- I used [nodemailer](https://nodemailer.com/about/) with [mailgun](https://www.mailgun.com/), a great service that is free for up to 10,000 emails per month, which is way more than I needed for development.
- For authentication, I used Google's OAuth2 authentication service. I had lots of experience with OAuth2 on the client side, but this was my first time implementing Google's OAuth2 services on the backend.
- I used [MongoDB](https://www.mongodb.com/) with [Mongoose](http://mongoosejs.com/) for the database. I had had lots of experience with MongoDB, but this was my first time using Mongoose, which I rather enjoyed.

---

There are a few other projects currently that have been sitting in my GitHub account for a bit, but I'm not ready to call time of death yet because I still think I'm going to go back and continue them. Hopefully I do continue working on them, but I may end up writing a part 2 of this post a year from now. As for these projects, I appreciate all I learned from having done them, even if I haven't touched them in years. May they Rest in Peace.
