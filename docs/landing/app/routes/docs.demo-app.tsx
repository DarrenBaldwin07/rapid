import React from 'react';
import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { BreadCrumb } from '~/components/BreadCrumb';

interface LoaderOutput {
  routes: string[]
}

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const routes = url.pathname.split('/').filter(Boolean);

  return json({
    routes
  });
}

const DocsDemoApp = () => {
  const data = useLoaderData<LoaderOutput>();
  return (
    <div>
      <BreadCrumb routes={data.routes} />
      <div className='text-white'>Demo App doc (Coming soon...)</div>
    </div>

  )
}

export default DocsDemoApp;
