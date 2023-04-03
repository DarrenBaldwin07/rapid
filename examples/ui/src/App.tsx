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
	Flex,
	Drawer,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	DrawerCloseButton,
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
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const [placement, setPlacement] = useState<
		'left' | 'right' | 'top' | 'bottom'
	>('left');

	const openDrawer = (position: 'left' | 'right' | 'top' | 'bottom') => {
		setPlacement(position);
		setIsOpenDrawer(true);
	};

	const closeDrawer = () => {
		setIsOpen(false);
	};

	return (
		<Container>
			<Heading styles='text-center'>Rapid Components</Heading>

			<Text>Divider vertical</Text>
			<div className='align-center flex h-10  flex-row justify-center'>
				<Divider orientation='vertical' />
			</div>

			<Text>Divider vertical lg</Text>
			<div className='align-center flex h-10  flex-row justify-center'>
				<Divider size='lg' orientation='vertical' />
			</div>

			<Text>Divider sm variant dashed</Text>
			<div className='align-center flex h-10  flex-row justify-center'>
				<Divider size='sm' orientation='vertical' variant='dashed' />
			</div>

			<Text>Divider variant dashed</Text>
			<Divider variant='dashed' />
			<Text>Divider horizontel</Text>
			<Divider size='lg' />
			<br />

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

			<Text>Flex</Text>
			<Flex styles='justify-center items-center space-x-2'>
				<div>Flex 1</div>
				<div>Flex 2</div>
				<div>Flex 3</div>
			</Flex>

			<br />

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

			<div>
				<h1>Drawer Component Example</h1>
				<Button onClick={() => openDrawer('left')}>
					Open Left Drawer
				</Button>
				<Button onClick={() => openDrawer('right')}>
					Open Right Drawer
				</Button>
				<Button onClick={() => openDrawer('top')}>
					Open Top Drawer
				</Button>
				<Button onClick={() => openDrawer('bottom')}>
					Open Bottom Drawer
				</Button>

				<Drawer
					isOpen={isOpenDrawer}
					placement={placement}
					onClose={closeDrawer}
				>
					<DrawerHeader>Drawer Title</DrawerHeader>
					<DrawerBody>
						<p>
							This is the drawer content. You can add any elements
							here to display inside the drawer.
						</p>
					</DrawerBody>
					<DrawerFooter>
						{/* <button
							className='btn btn-primary'
							onClick={closeDrawer}
						>
							Close Drawer
						</button> */}
						<DrawerCloseButton />
					</DrawerFooter>
				</Drawer>
			</div>
		</Container>
	);
}

export default App;
