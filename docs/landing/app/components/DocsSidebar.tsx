import React from 'react';
import { Text } from '@rapid-web/ui';
import { NavLink } from '@remix-run/react';

const DocsSidebar = () => {
	return (
		<div className='z-10'>
			<div className='z-10 hidden h-screen w-44 flex-col gap-4 border-r-[0.5px] border-[#222222] md:flex lg:w-56'>
				<div className='mt-12 flex flex-col gap-4'>
					<div className='flex flex-col gap-6'>
						<Text styles='gradient-text uppercase text-xs'>
							Getting Started
						</Text>
						<div className='z-10 flex flex-col gap-2 border-l-[0.5px] border-[#222222]'>
							<NavLink
								to='/docs/introduction'
								className={({ isActive }) =>
									`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
										isActive &&
										'border-l-mainBlue text-white'
									}`
								}
							>
								<Text styles='exclude-from-markdown'>
									Introduction
								</Text>
							</NavLink>
							<NavLink
								to='/docs/quickstart'
								className={({ isActive }) =>
									`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
										isActive &&
										'border-l-mainBlue text-white'
									}`
								}
							>
								<Text styles='exclude-from-markdown'>
									Quickstart
								</Text>
							</NavLink>
							<NavLink
								to='/docs/demo-app'
								className={({ isActive }) =>
									`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
										isActive &&
										'border-l-mainBlue text-white'
									}`
								}
							>
								<Text styles='exclude-from-markdown'>
									Demo App
								</Text>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DocsSidebar;
