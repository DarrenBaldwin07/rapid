import Logo from '../../assets/logo.svg';
import { Text } from '@rapid-web/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Github from '../../assets/github.svg';
import Darren from '../../assets/darren.jpg';
import NpmInstall from '../components/NpmInstall';
import { Highlight } from 'prism-react-renderer';

const CODE = `import { createVariant } from '@rapid-web/ui';
import { Button } from '@rapid-web/ui';

export const button = createVariant({
	baseStyle: 'py-2 px-3',
	variants: {
		default:
			'text-white bg-[#6925C0] hover:bg-hoverSecondary rounded-xl transition-all ease-out',
		gradient:
			'text-black gradient-button rounded-xl transition-all ease-out duration-300',
		danger: 'text-white bg-dangerRed rounded-xl transition-all ease-out',
	},
	sizes: {
		default: 'w-40 h-10',
		sm: 'w-36',
		lg: 'w-56',
	},
	defaultProps: {
		variant: 'default',
		size: 'default',
	},
});

const Page = () => {
	return (
		<div>
			<h1>Hello Rapid-UI</h1>
			<Button variant='danger'>Click me!</Button>
		</div>
	)
}`;

const theme = {
	plain: {
		color: 'white',
		fontSize: 12,
		fontFamily: 'Menlo, monospace',
	},
	styles: [
		{
			types: ['comment'],
			style: {
				color: 'var(--gray9)',
			},
		},
		{
			types: ['atrule', 'keyword', 'attr-name', 'selector'],
			style: {
				color: 'var(--gray10)',
			},
		},
		{
			types: ['punctuation', 'operator'],
			style: {
				color: 'var(--gray9)',
			},
		},
		{
			types: ['class-name', 'function', 'tag'],
			style: {
				color: '#0EC5FF',
			},
		},
	],
};

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
				<a href='https://github.com/DarrenBaldwin07/rapid/tree/main/packages/rapid-ui'>
					<div className='flex items-center gap-3 text-white'>
						Coming soon
						<FontAwesomeIcon
							icon={['fal', 'arrow-right']}
							width={14}
							height={14}
							color='white'
						/>
					</div>
				</a>
				<div className='mt-24 flex w-full flex-col'>
					<div className='border-borderClearCode bg-clearCode m-auto flex cursor-default items-center gap-2 rounded-full border px-4 py-1'>
						<Text styles='font-light text-white'>
							Coming Soon...
						</Text>
					</div>
					<div className='root bg-backdrop mt-2 w-full'>
						<Highlight theme={theme} language='jsx' code={CODE}>
							{({
								style,
								tokens,
								getLineProps,
								getTokenProps,
							}) => (
								<pre
									className='root border-borderClearCode bg-clearCode rounded-lg border p-4'
									style={style}
								>
									<div className='shine'></div>
									{tokens.map((line, i) => (
										<div
											key={i}
											{...getLineProps({ line, key: i })}
										>
											{line.map((token, key) => (
												<span
													key={i}
													{...getTokenProps({
														token,
														key,
													})}
												/>
											))}
										</div>
									))}
								</pre>
							)}
						</Highlight>
					</div>
				</div>
				<div className='mt-10 flex items-center justify-center gap-2'>
					<Text styles='font-light text-[#606060]'>Created by</Text>
					<a
						href='https://twitter.com/DarrenBaldwin03'
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
