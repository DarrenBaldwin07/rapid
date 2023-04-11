import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Heading } from '..';

export default {
	title: 'Components/primitives/Heading',
	component: Heading,
	argTypes: {
		size: {
			control: 'radio',
			options: ['sm', 'md', 'lg'],
			description: 'The size of the heading.',
		},
		styles: {
			control: 'text',
			description: 'Additional styles for the Heading component.',
		},
	},
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => (
	<Heading {...args}>Hello World!</Heading>
);

export const Primary = Template.bind({});
