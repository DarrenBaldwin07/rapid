import React, { useState } from 'react';
import { Container, Heading } from '@rapid-web/ui';
import { Link } from '@remix-run/react';
import Logo from '../../assets/logo.svg';
import GradientMain from '../../assets/gradientMain.svg';
import Github from '../../assets/github.svg';
import {
	faChevronRight,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NpmLogo from '../components/NpmLogo';
import CratesIoLogo from './CratesIoLogo';
import { motion } from 'framer-motion';
import DocsLinks from './DocsLinks';

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
			<img
				className='absolute -top-[25px] left-1/2 -z-50 -translate-x-1/2 overflow-hidden md:-top-[70px] lg:-top-[100px]'
				src={GradientMain}
				alt='main gradient'
			/>
			<div className='safari-blur fixed top-0 z-50 w-full backdrop-blur-lg transition duration-500'>
				<Container>
					<div className='flex items-center justify-between pt-[18px]'>
						<Link to='/'>
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
						className='z-50 mt-6 flex w-full flex-col gap-4 rounded-[25px] border border-[#222222] bg-[#1A191D] px-6 py-3 hover:cursor-pointer md:hidden'
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
								<div className='mt-4 flex flex-col gap-12 pb-4'>
									<DocsLinks />
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
