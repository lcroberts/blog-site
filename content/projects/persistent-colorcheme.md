+++
title = 'Persistent Colorcheme'
date = 2024-01-02T00:00:00Z
author = "Logan Roberts"
categories = ["plugin"]
tags = ["neovim", "cosmetic"]
toc = false
draft = false
+++

[persistent-colorshceme.nvim](https://github.com/lcroberts/persistent-colorscheme.nvim)
is a simple neovim plugin that persists the colorscheme you choose (via the
colorscheme command) across launches of neovim. I created this plugin out of a
simple desire to be able to easily swap colorscheme's at will without having to
do code changes to my neovim config. Since that feature of the plugin was quite
small I also decided to add an ability to toggle transparency for UI elements.
While everything about this plugin is very simple, this was the first time I've
really had to sit down and interact with code written primarily by other
people. It forced me to learn how to read documentation and work around
limitations of other peoples design choices.

