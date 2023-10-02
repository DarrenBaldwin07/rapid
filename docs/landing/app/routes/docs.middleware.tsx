import React from 'react';
import { docsSetup } from '~/helpers';
import { Heading } from '@rapid-web/ui';
import type { LoaderFunction, LinksFunction } from '@remix-run/node';
import { useLoaderData, Outlet } from '@remix-run/react';
import { BreadCrumb } from '~/components/BreadCrumb';
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
	];
};

export const loader: LoaderFunction = ({ request }) => {
	return docsSetup('middleware', request);
};

const DocsIntroduction = () => {
	const data = useLoaderData<LoaderOutput>();
	return (
		<div className='flex w-full flex-col'>
			<BreadCrumb routes={data.routes} />
			<Heading styles='exclude-from-markdown text-white text-5xl font-bold'>
				Middleware
			</Heading>
			<div className='mt-6 text-white'>
				<Outlet />
			</div>
			<NextDoc />
		</div>
	);
};

export default DocsIntroduction;
