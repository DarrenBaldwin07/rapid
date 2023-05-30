import React from 'react';
import Layout from '~/components/Layout';
import DocsSidebar from '~/components/DocsSidebar';
import { redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

export const loader: LoaderFunction = ({ request }) => {
  const path = new URL(request.url).pathname;
  if (path === '/docs') {
    return redirect('/docs/introduction');
  }
  return null;
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

const docs = () => {
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

export default docs
