import React from 'react';
import { docsSetup } from '~/helpers';
import { Heading } from '@rapid-web/ui';
import type { LoaderFunction, LinksFunction } from '@remix-run/node';
import { useLoaderData, Outlet } from '@remix-run/react';
import { BreadCrumb } from '~/components/BreadCrumb';
import styles from '../styles/markdown.css';
import prism from '../styles/prism.css';
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
	return docsSetup('quickstart', request);
};

const DocsInstallation = () => {
	const data = useLoaderData<LoaderOutput>();
	return (
		<div className='w-full'>
			<BreadCrumb routes={data.routes} />
			<Heading styles='exclude-from-markdown text-white text-5xl font-bold'>
				Quickstart
			</Heading>
			<div className='mt-12 w-full text-white'>
				<Outlet />
			</div>
			<NextDoc />
		</div>
	);
};

export default DocsInstallation;
