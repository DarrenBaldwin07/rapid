import React from 'react';
import { json, redirect } from '@remix-run/node';
import { Heading } from '@rapid-web/ui'
import type { LoaderFunction, LinksFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { BreadCrumb } from '~/components/BreadCrumb';
import { Outlet } from '@remix-run/react';
import styles from '../styles/markdown.css';

interface LoaderOutput {
  routes: string[]
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);

  if (url.pathname === '/docs/introduction') {
    return redirect('/docs/introduction/doc');
  }

  if (url.pathname == '/docs/introduction/doc') {
    url.pathname = '/docs/introduction';
  }

  const routes = url.pathname.split('/').filter(Boolean);

  return json({
    routes
  });
}

const DocsIntroduction = () => {
  const data = useLoaderData<LoaderOutput>();
  return (
    <div className='h-full md:h-[85vh] md:overflow-y-scroll w-full flex flex-col no-scroll-bar'>
      <BreadCrumb routes={data.routes} />
      <Heading styles='exclude-from-markdown text-white text-5xl font-bold'>Introduction</Heading>
      <div className='mt-6 text-white'>
        <Outlet />
      </div>
    </div>
  )
}

export default DocsIntroduction
