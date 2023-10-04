import React from 'react';
import { docsSetup } from '~/helpers';
import type { LoaderFunction, LinksFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { BreadCrumb } from '~/components/BreadCrumb';
import NextDoc from '~/components/NextDoc';
import styles from '../styles/markdown.css';
import prism from '../styles/prism.css';

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

interface LoaderOutput {
	routes: string[];
}

export const loader: LoaderFunction = ({ request }) => {
	return docsSetup('demo-app', request);
};

const DocsDemoApp = () => {
	const data = useLoaderData<LoaderOutput>();
	return (
		<div>
			<BreadCrumb routes={data.routes} />
			<div className='mt-12 w-full text-white'>
				<Outlet />
			</div>
			<NextDoc />
		</div>
	);
};

export default DocsDemoApp;
