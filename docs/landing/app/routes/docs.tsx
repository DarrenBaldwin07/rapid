import React from 'react';
import Layout from '~/components/Layout';
import DocsSidebar from '~/components/DocsSidebar';
import { redirect, json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Outlet } from '@remix-run/react';
import { BreadCrumb } from '~/components/BreadCrumb';


export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const routes = url.pathname.split('/').filter(Boolean);

  if (url.pathname === '/docs') {
    return redirect('/docs/introduction');
  }

  return json({
    routes
  });
}

interface DocsLayoutProps {
  children: React.ReactNode;
}


const DocsLayout = ({ children }: DocsLayoutProps) => {
  return (
    <div className='p-12'>
      {children}
    </div>
  );
}

const Docs = () => {
  return (
    <Layout isDocsNavigation>
      <div className='flex z-10'>
        <DocsSidebar />
        <DocsLayout>
          <Outlet />
        </DocsLayout>
      </div>
    </Layout>
  )
}

export default Docs;
