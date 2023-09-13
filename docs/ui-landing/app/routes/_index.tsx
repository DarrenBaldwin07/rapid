import Logo from '../../assets/logo.svg';
import { Text } from '@rapid-web/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Github from '../../assets/github.svg';

export default function Index() {
	return (
		<main className='main'>
			<div className='content'>
				<div className='flex flex-col gap-4'>
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
						<div className='bg-grey border-lightGrey flex items-center gap-2 rounded-full border transition-all duration-100 ease-out hover:cursor-copy hover:bg-[#1D1C21]'>
							<code className='py-1 pl-4 text-xs text-white'>
								npm install coming-soon
							</code>
							<div className='py-2 pr-2'>
								<div className='bg-lightGrey rounded-full p-2 text-white'>
									<FontAwesomeIcon
										icon={['fal', 'copy']}
										width={12}
										height={12}
										color='white'
									/>
								</div>
							</div>
						</div>
					</div>
					<img width={160} src={Logo} alt='logo' />
					<Text styles='font-light text-[#606060]'>
						Beautiful, unstyled, and customizable UI components for
						React.
					</Text>
				</div>
			</div>
		</main>
	);
}
