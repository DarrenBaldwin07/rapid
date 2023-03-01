import { useState } from 'react';
import {
	Button,
	VStack,
	Spinner,
	Input,
	MenuButton,
	MenuItem,
	MenuItems,
	Menu,
	Textarea,
	Select,
	Option,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalTitle,
	Text,
	Tooltip,
	Switch
} from '@rapid-web/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUser,
	faGear,
	faBook,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import './index.css';
function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [isEnabled, setIsEnabled] = useState(false);
	return (
		<div className='flex flex-col align-center justify-center w-screen h-screen p-12'>
			<div />
			<div>
				<VStack spacing='lg'>
					<h1 className='theme-test'>Hello world</h1>
					<h1>Hello world</h1>
					<h1>Hello world</h1>
				</VStack>
				<Tooltip label='Hello from tooltip'>
					<Button variant='ghost'>Hello world</Button>
				</Tooltip>
				<Spinner size='md' />
				<Input />
			</div>
			<div className='mt-12'>
				<Textarea />
			</div>
			<Menu>
				<MenuButton variant='outline'>More</MenuButton>
				<MenuItems wrapperStyles='origin-top-right'>
					<MenuItem>
						<div
							className={
								'hover:bg-gray-100 flex items-center space-x-2 px-4 py-2'
							}
						>
							<FontAwesomeIcon icon={faUser} color='black' />
							<a href='/account-settings'>Profile</a>
						</div>
					</MenuItem>
					<MenuItem>
						<div
							className={
								'hover:bg-gray-100 flex items-center space-x-2 px-4 py-2'
							}
						>
							<FontAwesomeIcon icon={faGear} color='black' />
							<a href='/account-settings'>Settings</a>
						</div>
					</MenuItem>
					<MenuItem>
						<div
							className={
								'hover:bg-gray-100 flex items-center space-x-2 px-4 py-2'
							}
						>
							<FontAwesomeIcon icon={faBook} color='black' />
							<a href='/account-settings'>Documentation</a>
						</div>
					</MenuItem>
					<MenuItem>
						<div
							className={
								'hover:bg-gray-100 flex items-center space-x-2 px-4 py-2'
							}
						>
							<FontAwesomeIcon icon={faPlus} color='black' />
							<a href='/account-settings'>New Post</a>
						</div>
					</MenuItem>
				</MenuItems>
			</Menu>
			<Select styles='w-56'>
				<Option value='Test'>Test</Option>
			</Select>
			<Button styles='w-max' onClick={() => setIsOpen(true)}>
				Open Modal
			</Button>
			<Modal open={isOpen} onClose={() => setIsOpen(false)}>
				<ModalOverlay />
				<ModalContent styles='flex flex-col'>
					<ModalTitle>Delete Account</ModalTitle>

					<Text styles='mt-2 text-secondaryGrey'>
						Are you sure you want to delete your account? All of
						your data will be permanently removed. This action
						cannot be undone.
					</Text>
					<div className='self-end'>
						<Button
							styles='mt-4 mr-2'
							variant='outline'
							onClick={() => setIsOpen(false)}
						>
							Cancel
						</Button>
						<Button styles='mt-4' onClick={() => setIsOpen(false)}>
							Deactivate
						</Button>
					</div>
				</ModalContent>
			</Modal>
			<Switch enabled={isEnabled} onChange={(value) => setIsEnabled(value)} size='md' />
		</div>
	);
}

export default App;
