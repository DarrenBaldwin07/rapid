import React from 'react';
import Layout from '~/components/Layout';
import DocsSidebar from '~/components/DocsSidebar';
import { redirect, json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

export const getNextDocPathName = (currentPathName?: string) => {
	switch (currentPathName) {
		case '/docs/introduction/doc':
			return {
				path: '/docs/quickstart',
				text: 'Quickstart',
			};
		case '/docs/quickstart/doc':
			return {
				path: '/docs/demo-app',
				text: 'Demo App',
			};
		case '/docs/demo-app/doc':
			return {
				path: '/docs/route-handlers',
				text: 'Route Handlers',
			};
		case '/docs/route-handlers/doc':
			return {
				path: '/docs/middleware',
				text: 'Middlware',
			};
		case '/docs/middleware/doc':
			return {
				path: '/docs/type-safety',
				text: 'Type-safety',
			};
		case '/docs/type-safety/doc':
			return {
				path: '/docs/configuration',
				text: 'Configuration',
			};
		default:
			return {
				path: '/docs/quickstart',
				text: 'Quickstart',
			};
	}
};

export const shouldShowDocsNavigation = (pathname: string) => {
	const docsRoutes = [
		'/docs/introduction/doc',
		'/docs/quickstart/doc',
		'/docs/introduction',
		'/docs/quickstart',
		'/docs/demo-app',
		'/docs/demo-app/doc',
		'/docs/route-handlers',
		'/docs/route-handlers/doc',
		'/docs/middleware',
		'/docs/middleware/doc',
		'/docs/type-safety',
		'/docs/type-safety/doc',
	];

	return docsRoutes.includes(pathname);
};

export const loader: LoaderFunction = ({ request }) => {
	const url = new URL(request.url);
	const routes = url.pathname.split('/').filter(Boolean);

	if (url.pathname === '/docs') {
		return redirect('/docs/introduction');
	}

	return json({
		routes,
	});
};

interface DocsLayoutProps {
	children: React.ReactNode;
}

const DocsLayout = ({ children }: DocsLayoutProps) => {
	return (
		<div className='no-scroll-bar mt-32 h-full w-full py-12 md:mt-12 md:h-[96vh] md:overflow-y-scroll md:p-12'>
			{children}
		</div>
	);
};

const Docs = () => {
	return (
		<Layout isDocsNavigation>
			<div className='flex w-full flex-col md:flex-row'>
				<DocsSidebar />
				<DocsLayout>
					<Outlet />
				</DocsLayout>
			</div>
		</Layout>
	);
};

export default Docs;
