import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState, createRef } from 'react';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	DrawerCloseButton,
	Text,
	Button,
	Container,
} from '..';
import { DrawerDirections } from '../components/overlay/drawer/Drawer';

export default {
	title: 'Components/overlay/Drawer',
	component: Drawer,
	argTypes: {
		open: {
			control: { type: 'boolean' },
			description: 'Whether the drawer is open.',
		},
		onClose: {
			action: 'onClose',
			description: 'Function to close the drawer.',
		},
		direction: {
			control: {
				type: 'inline-radio',
				options: ['left', 'right', 'top', 'bottom'],
			},
			description:
				'The direction the Drawer component will slide in from.',
		},
		size: {
			control: {
				type: 'inline-radio',
				options: ['sm', 'md', 'lg', 'xl', 'full'],
			},
			description: 'The size of the Drawer component.',
		},
		enableAnimation: {
			control: {
				type: 'boolean',
			},
			description: 'Toggles the animation of the Drawer component.',
		},
	},
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = ({
	size,
	enableAnimation,
}: any) => {
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const [direction, setDirection] = useState('right');

	const drawerCloseBttn = createRef<HTMLButtonElement>();

	const openDrawer = (position: DrawerDirections) => {
		setIsOpenDrawer(true);
		setDirection(position);
	};

	const closeDrawer = () => {
		setIsOpenDrawer(false);
	};

	return (
		<>
			<Container className='flex justify-evenly'>
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
			</Container>

			<Drawer
				open={isOpenDrawer}
				direction={direction as DrawerDirections}
				onClose={closeDrawer}
				initialFocus={drawerCloseBttn}
				size={size}
				enableAnimation={enableAnimation}
			>
				<DrawerContent>
					<DrawerHeader>
						<Text>Drawer Title</Text>
						<DrawerCloseButton />
					</DrawerHeader>
					<DrawerBody>
						<Text>
							This is the drawer content. You can add any elements
							here to display inside the drawer.
						</Text>
					</DrawerBody>
					<DrawerFooter>
						<Button
							ref={drawerCloseBttn}
							className='btn btn-primary'
							onClick={closeDrawer}
						>
							Close Drawer
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export const Primary = Template.bind({});
