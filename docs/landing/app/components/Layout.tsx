import React from 'react';
import { Container } from '@rapid-web/ui';
import Navigation from './Navigation';
import DocsNavigation from './DocsNavigation';

interface Props {
    children: React.ReactNode;
    isNavigation?: boolean;
    isDocsNavigation?: boolean;
}

const Layout = ({ children, isNavigation, isDocsNavigation }: Props) => {
  return (
    <div className='relative min-h-screen'>
        {!!isNavigation && <Navigation />}
        {!!isDocsNavigation && <DocsNavigation />}
        <Container>
            {children}
        </Container>
    </div>
  )
}

export default Layout
