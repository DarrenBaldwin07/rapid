![web-banner](https://user-images.githubusercontent.com/68653294/230900821-06221c9d-3769-4dc8-8e8a-b9e2af81fdca.svg)
<h1 align='center'>Rapid-web</h1>
<h4 align='center'>A blazingly fast, modern, and simple Rust server framework enabling end-to-end typesafety for Typescript-based frontends</h4>
<div align='center'>
<a href='https://rapid.cincinnati.ventures/' target='_blank'>rapid.cincinnati.ventures</a>
</div>

## Initial features
- Simplified router + middleware
- File based routing
- Codegen for typescript clients (rust types -> typescript types) with extractor type safety
- Hot reload dev server
- Good defaults (CORS, logging middleware, custom error pages and better extractor error logging)
- Built-in actix crates (files, auth, etc)
- Easy JWT validation (authorization via clerk.dev) and middleware
- Scaffolded diesel orm, connection pooling, mailer, server state
- `rapid extract` command for extracting-out a rust backend from its frontend when scaling (with support for route typesafety via A types lib with a git path)
- Typescript and rust type generation from Diesel schema
- Better request/response logging in console for easy debugging
- Generators for route genration (`rapid generate`)
- Auto-serve all static assets from the /public folder
- A one-line SpaRouter for serving single page applications from a rapid-web server
    - Semi SSR for applying meta tags an OG-images (rapid calls it "meta" rendering)
- Clerk sdk

## Next features
- Custom async-first ORM (called "Lightning")
- Specific queries (like GraphQL but without the overhead)
- React query integration
- Plugins

> Note: We do not recommend that you use Rapid in production as all of its core implementations are subject to change rapidly :)
