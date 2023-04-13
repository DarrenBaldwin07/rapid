![banner (7)](https://user-images.githubusercontent.com/68653294/218370294-a4bcaef6-087c-489e-8748-0b2eea0fcb90.jpg)

<h1 align='center'>Rapid</h1>
<h4 align='center'>The intersection between developer experience and scalability</h4>
<div align='center'>
    <a href='https://rapid.cincinnati.ventures/' target='_blank'>rapid.cincinnati.ventures</a>
</div>

# What is Rapid?

The complete fullstack toolkit for building advanced, scaleable, and highly efficient software. 
Rapid is a toolkit that enables developers to create fullstack applications built on React and 
Rust. Rapid focuses on scalability and performance without sacrificing developer experience.

# Why Rapid?

Developers have been building entire fullstack applications with ONE single language since the 
beginning of software and technology (C, C++, Java, Ruby, PHP, nodejs, etc). As time has 
progressed, programming languages have began to specialize and become more directed towards 
solving hyper specific problems. However, developers have still preferred the single language 
stack -- hence the popularity of things like [NodeJS](https://nodejs.org). 

## But why? 

Developing applications with one language front-to-back means that engineers have the ability to 
share buisiness logic across their entire development process, allowing them to iterate very 
quickly (additionally, things like hiring a development team are much easier and usually 
cheaper with a simplier tech stack). The downsides of this approach is that many languages 
(such as Javascript) were never meant to do absolutely everything -- this results in a situation 
where tools are used to solve problems they were never meant to solve. 

Because of this, companies are often forced to move off of tooling as applications grow in 
scale. But what if we could use technologies at the beginning of the product development process 
that offers the great DX and simplicity of NodeJS without sacrificing scalability and 
performance? 

Enter, Rapid -- a fullstack toolkit for building software applications with React and Rust!

# How it works

> Rapid is built to be very opinionated -- make less technical decisions, write more software, ship faster MVPs.

Rapid uses React and Rust as the foundation for its fullstack tooling. Do your heavy compute in Rust, 
render your user interface with React. Heavily integrated into Rapid is a feature rich CLI, allowing 
developers to create fullstack or backend applications with ease (`rapid new --fullstack` or 
`rapid new --server`). 

Things like server-side rendering, hot-reload, Built-in UI components, authentication and much 
more come completely out-of-the-box with Rapid.

# Rapid Libs

Rapid is built on multiple React and Rust libraries. View them below:

### Backend

-   [Rapid-web](https://crates.io/crates/rapid-web)
-   Rapid-ssr (coming soon...)
-   [Rapid-cli](https://crates.io/crates/rapid-cli)
-   [Rapid-web-codegen](https://crates.io/crates/rapid-web-codegen)

### Frontend

-   [@Rapid-web/react](https://www.npmjs.com/package/@rapid-web/react)
-   [@Rapid-web/ui](https://www.npmjs.com/package/@rapid-web/ui)

# Roadmap

### MVP

-   Rapid Web - A web server framework (rapid new --server)
-   Rapid Ui -- a fully featured UI and CSS framework
-   React frontend lib for data fetching, auth, etc
-   Fullstack rapid apps with `remix.run` or `nextjs` (`rapid new --remix` or `rapid new --nextjs`)

### Next

-   Easy deployments with `rapid deploy` (GCP, Docker, Cloudflare, Netlify)
-   `rapid extract` command for using rapid-web outside of a monorepo and maintaining full typesafety
-   React-query and SWR integrations for rapid-web
-   Icon library integrated into @Rapid/ui
-   Wasm powered server functions?!
-   Much more coming soon...

### Maybe

- A full featured react meta-framework built on Rapid (leveraging Rust and server-side rendering)
- Rapid ORM (fully async ORM inspired by Prisma and built for Rust)

# Getting Started

Refer to our getting started documents below:
- [Rapid-UI](https://github.com/Cincinnati-Ventures/rapid/blob/main/docs/rapid-ui/gettingStarted.md)
- Rapid-Web (Coming soon)
- [Setting up a development environment](https://github.com/Cincinnati-Ventures/rapid/blob/main/docs/dev.md)



