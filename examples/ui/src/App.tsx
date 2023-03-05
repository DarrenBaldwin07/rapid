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
					<Menu>
				<MenuButton variant='outline'>More</MenuButton>
				<MenuItems wrapperStyles='origin-top-left'>
					<MenuItem>
						<div
							className={
								'flex items-center space-x-2 px-4 py-2 hover:bg-gray-100'
							}
						>
							<FontAwesomeIcon icon={faUser} color='black' />
							<a href='/account-settings'>Profile</a>
						</div>
					</MenuItem>
					<MenuItem>
						<div
							className={
								'flex items-center space-x-2 px-4 py-2 hover:bg-gray-100'
							}
						>
							<FontAwesomeIcon icon={faGear} color='black' />
							<a href='/account-settings'>Settings</a>
						</div>
					</MenuItem>
					<MenuItem>
						<div
							className={
								'flex items-center space-x-2 px-4 py-2 hover:bg-gray-100'
							}
						>
							<FontAwesomeIcon icon={faBook} color='black' />
							<a href='/account-settings'>Documentation</a>
						</div>
					</MenuItem>
					<MenuItem>
						<div
							className={
								'flex items-center space-x-2 px-4 py-2 hover:bg-gray-100'
							}
						>
							<FontAwesomeIcon icon={faPlus} color='black' />
							<a href='/account-settings'>New Post</a>
						</div>
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	);
}

export default App;
