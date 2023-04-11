import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '..';

export default {
	title: 'Components/overlay/Menu',
	component: Menu,
	subcomponents: { MenuButton, MenuItem, MenuItems },
	argTypes: {
		styles: {
			control: 'text',
			description: 'Additional styles for the Menu component.',
		},
	},
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
	<Menu {...args}>
		<MenuButton variant='outline'>Menu</MenuButton>
		<MenuItems>
			<MenuItem>
				{({ active }: any) => (
					<div
						className={`${
							active && 'bg-gray-100'
						} flex items-center space-x-2 px-4 py-2`}
					>
						<a href='/account-settings'>Profile</a>
					</div>
				)}
			</MenuItem>
			<MenuItem>
				{({ active }: any) => (
					<div
						className={`${
							active && 'bg-gray-100'
						} flex items-center space-x-2 px-4 py-2`}
					>
						<a href='/account-settings'>Settings</a>
					</div>
				)}
			</MenuItem>
			<MenuItem>
				{({ active }: any) => (
					<div
						className={`${
							active && 'bg-gray-100'
						} flex items-center space-x-2 px-4 py-2`}
					>
						<a href='/account-settings'>Documentation</a>
					</div>
				)}
			</MenuItem>
			<MenuItem>
				{({ active }: any) => (
					<div
						className={`${
							active && 'bg-gray-100'
						} flex items-center space-x-2 px-4 py-2`}
					>
						<a href='/account-settings'>New Post</a>
					</div>
				)}
			</MenuItem>
		</MenuItems>
	</Menu>
);

export const Primary = Template.bind({});
Primary.args = {};
