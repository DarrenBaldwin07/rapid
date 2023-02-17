import { Button, VStack, Spinner, Input } from '@rapid-web/ui';
import './index.css';
function App() {
	return (
		<div className='flex flex-col align-center justify-center w-screen h-screen p-12'>
			<div>
				<VStack spacing='lg'>
					<h1 className='theme-test'>Hello world</h1>
					<h1>Hello world</h1>
					<h1>Hello world</h1>
				</VStack>
				<Button variant='outline'>Hello world</Button>
				<Spinner size='md' />
				<Input variant='unstyled' />
			</div>
		</div>
	);
}

export default App;
