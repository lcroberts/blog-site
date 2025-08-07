+++
title = 'LazyLangs'
date = 2025-08-03T21:03:05Z
author = "Logan Roberts"
categories = ["plugin"]
tags = ["neovim"]
toc = true
draft = false
+++

## What & Why {#what-and-why}

[LazyLangs.nvim](https://lazylangs.com/) is a neovim plugin designed to
simplify programming language configuration by consolidating it into a single
file. It allows users to easily toggle on or off languages and to override
default language configurations as needed. During the time in college I was
very frequently switching between computers and languages that I needed to
write, whether than be for classes or personal interest. Having to deal with
constant setup changes was pretty annoying. Due to this recurring pain point
the idea for this plugin was born.

## Loading Plugins

The first challenge I tackled was loading plugins. Since my configuration uses
[Lazy.nvim](https://github.com/folke/lazy.nvim), integrating with it was the
natural choice. However, I quickly ran into a major issue. While Lazy makes it
very easy to declare plugins up front, it doesn't provide that much in the way
of an API to manually add plugins dynamically after the it's setup. I also
didn't want to needlessly bloat the number of installed plugins by installing
every one and toggling them via the `enabled` or `cond` options.

As a result I opted to have the user create a global variable with
configuration options that needed to be known at the time of plugin loading.
This included desired plugin integrations, the languages they want to load, and
the path for any overrides the user wishes to do. While I don't love the idea
of relying on a global variable, this was the only reliable way to access this
information during Lazy's setup process. I spent many, many hours exploring
alternative options and every single other option either didn't work or ended
up in a race condition that was inconsistent.

## Designing Language Specs

Now that I had a way to load plugins, I needed a way to source plugins by
language. Knowing that I would be adding functionality other than plugin
loading I decided to make each language spec have a `plugins` field where you
put one of Lazy's native package specs. Wherever possible, I used the native
configuration methods of plugins I'm integrating with. The goal was to
consolidate configuration not reinvent it.

For functionality such as linting or formatting where multiple plugin
integrations might be supported, I created a top level field with mappings from
the plugin name to the configuration to be passed into the plugin. This allows
more plugin integrations to be easily added at any point.

Another key thing was that I wanted every field to be optional. Missing fields
are silently ignored allowing users to focus only on the parts of the spec they
care about without having to learn the entire structure.

## Other Integrations

Other than plugins, every other integration was straightforward. Many plugins
are designed to be set up as late or as early as you want. So using these
interfaces I was able to configure linting, formatting, and language server
support without issue.

The most challenging integration was
[mason.nvim](https://github.com/mason-org/mason.nvim). While it provides
exposes a full API, there is little in the way of documentation on how to use
it. Using it required reading through source code in order to find the
functionality I needed, which even still was far from difficult.
