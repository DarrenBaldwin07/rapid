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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUser,
	faGear,
	faBook,
	faPlus
} from '@fortawesome/free-solid-svg-icons';
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
				<Input variant='filled' />
			</div>
			<div className='mt-12'>
				<Textarea />
			</div>
			<Menu>
				<MenuButton variant='outline'>More</MenuButton>
				<MenuItems>
					<MenuItem>
						{({ active }: any) => (
							<div className={`${active && 'bg-gray-100'} flex items-center space-x-2 px-4 py-2`}>
								<FontAwesomeIcon icon={faUser} color='black' />
								<a
									href='/account-settings'
								>
									Profile
								</a>
							</div>
						)}
					</MenuItem>
					<MenuItem>
						{({ active }: any) => (
							<div className={`${active && 'bg-gray-100'} flex items-center space-x-2 px-4 py-2` }>
								<FontAwesomeIcon icon={faGear} color='black' />
								<a
									href='/account-settings'
								>
									Settings
								</a>
							</div>
						)}
					</MenuItem>
					<MenuItem>
						{({ active }: any) => (
							<div className={`${active && 'bg-gray-100'} flex items-center space-x-2 px-4 py-2`}>
								<FontAwesomeIcon icon={faBook} color='black' />
								<a
									href='/account-settings'
								>
									Documentation
								</a>
							</div>
						)}
					</MenuItem>
					<MenuItem>
						{({ active }: any) => (
							<div className={`${active && 'bg-gray-100'} flex items-center space-x-2 px-4 py-2`}>
								<FontAwesomeIcon icon={faPlus} color='black' />
								<a
									href='/account-settings'
								>
									New Post
								</a>
							</div>
						)}
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	);
}

export default App;
