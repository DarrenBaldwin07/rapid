import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, Flex } from '../';

export default {
	title: 'Components/layout/Flex',
	component: Flex,
	argTypes: {
		styles: {
			control: 'text',
			description: 'Additional styles for the Flex component.',
		},
	},
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => (
	<Flex {...args}>
		<Button variant='primary'>Button 1</Button>
		<Button variant='secondary'>Button 2</Button>
		<Button variant='destructive'>Button 3</Button>
	</Flex>
);

export const Primary = Template.bind({});
Primary.args = {
	styles: 'justify-evenly',
};
