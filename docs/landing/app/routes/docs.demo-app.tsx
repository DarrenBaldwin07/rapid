import React from 'react';
import { docsSetup } from '~/helpers';
import type { LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { BreadCrumb } from '~/components/BreadCrumb';

interface LoaderOutput {
	routes: string[];
}

export const loader: LoaderFunction = ({ request }) => {
	return docsSetup("demo-app", request);
};

const DocsDemoApp = () => {
	const data = useLoaderData<LoaderOutput>();
	return (
		<div>
			<BreadCrumb routes={data.routes} />
			<div className='mt-12 w-full text-white'>
				<Outlet />
			</div>
		</div>
	);
};

export default DocsDemoApp;
