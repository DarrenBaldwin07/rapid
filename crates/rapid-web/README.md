# A simplified re-export of Actix-web for the Rapid framework.

## Initial features
- Simplified router + middleware
- File based routing
- Good defaults (CORS, logging middleware, custom error pages and better extractor error logging)
- Built-in actix crates (files, auth, etc)
- Easy JWT validation (authorization) and middleware
- Scaffolded diesel orm, connection pooling, mailer, server state
- Generators for request -> service -> controller architecture (not mvc)
- Codegen for typescript clients with extractor type safety
- `rapid extract` command for extracting-out a rust backend from its frontend when scaling
- Typescript type generation from Diesel schema
- Hot reload dev server
- Better request/response logging in console for easy debugging
- Auto-serve all static assets from the /public folder
- A one line SpaRouter for serving single page applications from a rapid-web server
    - Semi SSR for applying meta tags an OG-images (rapid calls it "meta" rendering)

## Maybe features
- Custom async-first ORM (opinionated and only works with rapid)
- Clerk sdk?
- Plugins?

> Note: We do not recommend that you use Rapid in production as all of its core implementations are subject to change rapidly :)
