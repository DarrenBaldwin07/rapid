import Logo from '../../assets/logo.svg';
import { Text } from '@rapid-web/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Github from '../../assets/github.svg';
import Darren from '../../assets/darren.jpg';
import NpmInstall from '../components/NpmInstall';

export default function Index() {
	return (
		<main className='main'>
			<div className='content'>
				<div className='mb-6 flex flex-col gap-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<div className='bg-grey border-lightGrey color-white w-min rounded-lg border px-2 py-1 text-white'>
								<Text styles='text-sm'>v0.2.2</Text>
							</div>
							<a
								href='https://github.com/DarrenBaldwin07/rapid/tree/main/packages/rapid-ui'
								target='_blank'
								rel='noreferrer'
								className='hover:bg-grey rounded-full p-2 transition-all duration-100 ease-out'
							>
								<img
									src={Github}
									alt='github'
									width={15}
									height={15}
								/>
							</a>
						</div>
						<div className='xs:flex hidden'>
							<NpmInstall />
						</div>
					</div>
					<img width={160} src={Logo} alt='logo' />
					<Text styles='font-light text-[#606060]'>
						Beautiful, unstyled, and customizable UI components for
						React.
					</Text>
					<div className='xs:hidden flex'>
						<NpmInstall />
					</div>
				</div>
				<button className='bg-grey border-lightGrey rounded-lg border px-3 py-1 text-sm font-bold text-white'>
					<div className='flex items-center gap-4'>
						Join Waitlist
						<FontAwesomeIcon
							icon={['fal', 'arrow-right']}
							width={11}
							height={11}
							color='white'
						/>
					</div>
				</button>
				<div className='mt-[400px] flex items-center justify-center gap-2'>
					<Text styles='font-light text-[#606060]'>Crafted by</Text>
					<a
						href='https://darrenbaldwin.dev'
						rel='noreferrer'
						target='_blank'
					>
						<div className='flex items-center gap-2'>
							<img
								src={Darren}
								alt='Darren Baldwin'
								className='z-10 rounded-full'
								width={20}
								height={20}
							/>
							<Text styles='text-white'>Darren</Text>
						</div>
					</a>
				</div>
			</div>
		</main>
	);
}
