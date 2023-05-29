import React from 'react';
import { Container } from '@rapid-web/ui';
import Navigation from './Navigation';

interface Props {
    children: React.ReactNode;
    isNavigation?: boolean;

}

const Layout = ({ children, isNavigation }: Props) => {
  return (
    <div className='relative min-h-screen'>
        {isNavigation && <Navigation />}
        <Container>
            {children}
        </Container>
    </div>
  )
}

export default Layout
