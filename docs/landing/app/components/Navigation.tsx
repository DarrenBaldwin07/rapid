import React from 'react';
import GradientMain from '../../assets/gradientMain.svg';
import { Container } from '@rapid-web/ui';
import { Link } from '@remix-run/react';
import Logo from '../../assets/logo.svg';

const Navigation = () => {
  return (
    <div>
      <Container styles='relative'>
        <img className='absolute -top-[100px] left-1/2 -translate-x-1/2 z-0 overflow-hidden' src={GradientMain} alt='main gradient' />
        <div className='pt-4 flex items-center justify-between'>
          <img width={120} src={Logo} alt='logo' />
          <div className='flex items-center gap-4'>
            <Link className='z-10 text-white font-bold tracking-widest' to='/docs'>
              Docs
            </Link>
          </div>
        </div>
        <hr className='mt-3 border-none bg-[#222222] h-[0.5px] z-10' />
      </Container>
    </div>
  )
}

export default Navigation
