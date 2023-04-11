import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../';

export default {
	title: 'Components/primitives/Button',
	component: Button,
	argTypes: {
		variant: {
			description: 'The visual style variant for the button.',
			control: {
				type: 'select',
				options: ['default', 'outline', 'destructive', 'ghost', 'link'],
			},
		},
		size: {
			description: 'The size of the button.',
			control: { type: 'select', options: ['default', 'sm', 'lg'] },
		},
		isLoading: {
			description: 'Whether to show a loading spinner on the button.',
			control: { type: 'boolean' },
		},
		children: {
			description: 'The content to be rendered inside the button.',
			control: { type: 'text' },
		},
		styles: {
			description: 'Custom styles to be applied to the button.',
			control: { type: 'text' },
		},
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
	<Button {...args}>Hello World!</Button>
);

export const Primary = Template.bind({});
Primary.args = {};

export const Outline = Template.bind({});
Outline.args = { variant: 'outline' };

export const Destructive = Template.bind({});
Destructive.args = { variant: 'destructive' };

export const Ghost = Template.bind({});
Ghost.args = { variant: 'ghost' };

export const Link = Template.bind({});
Link.args = { variant: 'link' };

export const Small = Template.bind({});
Small.args = { size: 'sm' };

export const Large = Template.bind({});
Large.args = { size: 'lg' };

export const Loading = Template.bind({});
Loading.args = { isLoading: true };
