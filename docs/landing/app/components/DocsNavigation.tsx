import React, { useState } from 'react';
import { Container, Text, Heading } from '@rapid-web/ui';
import { Link } from '@remix-run/react';
import Logo from '../../assets/logo.svg';
import GradientMain from '../../assets/gradientMain.svg';
import Github from '../../assets/github.svg';
import { NavLink } from '@remix-run/react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const DocsNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
        <div className='fixed md:relative w-full transition duration-500 z-10 top-0 backdrop-blur-lg safari-blur'>
          <img className='absolute -top-[25px] md:-top-[70px] lg:-top-[100px] left-1/2 -translate-x-1/2 overflow-hidden -z-10' src={GradientMain} alt='main gradient' />
          <Container>
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
              <div className='flex flex-col bg-[#1A191D] border border-[#222222] rounded-[25px] py-3 px-6 w-full md:hidden mt-6 gap-4 hover:cursor-pointer z-10' onClick={() => setIsOpen(!isOpen)}>
                  <div className='flex items-center justify-between'>
                      <Heading styles='text-md text-white exclude-from-markdown'>Rapid Docs Menu</Heading>
                      <FontAwesomeIcon icon={faChevronDown} color='white' width={20} height={20} />
                  </div>
                  <div className={`flex-col gap-4 items-start w-full mt-2 ${isOpen ? 'flex' : 'hidden'}`}>
                      <Text styles='gradient-text uppercase text-xs'>Getting Started</Text>
                      <div className='flex flex-col gap-2'>
                          <NavLink to='/docs/introduction' className={({ isActive }) => `text-docsText exclude-from-markdown hover:text-white transition-all z-10 ease-in-out duration-100 ${isActive && 'text-white'}`}>
                              <Text styles='exclude-from-markdown'>Introduction</Text>
                          </NavLink>
                          <NavLink to='/docs/installation' className={({ isActive }) => `text-docsText exclude-from-markdown hover:text-white border-transparent transition-all z-10 ease-in-out duration-100 ${isActive && 'text-white'}`}>
                              <Text styles='exclude-from-markdown'>Installation</Text>
                          </NavLink>
                          <NavLink to='/docs/demo-app' className={({ isActive }) => `text-docsText exclude-from-markdown hover:text-white transition-all z-10 ease-in-out duration-100 ${isActive && 'text-white'}`}>
                              <Text styles='exclude-from-markdown'>Demo App</Text>
                          </NavLink>
                      </div>
                  </div>
              </div>
          </Container>
          <hr className='mt-3 border-none bg-[#222222] h-[0.5px] z-10' />
        </div>
    </div>
  )
}

export default DocsNavigation;
