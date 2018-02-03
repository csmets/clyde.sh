---
title: Creating a HTTP server in C
draft: true
---

# Creating a HTTP server in C

## Introduction

_If you want to skip to the tech talk skip this intro_

I'm very new to C. I never needed to use such a language before and I disagree
with statements like "every programmer should start learning with C". It's a
hard language, because it's so close to the hardware level. A lot of the
problems that C programmers face, like memory leaks from no garbage collection
are solved in newer languages. I say learn C after you've learned a higher level
language so you can appriciate and understand better. I say all this because I'm
a newbie to C, and I can say that I'm terrible at it. It's definately a smaller
language to learn but a hard one to master.

Interests leading into programming in C was because of Web Assembly. That to me
was mindblowing, being able to compile to a web binary means you can write code
in any LLVM language as long as there's a compiler to WASM. At the time of
looking into  Web Assembly, the languages with full support were C and C++, and
I think there was support for RUST or aleast semi/alpha. It was a good excuse to
pick up C because it seem like a challenge worth doing. Watched a few tutorials
and having created some very small things I struggled with things like `malloc`
and pointers, because these were new concepts to me.

I took a break from it all and I later decided to come back but this time set a
project in which I thought would be a lot of fun. It was to create a HTTP
server. I would need to learn about sockets in C and returning responses so the
client side can understand. Before starting this I picked up the book "The C
programming language". What a smart decision that was. I got a better
understanding about pointers and helped me familiarise with the language in
whole. From there I went ahread and started working on creating the server.

Currently this website is running on this HTTP Server running in a Raspberry Pi.

## Creating the server
