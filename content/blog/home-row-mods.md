+++
title = "Why I Switched To Home Row Modifier Keys"
author = ["Logan Roberts"]
date = 2024-03-12T00:00:00-04:00
categories = ["Tips and Tricks"]
tags = ["Coding", "Ergonomics", "Configuration"]
draft = false
+++

The day has come where I have to pay attention to my keyboard ergonomics. This
realization came to me as I was finishing going through the book "Writing An
Interpreter In Go" and I began having some pain in my hands. This was my first
time writing multiple thousands of lines of code in one project and I would go
through the book in large chunks at the time. Combine that with extensive use
of hotkeys and I found myself frequently putting my hands in weird unnatural
positions, which is what I believe led to the discomfort in my hands.

I loosely knew about the idea of ergonomic split keyboards which eventually
brought me to [this](https://www.youtube.com/watch?v=pK41Mr4Kdd0) video by
Code to the Moon. In it they talk about their own keyboard rabbit hole and some
of the things they learned along the way. The thing that immediately grabbed my
attention when I heard about it was the idea of home row modifier keys. This
means that if you hold down one of the keys in the home row of your keyboard
then it will act as a modifier but if you tap it, then it will input the key as
usual. As I have a Keychron Q5 Pro that has QMK I have access to all the
keyboard customization that QMK has to offer and I began to wonder if I could
set it up on my keyboard.

After a little big of looking around I found a wonderful guide on how to set up
home row mods in QMK. If you are interested you can find it
[here](https://precondition.github.io/home-row-mods). It goes through all the
settings and common ways people set it up. One thing gave me an issue, that
being the setting HOLD_ON_OTHER_KEY_PRESS. It makes it so that if another key
is pressed down before one of your modifier keys is fully released, then the
one key will act as a modifier before the configured activation time for the
mod key. While this is disabled by default, there was some setting in my QMK
workspace that was enabling it. This ruins the experience of using home row
mods if you are somewhat fast at typing. It wasn't until I figured this out and
disabled it that I really began to see the value of home row mods. While they
add a small amount of latency for some key presses being entered the order is
unaffected and I've found it hasn't really affected my typing speed at all. It
has however increased the ease at which I am able to use shortcuts and even
just type due to shift being include in the list of modifiers I added. While it
does take a little bit to get used to so far I am enjoying them and I can see
more key map customizations in my future.

It took a good bit of tinkering to land on my configuration which can be seen
[here](https://github.com/lcroberts/dotfiles/tree/main/keyboards/keychron_q5_pro).
The left hand home rows are in the following order (right to left): GUI
(Meta/Windows key), Control, Shift, Alt. I also added a toggle to take me to a
layer where the home row modifiers are disabled so that I can still play games
without issue. If you have a keyboard where it is possible to set up home row
mods I would encourage you to try them out. It is a very different way to use
keybindings and might help reduce the risk of RSI as well.
