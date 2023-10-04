import React from 'react';
import type { LoaderFunction, LinksFunction } from '@remix-run/node';
import { useLoaderData, Outlet } from '@remix-run/react';
import { Heading } from '@rapid-web/ui';
import { BreadCrumb } from '~/components/BreadCrumb';
import { docsSetup } from '~/helpers';
import prism from '../styles/prism.css';
import styles from '../styles/markdown.css';
import NextDoc from '~/components/NextDoc';

interface LoaderOutput {
	routes: string[];
}

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: styles,
		},
		{
			rel: 'stylesheet',
			href: prism,
		},
	];
};

export const loader: LoaderFunction = ({ request }) => {
	return docsSetup('route-handlers', request);
};

const RouteHandlers = () => {
	const data = useLoaderData<LoaderOutput>();
	return (
		<div>
			<BreadCrumb routes={data.routes} />
			<Heading styles='exclude-from-markdown text-white text-5xl font-bold'>
				Route handlers
			</Heading>
			<div className='mt-12 w-full text-white'>
				<Outlet />
			</div>
			<NextDoc />
		</div>
	);
};

export default RouteHandlers;
