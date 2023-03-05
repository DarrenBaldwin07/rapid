import { useState } from 'react';
import ReactDOM from 'react-dom';
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
	Switch,
	Skeleton,
	SkeletonText,
	HStack,
} from '@rapid-web/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUser,
	faGear,
	faBook,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence } from 'framer-motion';
import './index.css';

function App() {
	const [isOpen, setIsOpen] = useState(false);
	const [isEnabled, setIsEnabled] = useState(false);
	return (
		<div className='align-center flex h-screen w-screen flex-col justify-center p-12'>
			<Skeleton speed='skeleton-pulse-fast' />
			<SkeletonText lineSpacing='md' styles='rounded-sm mt-12' />
			<div>
				<HStack spacing='lg'>
					<h1 className='theme-test'>Hello world</h1>
					<h1>Hello world</h1>
					<h1>Hello world</h1>
				</HStack>
				<Tooltip label='Hello from tooltip'>
					<Button variant='ghost'>Hello world</Button>
				</Tooltip>
				<Spinner size='md' />
				<Input />
			</div>
			<div className='mt-12'>
				<Textarea />
			</div>

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
			<Switch
				enabled={isEnabled}
				onChange={(value) => setIsEnabled(value)}
				size='md'
			/>
		</div>
	);
}

export default App;
