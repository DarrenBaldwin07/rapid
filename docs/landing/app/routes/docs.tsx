import React from 'react';
import Layout from '~/components/Layout';
import DocsSidebar from '~/components/DocsSidebar';
import { redirect, json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

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
    <div className='p-0 py-12 md:p-12 h-full md:h-[85vh] md:overflow-y-scroll no-scroll-bar w-full'>
      {children}
    </div>
  );
}

const Docs = () => {
  return (
    <Layout isDocsNavigation>
      <div className='flex flex-col md:flex-row z-10 mt-32 md:mt-0 w-full'>
        <DocsSidebar />
        <DocsLayout>
          <Outlet />
        </DocsLayout>
      </div>
    </Layout>
  )
}

export default Docs;
