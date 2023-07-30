---
title: PCIe Passthrough with Cloud-Init in Proxmox VE
published: true
description: I had a heck of a time getting my GPU to pass through to my cloud-init Ubuntu VM. After a lot of googling I figured it out. Here's how I did it.
date: 2023-07-29
tags:
  - homelab
  - proxmox
  - virtualization
layout: layouts/post.njk
cover_image: /img/proxmox.png
---

As I wrote about in my [last post](/posts/homelab) I have been diving into the world of homelabs and the fun and sometimes frustrating world of hosting your own services on your own hardware in your basement. I have been using Proxmox VE as my hypervisor of choice and have been loving it. That being said there are often times where I need to cobble together information from various sources to figure something out, whether it be the Proxmox forums, blog posts, or YouTube videos by a variety of homelabbers.

I recently purchased a used Nvidia Quadro P2000 GPU on Ebay for my server to utilize for Plex hardware transcoding as my server's CPU doesn't have an iGPU so watching stuff on Plex always ended up being endless buffering. I finally got it this last week and popped it in my server and began the long arduous task of figuring out how to utilize PCIe Passthrough in Proxmox to be able to utilize that GPU in my Plex virtual machine. Thankfully, there are some excellent tutorials out there on the subject, including [this one](https://youtu.be/-HCzLhnNf-A) by Craft Computing which got me 90% of the way there.

## The Problem

I will fully admit that this is a problem of my own making. I very recently followed [this tutorial](https://technotim.live/posts/cloud-init-cloud-image/) by TechnoTim on using cloud-init in Proxmox to create virtual machines using Ubuntu's cloud images. Super awesome, I love the idea, and so naturally I had to set up Plex using a new cloud-init template. It was all going swimmingly until I tried to add my GPU to the VM in Proxmox, and suddenly when I tried to boot the VM it would just hang forever.

Most other smart people probably would've just said "no worries, I'll just use Plex in a VM that doesn't use cloud-init and call it a day" but instead I decided I would rather spend hours diving down rabbit holes to figure it out. Thankfully, in combination with multiple forum threads, blog posts, random videos, and super friendly community members in the [TechnoTim Discord](https://l.technotim.live/discord), I was able to get it working.

## The Solution

The above tutorial is fantastic for setting up an awesome, clean, usable cloud-init template. I'm going to outline the changes I made that differ from that setup so that anyone else having this issue can clearly see the changes I made and hopefully get it working for themselves. The super short answer is that I needed it to be a UEFI boot setup with a few related changes to allow GPU passthrough, but here are the specific details.

The first issue is that when I was setting up the cloud-init drive rather than using `ide2` I needed to use `scsi1`. I got that information from this Proxmox Forum [thread comment](https://forum.proxmox.com/threads/cloud-init-image-only-applies-configuration-on-second-boot.93414/post-454108) So I ran the following (replacing `{VMID}` with my actual VMID):

```shell
$ qm set {VMID} --scsi1 local-lvm:cloudinit
```

Once I finished the commands in the above tutorial, I made some further changes to the VM before making it a template. The first is that I changed the BIOS to `OVMF (UEFI)`. In order to support this, I needed to add an EFI Disk. I added that from the hardware menu, selected my storage target, and then SUPER IMPORTANTLY you need to UNCHECK the "Pre-Enroll keys" checkbox. This is a confusing name but basically this disables Secure Boot. If you have this enabled, then your Nvidia drivers won't work. I spent a substantial amount of time trying to figure out why my Nvidia driver wasn't working, and it wasn't until a super friendly person in TechnoTim's Discord server pointed me to that setting that I got this all working.

Another change I needed to make in order to be able to correctly pass through the GPU is in the hardware menu in Proxmox, "Machine" was set to the default of `i440fx`, and it needed to be set to `q35`. That would allow me to select the "PCI-Express" checkbox when adding a GPU via the Add PCI Device menu. I then had my virtual hardware set up so I could create a template from this VM.

Finally, once I had booted a fresh VM from the above template, I had some annoyance getting the Nvidia drivers installed. In the end, as I mentioned above, it was simply because I didn't have my Secure Boot disabled, but I was able to find an easier way to install Nvidia drivers than downloading the `.run` file and installing it manually. You can merely search `apt` for nvidia drivers by running `apt search nvidia-driver` which should list a large number of driver versions. You install the version your card requires, which you can find out by going to Nvidia's website and look up your card to see the version of the driver it needs to use. In my case it was version 535, so I very easily installed the drivers by using the following command:

```shell
$ sudo apt install nvidia-driver-535 nvidia-dkms-535
```

At this point everything worked beautifully! I was able to pass through my GPU, got it hooked up to Plex, and tested it to see the minimal CPU usage and hardware GPU transcoding in action!

## Conclusion

Sometimes virtualization can be intimidating, frustrating, and difficult to figure out. On the other hand, it's very rewarding when you're able to get something working that has been troublesome for you. In this case I am super excited to be able to better utilize my Plex installation to watch my content, and while it was tough to get it working just right, I now understand a lot more around virtualization, cloud-init, and UEFI. That's the whole point of my homelab. Besides the fun I have messing around with stuff, I have already learned a ton about technology that has helped me both personally and in my career.
