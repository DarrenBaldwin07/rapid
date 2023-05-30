import React from 'react';
import Layout from '~/components/Layout';
import DocsSidebar from '~/components/DocsSidebar';
import { Outlet } from '@remix-run/react';

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
      <div className='flex'>
        <DocsSidebar />
        <DocsLayout>
          <Outlet />
        </DocsLayout>
      </div>
    </Layout>
  )
}

export default docs
