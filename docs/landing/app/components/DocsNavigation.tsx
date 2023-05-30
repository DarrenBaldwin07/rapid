import React, { useEffect, useState } from 'react';
import { Container } from '@rapid-web/ui';
import { Link } from '@remix-run/react';
import Logo from '../../assets/logo.svg';
import GradientMain from '../../assets/gradientMain.svg';
import Github from '../../assets/github.svg';

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
                  <a href="https://github.com/Cincinnati-Ventures/rapid" target='_blank' rel="noreferrer">
                    <img width={24} src={Github} alt='github' />
                  </a>
                </div>
            </div>
        </Container>
        <hr className='mt-3 border-none bg-[#222222] h-[0.5px] z-10' />
    </div>
  )
}

export default DocsNavigation;
