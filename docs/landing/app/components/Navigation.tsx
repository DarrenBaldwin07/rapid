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
				<img
					className='absolute -top-[25px] left-1/2 -z-50 -translate-x-1/2 overflow-hidden md:-top-[70px] lg:-top-[100px]'
					src={GradientMain}
					alt='main gradient'
				/>
				<div className='flex items-center justify-between pt-[18px]'>
					<img width={120} src={Logo} alt='logo' />
					<div className='z-10 flex items-center'>
						<iframe
							className='hidden sm:flex'
							src='https://ghbtns.com/github-btn.html?user=DarrenBaldwin07&repo=rapid&type=star&count=true'
							width='110'
							height='20'
							title='GitHub'
						></iframe>
						<Link
							className='z-10 flex items-center gap-2 font-bold tracking-widest text-white'
							to='/docs'
						>
							Docs
							<FontAwesomeIcon
								icon={faArrowUpRightFromSquare}
								width={14}
								color='white'
							/>
						</Link>
					</div>
				</div>
				<hr className='z-10 mt-[18px] h-[0.5px] border-none bg-[#222222]' />
			</Container>
		</div>
	);
};

export default Navigation;
