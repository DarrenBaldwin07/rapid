import React, { useEffect, useState } from 'react';
import { Container } from '@rapid-web/ui';
import { Link } from '@remix-run/react';
import Logo from '../../assets/logo.svg';
import GradientMain from '../../assets/gradientMain.svg';

const DocsNavigation = () => {
  return (
    <div>
        <Container>
            <img className='absolute -top-[25px] md:-top-[70px] lg:-top-[100px] left-1/2 -translate-x-1/2 z-0 overflow-hidden' src={GradientMain} alt='main gradient' />
            <div className='pt-4 flex items-center justify-between'>
                <Link className='z-10' to='/'>
                  <img width={120} src={Logo} alt='logo' />
                </Link>
                <div className='flex items-center gap-4'>

                </div>
            </div>
        </Container>
    </div>
  )
}

export default DocsNavigation;
