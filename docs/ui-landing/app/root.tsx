import type { LinksFunction, V2_MetaFunction } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import styles from './styles/index.css';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fad as fadPro } from '@fortawesome/pro-duotone-svg-icons';
import { fas as fasPro } from '@fortawesome/pro-solid-svg-icons';
import {
	far as farPro,
	faB as fabPro,
} from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';

// This fixes odd icon size flashing from FontAwesome
config.autoAddCss = false;

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'Rapid UI' },
		{
			name: 'description',
			content:
				'A supercharged component library with global theming and beautiful unstyled components all built ontop of TailwindCSS.',
		},
	];
};

export default function App() {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width,initial-scale=1'
				/>
				<meta
					name='description'
					content='A supercharged component library with global theming and beautiful unstyled components all built ontop of TailwindCSS.'
				/>
				<meta name='twitter:card' content='summary_large_image' />
				<meta
					name='twitter:description'
					content='A supercharged component library with global theming and beautiful unstyled components all built ontop of TailwindCSS.'
				/>
				<meta
					name='twitter:site'
					content='https://rapidframework.dev'
				/>
				<meta name='twitter:title' content='RAPID' />
				<meta
					name='twitter:image'
					content='https://ui.rapidframework.dev/og-image.jpg'
				/>
				<meta
					property='og:image'
					content='https://ui.rapidframework.dev/og-image.jpg'
				/>
				<meta property='og:title' content='RAPID' />
				<meta
					property='og:description'
					content='A supercharged component library with global theming and beautiful unstyled components all built ontop of TailwindCSS.'
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

// This gives us access to all the icons in the fontAwesome library
library.add(fas, fadPro, fasPro, farPro, fal, fabPro);
