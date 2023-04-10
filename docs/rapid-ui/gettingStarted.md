# Documentation for Rapid UI

# Initializing Rapid UI in an existing application

## Remix
Begin by installing the tailwindCSS depedencies:
```bash
npm install -D tailwindcss postcss autoprefixer
```

Initialize rapid-ui using the rapid cli:
```bash
rapid-cli init --remix
```

Import and declare you css in the Remix root:
```javascript
    import type { MetaFunction } from "@remix-run/node";
    import {
        Links,
        LiveReload,
        Meta,
        Outlet,
        Scripts,
        ScrollRestoration,
    } from "@remix-run/react";
    import styles from "./index.css"; // Be sure to add this line

    export const meta: MetaFunction = () => ({
        charset: "utf-8",
        title: "New Remix App",
        viewport: "width=device-width,initial-scale=1",
    });

    // Be sure to add this line below
    export function links() {
        return [{ rel: "stylesheet", href: styles }]
    }

    export default function App() {
    return (
        <html lang="en">
        <head>
            <Meta />
            <Links />
        </head>
        <body>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
        </body>
        </html>
    );
    }
```

## Nextjs
> Note: Next.js will be supported very soon :)

## Vite
Begin by installing the tailwindCSS depedencies:
```bash
npm install -D tailwindcss postcss autoprefixer
```

Initialize rapid-ui using the rapid cli:
```bash
rapid-cli init --vite
```

Locate your vite.config.ts file and add the following to the config object:
> Before doing this make sure you import postcss config at the top: `import postcss from './postcss.config'`
```bash
css: {
    postcss
}
```

Finally, be sure to import your css file inside the vite entrypoint: `import index.css`
