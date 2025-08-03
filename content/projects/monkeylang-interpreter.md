+++
title = 'Monkeylang Interpreter'
date = 2024-03-10T00:00:00Z
author = "Logan Roberts"
categories = ["book project"]
tags = ["go", "tooling", "programming languages"]
toc = false
draft = false
+++

This project is based on [Writing an Interpreter in Go](https://interpreterbook.com/) by Thorsten Ball, which
served as both my introduction to the Go programming language and a deep dive
into how interpreters work under the hood. Following the book step-by-step gave
me hands-on experience with Go and strengthened my understanding of language
design, tokenization, parsing, and evaluation.

While working through the implementation, I often made small typos that I had
to spend a while debugging. This forced me to fully understand the material
instead of just copying it. This process significantly improved my debugging
skills and deepened my knowledge of how source code is transformed and ran.

Beyond the scope of the book, I extended the interpreter with several custom
operators that were not originally covered. Although these additions didn't
make it into the [final
repository](https://github.com/lcroberts/Monkeylang-Interpreter), they gave me
practical experience with adding new language features, writing supporting
tests, and reasoning through syntax and semantic changes in a programming
language.
