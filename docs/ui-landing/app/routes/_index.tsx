import type { V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	];
};

export default function Index() {
	return (
		<main className='main'>
			<div className='content'>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
				<h1 className='text-red-500'>Welcome to Remix</h1>
			</div>
		</main>
	);
}
