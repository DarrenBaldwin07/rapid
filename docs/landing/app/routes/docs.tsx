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
		default:
			return {
				path: '/docs/quick-start',
				text: 'Quickstart',
			};
	}
};

export const shouldShowDocsNavigation = (pathname: string) => {
	const docsRoutes = [
		'/docs/introduction/doc',
		'/docs/quickstart/doc',
		'/docs/quick-start/doc',
		'/docs/quick-start',
		'/docs/introduction',
		'/docs/quickstart',
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
		<div className='no-scroll-bar h-full w-full p-0 py-12 md:h-[95vh] md:overflow-y-scroll md:p-12'>
			{children}
		</div>
	);
};

const Docs = () => {
	return (
		<Layout isDocsNavigation>
			<div className='mt-32 flex w-full flex-col md:mt-0 md:flex-row'>
				<DocsSidebar />
				<DocsLayout>
					<Outlet />
				</DocsLayout>
			</div>
		</Layout>
	);
};

export default Docs;
