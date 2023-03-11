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
	Switch,
	Skeleton,
	SkeletonText,
	SelectIcon,
	HStack,
	Container,
	Heading,
	Divider,
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
		<Container>
			<Heading styles='text-center'>Rapid Components</Heading>

			<Text>Divider non default</Text>
			<Divider variant='dashed' />
			<Text>Divider vertical</Text>
			<Divider size='lg' />
			<br />
			<Text>Divider horizantal</Text>
			<div className='align-center flex h-10  flex-row justify-center'>
				<Divider orientation='vertical' />
			</div>

			<Text>Skeleton & SkeletonText</Text>
			<div className='w-56'>
				<Skeleton speed='skeleton-pulse-fast' />
				<SkeletonText lineSpacing='md' styles='rounded-sm mt-12' />
			</div>

			<Divider />

			<Text>HStack</Text>
			<HStack spacing='lg'>
				<div>Element 1</div>
				<div>Element 2</div>
				<div>Element 3</div>
			</HStack>

			<Divider />

			<Text>Tooltip</Text>
			<Tooltip label='Hi, I am a tooltip!'>
				<Button variant='ghost'>Hover over me 🙂</Button>
			</Tooltip>

			<Divider />

			<Text>Spinner</Text>
			<Spinner size='md' />

			<Divider />

			<Text>Input</Text>
			<Input />

			<Divider />

			<Text>Textarea</Text>
			<div className='mt-12'>
				<Textarea />
			</div>

			<Divider />

			<Text>Select</Text>
			<Select styles='w-56'>
				<Option value='Test'>Test</Option>
				<Option value='Test'>Test</Option>
				<SelectIcon />
			</Select>

			<Divider />

			<Text>Modal</Text>
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

			<Divider />

			<Text>Switch</Text>
			<Switch
				enabled={isEnabled}
				onChange={(value) => setIsEnabled(value)}
				size='md'
			/>

			<Divider />
		</Container>
	);
}

export default App;
