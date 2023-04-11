import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Stack, Button } from '../';

export default {
	title: 'Components/layout/Stack',
	component: Stack,
	argTypes: {
		spacing: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description:
				'The spacing between the child elements of the Stack component.',
		},
		direction: {
			control: 'select',
			options: ['row', 'column'],
			description:
				'The direction in which the child elements are arranged in the Stack component.',
		},
		styles: {
			control: 'text',
			description: 'Additional styles for the Stack component.',
		},
	},
} as ComponentMeta<typeof Stack>;

const Template: ComponentStory<typeof Stack> = (args) => (
	<Stack {...args}>
		<Button variant='primary'>Button 1</Button>
		<Button variant='secondary'>Button 2</Button>
		<Button variant='destructive'>Button 3</Button>
	</Stack>
);

export const Primary = Template.bind({});
Primary.args = {
	spacing: 'lg',
	direction: 'column',
};
