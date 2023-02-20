import {
	Button,
	VStack,
	Spinner,
	Input,
	Heading,
	MenuButton,
	MenuItem,
	MenuItems,
	Menu,
	Textarea
} from '@rapid-web/ui';
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
				<Button variant='destructive'>Hello world</Button>
				<Spinner size='md' />
				<Input />
			</div>
			<div className='mt-12'>
				<Textarea variant='invalid' />
			</div>
			<Menu>
				<MenuButton variant='outline'>More</MenuButton>
				<MenuItems>
					<MenuItem>
						{({ active }: any) => (
							<a
								className={`${active && 'bg-blue-500'}`}
								href='/account-settings'
							>
								Account settings
							</a>
						)}
					</MenuItem>
					<MenuItem>
						{({ active }: any) => (
							<a
								className={`${active && 'bg-blue-500'}`}
								href='/account-settings'
							>
								Documentation
							</a>
						)}
					</MenuItem>
					<MenuItem disabled>
						<span className='opacity-75'>
							Invite a friend (coming soon!)
						</span>
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	);
}

export default App;
