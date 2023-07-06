import React, { useState } from 'react';
import { Container, Text, Heading } from '@rapid-web/ui';
import { Link } from '@remix-run/react';
import Logo from '../../assets/logo.svg';
import GradientMain from '../../assets/gradientMain.svg';
import Github from '../../assets/github.svg';
import { NavLink } from '@remix-run/react';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NpmLogo from '../components/NpmLogo';
import CratesIoLogo from './CratesIoLogo';
import { motion } from 'framer-motion';

const DocsNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	const variants = {
		open: {
			height: 'auto',
			opacity: 1,
			transition: {
				duration: 0.3,
				ease: 'easeInOut',
			},
		},
		closed: {
			height: 0,
			opacity: 0,
			transition: {
				duration: 0.3,
				ease: 'easeInOut',
			},
		},
	};

	return (
		<div>
			<div className='safari-blur fixed top-0 w-full backdrop-blur-lg transition duration-500 md:relative'>
				<img
					className='absolute -top-[25px] left-1/2 -z-50 -translate-x-1/2 overflow-hidden md:-top-[70px] lg:-top-[100px]'
					src={GradientMain}
					alt='main gradient'
				/>
				<Container>
					<div className='flex items-center justify-between pt-[18px]'>
						<Link className='z-10' to='/'>
							<img width={120} src={Logo} alt='logo' />
						</Link>
						<div className='flex items-center gap-6'>
							<a
								href='https://crates.io/crates/rapid-web'
								target='_blank'
								rel='noreferrer'
							>
								<CratesIoLogo />
							</a>
							<a
								href='https://www.npmjs.com/org/rapid-web'
								target='_blank'
								rel='noreferrer'
							>
								<NpmLogo />
							</a>
							<a
								href='https://github.com/Cincinnati-Ventures/rapid'
								target='_blank'
								rel='noreferrer'
							>
								<img width={24} src={Github} alt='github' />
							</a>
						</div>
					</div>
					<div
						className='z-10 mt-6 flex w-full flex-col gap-4 rounded-[25px] border border-[#222222] bg-[#1A191D] px-6 py-3 hover:cursor-pointer md:hidden'
						onClick={() => setIsOpen(!isOpen)}
					>
						<div className='flex items-center gap-4'>
              <FontAwesomeIcon
								icon={isOpen ? faChevronDown : faChevronRight}
								color='white'
								width={20}
								height={20}
							/>
							<Heading styles='text-md text-white exclude-from-markdown'>
								Rapid Docs Menu
							</Heading>
						</div>
						<div className={`${isOpen ? 'flex' : 'hidden'}`}>
							<motion.div
								animate={isOpen ? 'open' : 'closed'}
								variants={variants}
							>
								<div
									className={`mt-2 w-full flex-col items-start gap-4`}
								>
									<Text styles='gradient-text uppercase text-xs'>
										Getting Started
									</Text>
									<div className='flex flex-col gap-2 mt-2'>
										<NavLink
											to='/docs/introduction'
											className={({ isActive }) =>
												`text-docsText exclude-from-markdown z-10 transition-all duration-100 ease-in-out hover:text-white ${
													isActive && 'text-white'
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
												`text-docsText exclude-from-markdown z-10 border-transparent transition-all duration-100 ease-in-out hover:text-white ${
													isActive && 'text-white'
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
												`text-docsText exclude-from-markdown z-10 transition-all duration-100 ease-in-out hover:text-white ${
													isActive && 'text-white'
												}`
											}
										>
											<Text styles='exclude-from-markdown'>
												Demo App
											</Text>
										</NavLink>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</Container>
				<hr className='exclude-from-markdown z-10 mt-[18px] h-[0.5px] border-none bg-[#222222]' />
			</div>
		</div>
	);
};

export default DocsNavigation;
