import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Box } from '../';

export default {
	title: 'Components/primitives/Box',
	component: Box,
	argTypes: {
		as: {
			control: 'select',
			options: ['div'],
			description: 'The HTML element used for the Box component.',
		},
		styles: {
			control: 'box',
			description: 'Additional styles for the Box component.',
		},
	},
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = (args) => (
	<Box {...args}>Hello World!</Box>
);

export const Primary = Template.bind({});
