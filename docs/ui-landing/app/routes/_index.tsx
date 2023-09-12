import Logo from '../../assets/logo.svg';

export default function Index() {
	return (
		<main className='main'>
			<div className='content'>
				<img width={160} src={Logo} alt='logo' />
				<div className='h-[900px]'></div>
			</div>
		</main>
	);
}
