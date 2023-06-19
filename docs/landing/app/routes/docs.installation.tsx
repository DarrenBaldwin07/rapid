import React from 'react';
import { json, redirect } from '@remix-run/node';
import { Heading } from '@rapid-web/ui';
import type { LoaderFunction, LinksFunction } from '@remix-run/node';
import { useLoaderData, Outlet } from '@remix-run/react';
import { BreadCrumb } from '~/components/BreadCrumb';
import styles from '../styles/markdown.css';
import prism from '../styles/prism.css';

interface LoaderOutput {
  routes: string[]
}


export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "stylesheet",
      href: prism,
    },
  ];
};


export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);

  if (url.pathname === '/docs/installation') {
    return redirect('/docs/installation/doc');
  }

  if (url.pathname == '/docs/installation/doc') {
    url.pathname = '/docs/installation';
  }

  const routes = url.pathname.split('/').filter(Boolean);

  return json({
    routes
  });
}

const DocsInstallation = () => {
  const data = useLoaderData<LoaderOutput>();
  return (
    <div className='w-full'>
      <BreadCrumb routes={data.routes} />
      <Heading styles='exclude-from-markdown text-white text-5xl font-bold'>Installation</Heading>
      <div className='mt-12 text-white w-full'>
        <Outlet />
      </div>
    </div>

  )
}

export default DocsInstallation
