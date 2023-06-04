import React, { useState } from 'react';
import { Text, Heading } from '@rapid-web/ui';
import { NavLink } from '@remix-run/react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DocsSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className='flex flex-col bg-[#1A191D] border border-[#222222] rounded-[25px] py-3 px-6 w-full md:hidden mt-6 gap-4 hover:cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                <div className='flex items-center justify-between'>
                    <Heading styles='text-md text-white'>Rapid Docs Menu</Heading>
                    <FontAwesomeIcon icon={faChevronDown} color='white' width={20} height={20} />
                </div>
                <div className={`flex-col gap-4 items-start w-full mt-2 ${isOpen ? 'flex' : 'hidden'}`}>
                    <Text styles='gradient-text uppercase text-xs'>Getting Started</Text>
                    <div className='flex flex-col gap-2'>
                        <NavLink to='/docs/introduction' className={({ isActive }) => `text-docsText hover:text-white transition-all z-10 ease-in-out duration-100 ${isActive && 'text-white'}`}>
                            <Text>Introduction</Text>
                        </NavLink>
                        <NavLink to='/docs/installation' className={({ isActive}) => `text-docsText hover:text-white border-transparent transition-all z-10 ease-in-out duration-100 ${isActive && 'text-white'}`}>
                            <Text>Installation</Text>
                        </NavLink>
                        <NavLink to='/docs/demo-app' className={({ isActive}) => `text-docsText hover:text-white transition-all z-10 ease-in-out duration-100 ${isActive && 'text-white'}`}>
                            <Text>Demo App</Text>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className='md:flex flex-col gap-4 border-r-[0.5px] border-[#222222] h-screen w-56 z-10 hidden'>
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
        </div>
    )
}

export default DocsSidebar;
