import React from 'react';
import GradientMain from '../../assets/gradientMain.svg';
import { Container } from '@rapid-web/ui';
import { Link } from '@remix-run/react';
import Logo from '../../assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  return (
    <div>
      <Container styles='relative'>
        <img className='absolute -top-[25px] md:-top-[70px] lg:-top-[100px] left-1/2 -translate-x-1/2 z-0 overflow-hidden' src={GradientMain} alt='main gradient' />
        <div className='pt-[18px] flex items-center justify-between'>
          <img width={120} src={Logo} alt='logo' />
          <div className='flex items-center z-10'>
            <iframe className='hidden sm:flex' src="https://ghbtns.com/github-btn.html?user=Cincinnati-Ventures&repo=rapid&type=star&count=true" width="110" height="20" title="GitHub"></iframe>
            <Link className='z-10 text-white font-bold tracking-widest flex items-center gap-2' to='/docs'>
              Docs
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                width={14}
                color='white'
              />
            </Link>
          </div>
        </div>
        <hr className='mt-[18px] border-none bg-[#222222] h-[0.5px] z-10' />
      </Container>
    </div>
  )
}

export default Navigation
