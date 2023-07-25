import React from 'react';
import type { LoaderFunction, LinksFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { BreadCrumb } from '~/components/BreadCrumb';
import { docsSetup } from '~/helpers';
import prism from '../styles/prism.css';
import styles from '../styles/markdown.css';

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
	return docsSetup("route-handlers", request);
};

const RouteHandlers = () => {
	const data = useLoaderData<LoaderOutput>();
	return (
		<div>
			<BreadCrumb routes={data.routes} />
			<div className='text-white'>Coming soon...</div>
		</div>
	);
};

export default RouteHandlers;
