import React from 'react';
import { Text } from '@rapid-web/ui';
import { NavLink } from '@remix-run/react';

const DocsSidebar = () => {
  return (
    <div className='flex flex-col gap-4 border-r-[0.5px] border-[#222222] h-screen w-56 z-10'>
        <div className='flex flex-col gap-4 mt-12'>
            <div className='flex flex-col gap-6'>
                <Text styles='gradient-text uppercase text-xs'>Getting Started</Text>
                <div className='flex flex-col gap-2 border-l-[0.5px] border-[#222222] z-10'>
                    <NavLink to='/docs/introduction' className={({ isActive }) => `text-docsText hover:text-white border-l-2 border-transparent pl-4 transition-all z-10 ease-in-out duration-100 ${isActive && 'text-white border-l-mainBlue'}`}>
                        <Text>Introduction</Text>
                    </NavLink>
                    <NavLink to='/docs/installation' className={({ isActive}) => `text-docsText hover:text-white border-l-2 border-transparent pl-4 transition-all z-10 ease-in-out duration-100 ${isActive && 'text-white border-l-mainBlue'}`}>
                        <Text>Installation</Text>
                    </NavLink>
                    <NavLink to='/docs/demo-app' className={({ isActive}) => `text-docsText hover:text-white border-l-2 border-transparent pl-4 transition-all z-10 ease-in-out duration-100 ${isActive && 'text-white border-l-mainBlue'}`}>
                        <Text>Demo App</Text>
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DocsSidebar;
