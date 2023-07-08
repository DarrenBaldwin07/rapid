import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { rootAuthLoader } from '@clerk/remix/ssr.server';
import { ClerkApp, ClerkCatchBoundary } from '@clerk/remix';
import { routes } from './api/bindings';
import type { Handlers } from './api/bindings';
import { createBoltClient } from '@rapid-web/react';
import styles from './index.css';

export const bolt = createBoltClient<Handlers, typeof routes>(routes, {
	transport: 'http://localhost:8080',
});

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const loader: LoaderFunction = (args) => {
	return rootAuthLoader(args);
};

function App() {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width,initial-scale=1'
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

export default ClerkApp(App);

// Refer to this documentation for more info on how to use Clerk with Remix: https://clerk.com/docs/quickstarts/get-started-with-remix
export const CatchBoundary = ClerkCatchBoundary();
