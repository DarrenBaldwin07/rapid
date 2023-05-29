import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from './styles/index.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [{ rel: "stylesheet", href: styles }]),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="description"
          content="A new way to build web applications with React and Rust!"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="A new way to build web applications with React and Rust!"
        />
        <meta name="twitter:site" content="https://rapid.cincinnati.ventures" />
        <meta
          name="twitter:title"
          content="RAPID"
        />
        <meta
          name="twitter:image"
          content="https://storage.googleapis.com/cv-framework/rapidBanner2.jpg"
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/cv-framework/rapidBanner2.jpg"
        />
        <meta
          property="og:title"
          content="RAPID"
        />
        <meta
          property="og:description"
          content="A new way to build web applications with React and Rust!"
        />
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
