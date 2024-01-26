+++
title = "Speeding Up Your Software Development Workflow"
date = "2024-01-12"
[taxonomies]
categories=["opinion"]
tags=["coding","opinion","text editing"]
+++

This is a post written out of frustration more than anything else. At my college I've watched a fair amount of people code and often they go way slower than I think they should be able to. It's generally not that they don't know what they are trying to do, most people have at least a general idea of what they want to do, it just takes them a while to turn that idea into runnable code. I've seen this pattern with both instructors and students and it frustrates me. I strongly believe that your brain should be your bottleneck while coding, not your hands.

# Keep Your Brain As Your Bottleneck

Software development is problem solving, and our most useful tool in problem solving is our brain. When working on a problem we don't want our brain to be ahead of what we are able to put down into code. This can lead to what I'll call "lost thoughts." Lost thoughts are thoughts that you don't have time to do anything with before they leave your mind. We've all had them before. It's that feeling when you get up and walk into another room only to forget what you went there to do. To minimize the number of our thoughts that become lost thoughts in software development we want to speed up the rate at which we can write code. If you can get quick enough the bottleneck of code away from your hands and into your brain. This lets us get more use out of our most valuable tool, our brain.

# Learn To Type Fast

The most obvious way to get faster at writing code is to type faster. This even seems like one of those things that shouldn't even need to be said. However, based on my experience watching other student code, it should be said. Many people I've met seem to not think about how fast they're typing. As software developers it is something we should think about. Faster typing leads to more code we can write in the same amount of time. It's not even very difficult to increase typing speed, though it may take some time. All you have to do is actively practice. A little bit every day helps a lot.

There are two main ways I personally practice typing. The first and most readily available way is [monkeytype](https://monkeytype.com/). It is open source and the github repo can be found [here.](https://github.com/Instagram/MonkeyType) It's a great way to practice typing plain English words. There are a few tips I have to get the most of it. Actively push your typing speed, don't just passively type. Without pushing yourself you won't notice any speedups. Also, try to type words instead of letters. By this I mean try to get to the point where you don't think about the letters you are typing and instead are just focusing on the words.

Another good way to practice typing speed is by writing notes. While in class I tend to take notes as both a way to stay focused and to practice typing. The fact that I can search through them later is always a nice bonus as well. Using this method I try to type out as much as possible, but it can't be at the detriment of listening to the instructor or understanding what is going on. In this way it's much more similar to what you do when you write code that using monkeytype. Your brain needs to primarily be focused elsewhere and typing should be almost on autopilot. This much more closely mimics how we should be doing things

# Tools Make Your Job Easier (and Faster)

Another obvious way to speed up your software development workflow is to use tools made for the jobs you're trying to do. The "best" tool is often up to personal preference, but trying several tools can help you find what you like or dislike and you may find a whole new way of doing things that works better for you.

The most obvious tool we use during development is our IDE or text editor. Different editors do certain things better or worse, but some are obviously poor choices. For example you shouldn't be using Intellij to program C. If you want to use a Jetbrains IDE for C, use CLion. However, for Java Intellij is a fantastic choice and what I use. It is still important to try different editors. If you cannot explain why you like the editor you use compared to other editors then you probably have not tried enough. Here's an example of how you should be able to explain your editor choice:

I use neovim for most of my programming. I like it because of several reasons. The vim style keybindings are great once you get to know them well. While other editors have vim keybinding plugins and [VSCode even supports using fully embedded neovim instance](https://github.com/vscode-neovim/vscode-neovim), there are other reasons I prefer neovim. It's extremely lightweight and feels snappy. It doesn't rely on a GUI and as a result you can use neovim or vim (which is available by default on many linux distros) when you SSH into a server. Finally, I like how extensible it is and how vibrant the community is. It supports LSP and as a result you can use neovim to program any language with a language server. You have access to many APIs that let you hook into existing functionality, and the use of lua as the configuration/scripting language makes configuring neovim feel easier than VSCode and more fun.

While I've spent a lot of time talking about editors in this section so far, that is not the only focus. CLI and GUI apps/tools of all kinds are included in this section. Even editor plugins can be included. A tool is anything that makes your life easier, and finding the right one is important. Another great example of tools is the entire class of tools that hook into git. Whether it be a full graphical frontend for git like github desktop, or editor integrations such as those found in VSCode or Jetbrains IDEs they can make your life easier. A git tool I use extensively is [gitsigns](https://github.com/lewis6991/gitsigns.nvim) for neovim. It allows you to stage or reset hunks so you can perform git operations on portions of files. While you could do that from the git CLI, tools to make this easier exist, so why shouldn't you use them?

# Use Keybindings

# There's (Almost) Always A Better Way To Do Things

## Sometimes There's An Initial Slowdown

## Learn From Other Developers
