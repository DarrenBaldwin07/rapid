# A simplified re-export of Actix-web for the Rapid framework.

## Initial features
- Simplified router + middleware
- Good defaults (CORS, logging middleware, custom error pages and better extractor error logging)
- Built-in actix crates (files, auth, etc)
- Scaffolded diesel orm, connection pooling, mailer, server state
- Generators for request -> service -> controller architecture
- Codegen for typescript clients with extractor type safety
- Typescript type generation from Diesel schema
- Better request/response logging in console for easy debugging

## Maybe features
- File based routing
- Custom async-first ORM (opinionated and only works with rapid)
- Plugins?

> Note: We do not recommend that you use Rapid in production as all of its core implementations are subject to change rapidly :)
