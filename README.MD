![banner (7)](https://user-images.githubusercontent.com/68653294/218370294-a4bcaef6-087c-489e-8748-0b2eea0fcb90.jpg)

<h1 align='center'>Rapid</h1>
<h4 align='center'>The complete fullstack toolkit for building advanced, scallable, and highly efficient software.</h4>
<div align='center'>
<a href='https://rapid.cincinnati.ventures/' target='_blank'>rapid.cincinnati.ventures</a>
</div>

# What is Rapid?

Rapid is not a framework but an opinionated set of tools to enable developers to create full-stack applications with React and Rust. Rapid focuses on scalability and performance without sacrificing DX.

# Why Rapid?

Developers have been building entire fullstack applications with ONE single language since the beginning of software and technology (C, C++, Ruby, PHP, nodejs, etc). As time has progressed, programming languages have began to specialize and become more directed towards solving hyper specific problems. However, developers have still preferred the single language stack -- hence the popularity of things like Nodejs. Developing applications with one language front-to-back means that engineers have the ability to share buisiness logic across their entire development process, allowing them to iterate very quickly (additionally, things like hiring a development team are much easier and usually cheaper with a simplier tech stack). The downsides of this approach is that many languages (such as Javascript, etc) were never meant to do absolutely everything -- this results in a situation where tools are used to solve problems they were never meant to solve. Because of this, companies are often forced to move off of tooling as applications grow in scale. But what if we could use technologies at the beginning of the product development process that offers the great DX and simplicity of NodeJS without sacrificing scalability and performance? Enter, Rapid :)

# How it works

Rapid is built to be very opinionated -- make less technical decisions, write more software, ship faster MVPs.

Rapid uses React and Rust as the foundation for its fullstack tooling. Do your heavy compute in Rust, render your UI with React. Heavily integrated into Rapid is a feature rich CLI, allowing developers to create fullstack or backend applications with ease (rapid new --fullstack or rapid new --server). Things like server-side rendering, Hot-reload, Built-in UI components, authentication and much more come completely out-of-the-box with Rapid.

# Rapid Libs

### Backend (all on crates.io coming soon)

-   rapid-web
-   rapid-ssr
-   rapid-cli

### Frontend

-   @rapid-web/react
-   @rapid-web/ui

# Roadmap

### MVP

-   Web server (backend) rust lib (rapid new --server)
-   Rapid Ui -- a fully featured UI and CSS framework
-   React frontend lib for data fetching, auth, etc
-   Fullstack solution with SSR (rapid new)
-   Fullstack solution with only CSR (rapid new --csr)

### Next

-   Documentation
-   Easy deployments with `rapid deploy` (GCP, cloudflare workers, Netlify)
-   Icon library integrated into @Rapid/ui
-   Remix.run?
-   Wasm powered server functions?!

# Getting Started

To setup your dev environment for `Rapid-UI` on your local machine follow these steps:

-   node v16 or higher is required
-   pnpm

1. Navigate to the UI package and build the package:
   `cd rapid/packages/rapid-ui && npm run build`

2. Navigate to the example app to install the dependencies and start the app
   `cd rapid/examples/ui && pnpm install && pnpm dev`

View the Rapid UI components at http://localhost:5173. If making changes, be sure to rebuild the rapid-ui package and reinstall the example project so that it uses the updated package.
