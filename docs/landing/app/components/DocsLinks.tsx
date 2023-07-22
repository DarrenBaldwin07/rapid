import React from 'react';
import { Text } from '@rapid-web/ui';
import { NavLink } from '@remix-run/react';

const DocsLinks = () => {
	return (
		<div className='mt-12 flex flex-col gap-12'>
			<div className='flex flex-col gap-6'>
				<Text styles='gradient-text uppercase text-xs'>
					Getting Started
				</Text>
				<div className='z-10 flex flex-col gap-2 border-l-[0.5px] border-[#222222]'>
					<NavLink
						to='/docs/introduction'
						className={({ isActive }) =>
							`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
								isActive && 'border-l-mainBlue text-white'
							}`
						}
					>
						<Text styles='exclude-from-markdown'>Introduction</Text>
					</NavLink>
					<NavLink
						to='/docs/quickstart'
						className={({ isActive }) =>
							`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
								isActive && 'border-l-mainBlue text-white'
							}`
						}
					>
						<Text styles='exclude-from-markdown'>Quickstart</Text>
					</NavLink>
					<NavLink
						to='/docs/demo-app'
						className={({ isActive }) =>
							`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
								isActive && 'border-l-mainBlue text-white'
							}`
						}
					>
						<Text styles='exclude-from-markdown'>Demo App</Text>
					</NavLink>
				</div>
			</div>
			<div className='flex flex-col gap-6'>
				<Text styles='gradient-text uppercase text-xs'>Server</Text>
				<div className='z-10 flex flex-col gap-2 border-l-[0.5px] border-[#222222]'>
					<NavLink
						to='/docs/route-handlers'
						className={({ isActive }) =>
							`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
								isActive && 'border-l-mainBlue text-white'
							}`
						}
					>
						<Text styles='exclude-from-markdown'>
							Route handlers
						</Text>
					</NavLink>
					<NavLink
						to='/docs/middleware'
						className={({ isActive }) =>
							`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
								isActive && 'border-l-mainBlue text-white'
							}`
						}
					>
						<Text styles='exclude-from-markdown'>Middleware</Text>
					</NavLink>
					<NavLink
						to='/docs/type-safety'
						className={({ isActive }) =>
							`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
								isActive && 'border-l-mainBlue text-white'
							}`
						}
					>
						<Text styles='exclude-from-markdown'>Type Safety</Text>
					</NavLink>
					<NavLink
						to='/docs/rapid-config'
						className={({ isActive }) =>
							`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
								isActive && 'border-l-mainBlue text-white'
							}`
						}
					>
						<Text styles='exclude-from-markdown'>
							Configuration
						</Text>
					</NavLink>
				</div>
			</div>
			<div className='flex flex-col gap-6'>
				<Text styles='gradient-text uppercase text-xs'>Client</Text>
				<div className='z-10 flex flex-col gap-2 border-l-[0.5px] border-[#222222]'>
					<NavLink
						to='/docs/demo-app'
						className={({ isActive }) =>
							`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
								isActive && 'border-l-mainBlue text-white'
							}`
						}
					>
						<Text styles='exclude-from-markdown'>Vanilla</Text>
					</NavLink>
					<NavLink
						to='/docs/demo-app'
						className={({ isActive }) =>
							`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
								isActive && 'border-l-mainBlue text-white'
							}`
						}
					>
						<Text styles='exclude-from-markdown'>Remix</Text>
					</NavLink>
					<NavLink
						to='/docs/demo-app'
						className={({ isActive }) =>
							`text-docsText exclude-from-markdown z-10 border-l-2 border-transparent pl-4 transition-all duration-100 ease-in-out hover:text-white ${
								isActive && 'border-l-mainBlue text-white'
							}`
						}
					>
						<Text styles='exclude-from-markdown'>NextJS</Text>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default DocsLinks;
