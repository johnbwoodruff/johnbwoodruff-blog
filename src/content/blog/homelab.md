---
title: My Homelab
published: true
description: Homelabs are a fantastic way to learn about various tools and technologies but in a safe and non-production environment. This is my homelab in 2023.
date: 2023-01-21
tags:
  - homelab
  - networking
  - automation
cover_image: /img/homelab.png
---

I have a variety of hobbies, but the most obvious one is playing around with fun technologies. This applies not only to software, which I obviously write for a living and for enjoyment, but also to hardware. Ever since I took apart my parents' VHS player to see how it worked (RIP that VHS player 🪦) I have loved tinkering with hardware, and have since then built multiple PCs, wired my home for ethernet, installed security cameras, and more. The hardware projects I've most recently spent my time doing has been assembling my homelab in my basement, and that's what this post is about.

## What is a homelab?

Before we dive into my specific homelab, we should cover what a homelab is for those who have never heard the term. It's a very broad inclusive term that refers to some sort of setup in your house that you can use to tinker, mess around with software or hardware, and generally experiment in the safe confines of your own home and network. This homelab can be as tiny as a single [Raspberry Pi](https://www.raspberrypi.com/products/) or old laptop, to something as big as a [Home Data Center](https://www.reddit.com/r/HomeDataCenter/). The foundational concept is the same, however, it's some place at home to be able to mess around with tools and technologies for the purposes of learning and fun. The great thing is that you don't have to have a lot of money to build a lot of infrastructure, you can easily use an old machine you have lying around.

## What can I do with a homelab?

You can do a lot with a homelab. Anything you want that your hardware can handle, which is actually probably more than you think. Raspberry Pi's are surprisingly capable little devices, and even really old hardware can run a lot of open source software on Linux. There are so many common homelab projects and ideas you can find on the internet. A few include:

- Setting up [Pi-hole](https://pi-hole.net/) for network-wide adblocking
- Running a [Plex](https://www.plex.tv/) media server to host your own media
- Set up a Raspberry Pi with [RetroPie](https://retropie.org.uk/) for retro gaming
- Home automation with [Home Assistant](https://www.home-assistant.io/) or [Homebridge](https://homebridge.io/)
- Custom code you write yourself to do whatever you'd like!

There are so many other things you can do, that list barely scratches the surface of the possibilities. Just find something that sounds cool and get started. There are likely even tutorials that walk you through it!

## My homelab hardware

![My homelab](/img/posts/homelab/rack.jpg)

This is my current homelab. I've been working on my homelab for a while, and this is by no means what I started out with. If you're interested in having a homelab, make sure you try your best to not constantly compare yours to others, because it's a slippery slope of feeling like you "need" more. (trust me, browsing [r/homelab](https://www.reddit.com/r/homelab) often leaves me wanting to buy way more hardware, so I'm constantly needing to resist that urge) So with that out of the way, here's the hardware I have in my homelab server rack from top to bottom:

1. StarTech 25U Open Frame Rack
2. 1U Brush Panel (makes things look nice with cables coming from the back)
3. Ubiquiti Dream Machine Pro
4. Ubiquiti Network Video Recorder
5. 24 Port Patch Panel
6. Ubiquiti Switch 24 Port with Power over Ethernet
7. 24 Port Patch Panel
8. Raspberry Pi 1U Rackmount with a Pi 3B+ and a Pi 4B+
9. A few blanking panels & shelf holding my cable modem
10. Dell PowerEdge R720 2U Rackmount server
11. Synology DS920+ NAS
12. StarTech Rackmount Power Strip
13. Tripp Lite 300W 1U UPS
14. Tripp Lite 900W 2U UPS

Let's go through the above.

### Ubiquiti Networking

![Ubiquiti](/img/posts/homelab/ubiquiti.jpg)

All of the Ubiquiti gear is the backbone of my home network. The UDM Pro is my router that provides firewall, VLANs, and more. I love this device and it was actually the first thing that started getting me interested in homelabbing. My Switch then connects all the rest of my hardwired devices such as the server, NAS, and my wireless access points and security cameras. That's why I have a PoE (power over ethernet) switch, because that's required for powering my APs and cameras. My Ubiquiti security cameras throughout my house record to the UNVR so I have all my recordings and data locally in my basement rather than in the cloud.

### Computing Hardware

![Computing Hardware](/img/posts/homelab/compute.jpg)

First I have my two Raspberry Pi devices. They're not currently plugged in since I moved their workloads onto my server recently, but once I have another need for them I'll plug them back in. I don't use their power cords because they each have a PoE "hat" which is a little add-on board that makes the Pi able to be powered over ethernet. Previously one was running Pi-hole, and the other was running Hoobs, a HomeBridge platform.

I also have my Synology NAS (network attached storage) which has two 4 TB hard drives in it currently. (I'll be adding to it when I am getting close to the storage limit) This NAS hosts my media for my Plex server as well as a lot of backups of PCs and my server virtual machines.

Finally I've got my Dell R720 server. I love this server, I bought it used on Ebay, and have loved using it ever since. It has 192 GB of RAM and a Xeon E5-2630 v2 CPU, and it's running Proxmox for virtualizing. It's got more than enough power to host the many services I've put on it so far, and there's plenty of room for more. I also have eight used 2 TB hard drives I bought on Ebay in this server which are used as the server local storage.

These devices are definitely more than enough compute power for what I use currently. Eventually as I add more services I may outgrow my current hardware, and then I may acquire a little more hardware. The nice thing is the used market for these devices is thriving and can be a very affordable way to acquire this hardware.

## Services

![Shipping Containers](/img/posts/homelab/containers.jpg)

I run a variety of services in my homelab, almost all of it on my Dell server. Some I run as dedicated VMs, and others I run as docker containers in a Docker VM. There are so many ways to host these services, so I enjoy messing around with many of those methods. Here's a list in no particular order of the services I'm running in my homelab and a short description of what it's for.

- [Pi-hole](https://pi-hole.net/): Whole home adblocking
- [Hoobs](https://hoobs.com/): HomeBridge which allows me to use non-HomeKit devices with Apple's HomeKit
- [GitHub Actions Self-Hosted Runner](https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners): I use this to build and deploy my custom homelab code with GitHub Actions
- [Uptime Kuma](https://github.com/louislam/uptime-kuma): A status page to monitor my homelab services
- [Heimdall](https://github.com/linuxserver/Heimdall): A homelab dashboard linking to all my services
- [Plex](https://www.plex.tv/): A self hosted media server
- [Portainer](https://github.com/portainer/portainer): A nice UI to monitor and manage my docker containers
- [Traefik](https://github.com/traefik/traefik): Local reverse proxy which allows me to have SSL certificates for my self-hosted services
- [Pterodactyl](https://pterodactyl.io/): A game server panel which allows me to spin up game servers for any game like Minecraft or Valheim
- [Grafana](https://grafana.com/): A tool to build dashboards with metrics and for searching logs across all my services
- Custom Code: I have a bunch of custom code I've written in the form of Slack bots, scripts, and other things that do whatever I want.

The fun thing about homelabs is you can run whatever you want to experiment with. While I currently run most of my stuff as Docker containers on a single Docker VM, I am planning to spin up a Kubernetes cluster and migrate my services to that so I can distribute the load across multiple nodes as opposed to throwing everything on one big Docker VM. That's just one item on my list, there are so many cool open source projects and technologies to mess around with, and it's as simple as just spinning up a VM or container for it and playing around. That's where the true fun of a homelab lies.

## Conclusion

This is the state of my homelab at the beginning of 2023. Honestly I'm super excited to see where it'll be in a year or two. Maybe there's enough changes that I end up making this a yearly blog post to go over where my homelab is currently. I highly recommend that everyone who likes technology and messing around with software or hardware should start their own homelab. As I stated before, you can absolutely do a ton without spending a lot of money. Just use an old laptop or Raspberry Pi that's gathering dust. Use resources like [Reddit](https://www.reddit.com/r/homelab/) or YouTube channels like [TechnoTim](https://www.youtube.com/@TechnoTim) or [Jeff Geerling](https://www.youtube.com/@JeffGeerling) to get ideas, follow tutorials, or just enjoy their content. Or you can just mess around yourself and make a bunch of mistakes. It's a safe place to do that. And most of all just have a great time.
