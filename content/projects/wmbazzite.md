+++
title = 'WMBazzite'
date = 2024-05-02T00:00:00Z
author = "Logan Roberts"
categories = ["Linux"]
tags = ["distro", "packaging", "docker", "containers"]
toc = false
draft = false
+++

[WMBazzite](https://github.com/lcroberts/container-builds?tab=readme-ov-file#wmbazzite)
is my custom derivative of the [Bazzite](https://bazzite.gg/) Linux
distribution, built on top of the [Ublue](https://ublue.dev/) ecosystem. It
includes the [Hyprland](https://hypr.land/) window manager along with a
curated set of CLI tools, developer utilities, and fonts tailored to my
workflow.

While Ublue provides tooling that simplifies image creation, maintaining
WMBazzite has involved working extensively with containerization technologies,
Fedora package management, and CI/CD systems to automate image builds and
updates. While my work began by simply adding a few extra packages the result
is a fully customized distribution with components not available in upstream
repositories.

To support software like [KMonad](https://github.com/kmonad/kmonad) and various
[Nerd Fonts](https://www.nerdfonts.com/), I wrote custom installation scripts
and integrated them into the image build process. As my needs evolved, I began
maintaining a personal [COPR
repository](https://copr.fedorainfracloud.org/coprs/lcroberts/WMBazzite/) to
package and distribute additional applications, improving consistency across
both my desktop and containerized development environments.

More recently, I’ve integrated support for generating bootable ISO images and
VM builds using new tools from the Ublue team, enabling easier installation and
testing of the distribution.
