import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
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

export default App;
