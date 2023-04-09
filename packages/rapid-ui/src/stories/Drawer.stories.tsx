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
} from '..';

export default {
	title: 'Components/overlay/Drawer',
	component: Drawer,
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (_: any) => {
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const drawerCloseBttn = createRef<HTMLButtonElement>();
	const [placement, setPlacement] = useState<
		'left' | 'right' | 'top' | 'bottom'
	>('left');

	const openDrawer = (position: 'left' | 'right' | 'top' | 'bottom') => {
		setPlacement(position);
		setIsOpenDrawer(true);
	};

	const closeDrawer = () => {
		setIsOpenDrawer(false);
	};

	return (
		<>
			<Button onClick={() => openDrawer('left')}>Open Left Drawer</Button>
			<Button onClick={() => openDrawer('right')}>
				Open Right Drawer
			</Button>
			<Button onClick={() => openDrawer('top')}>Open Top Drawer</Button>
			<Button onClick={() => openDrawer('bottom')}>
				Open Bottom Drawer
			</Button>
			<Drawer
				open={isOpenDrawer}
				direction={placement}
				onClose={closeDrawer}
				initialFocus={drawerCloseBttn}
				size='xl'
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
