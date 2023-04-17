# Documentation for Rapid UI

# Initializing Rapid UI in an existing application

## Remix
Begin by installing the TailwindCSS depedencies:
```bash
npm install -D tailwindcss @rapid-web/ui
```

Initialize rapid-ui using the rapid cli:
```bash
rapid init ui --remix
```

Enable the `unstable_tailwind` option in the Remix config:
```javascript
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  future: {
    unstable_tailwind: true, // Add this line
  },
};

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

    // Be sure to add this line below that will registor your tailwind styles
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
Begin by installing the TailwindCSS depedencies:
```bash
npm install -D tailwindcss postcss autoprefixer @rapid-web/ui
```

Initialize rapid-ui using the rapid cli:
```bash
rapid init ui --nextjs
```

Add the TailwindCSS directives to your css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Finally, be sure to import your css file inside the nextjs entrypoint (either `_app.tsx` or `index.tsx`): `import globals.css`


## Vite
Begin by installing the TailwindCSS depedencies:
```bash
npm install -D tailwindcss postcss autoprefixer @rapid-web/ui
```

Initialize rapid-ui using the rapid cli:
```bash
rapid init ui --vite
```

Locate your vite.config.ts file and add the following to the config object:
> Before doing this make sure you import postcss config at the top: `import postcss from './postcss.config'`
```bash
css: {
    postcss
}
```

Finally, be sure to import your css file inside the vite entrypoint (either `app.tsx` or `index.tsx`): `import index.css`

> Checkout the Rapid-UI components on Storybook here: https://storybook.rapid.cincinnati.ventures
