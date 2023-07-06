import React, { useEffect, useState } from 'react';
import Layout from '~/components/Layout';
import DocsSidebar from '~/components/DocsSidebar';
import { redirect, json } from '@remix-run/node';
import { Text } from '@rapid-web/ui';
import type { LoaderFunction } from '@remix-run/node';
import { Outlet, Link } from '@remix-run/react';
import Github from '../../assets/github.svg';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const getNextDocPathName = (currentPathName?: string) => {
  console.log(currentPathName);
  switch (currentPathName) {
    case '/docs/introduction/doc':
      return {
        path: '/docs/quickstart',
        text: 'Quickstart'
      };
    case '/docs/quickstart/doc':
      return {
        path: '/docs/demo-app',
        text: 'Demo App'
      };
    default:
      return {
        path: '/docs/quick-start',
        text: 'Quickstart'
      };
  }
}

const shouldShowDocsNavigation = (pathname: string) => {
  const docsRoutes = [
    '/docs/introduction/doc',
    '/docs/quickstart/doc',
    '/docs/quick-start/doc',
    '/docs/quick-start',
    '/docs/introduction',
    '/docs/quickstart',
  ];

  return docsRoutes.includes(pathname);
}

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
    <div className='p-0 py-12 md:p-12 h-full md:h-[95vh] md:overflow-y-scroll no-scroll-bar w-full'>
      {children}
    </div>
  );
}

const Docs = () => {
  const [pathName, setPathName] = useState<string>();
  const [nextPathName, setNextPathName] = useState(getNextDocPathName(pathName));
  const [isShowingDocsNavigation, setIsShowingDocsNavigation] = useState(false);

  useEffect(() => {
    setPathName(window.location.pathname)
    setNextPathName(getNextDocPathName(pathName));
    setIsShowingDocsNavigation(shouldShowDocsNavigation(pathName as string));
  }, [pathName, nextPathName])

  return (
    <Layout isDocsNavigation>
      <div className='flex flex-col md:flex-row mt-32 md:mt-0 w-full'>
        <DocsSidebar />
        <DocsLayout>
          <Outlet />
          {isShowingDocsNavigation && (
            <div className='flex items-center gap-4 mt-16 flex-col md:flex-row'>
              <a href="https://github.com/Cincinnati-Ventures/rapid" className='w-full md:w-1/3 no-underline exclude-from-markdown'>
                <div className='p-4 gap-2 border-[0.5px] border-[#222222] flex items-center rounded-lg hover:border-mainBlue transition-all duration-100 ease-linear'>
                  <img width={24} src={Github} alt='github' />
                  <Text className='text-sm font-bold text-white'>View on Github</Text>
                </div>
              </a>
              <Link to={nextPathName.path} className='w-full md:w-1/3 no-underline exclude-from-markdown'>
                <div className='p-4 gap-2 border-[0.5px] border-[#222222] flex items-center rounded-lg hover:border-mainBlue transition-all duration-100 ease-linear'>
                  <FontAwesomeIcon icon={faChevronRight} color='white' width={20} height={20} />
                  <Text className='text-sm font-bold text-white'>Next Doc: {nextPathName?.text}</Text>
                </div>
              </Link>
            </div>
          )}
        </DocsLayout>
      </div>
    </Layout>
  )
}

export default Docs;
