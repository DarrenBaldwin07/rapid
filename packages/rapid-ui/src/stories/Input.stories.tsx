import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from '..';

export default {
	title: 'Components/primitives/Input',
	component: Input,
	argTypes: {
		placeholder: {
			control: 'text',
			description: 'Placeholder text for the input field.',
		},
		variant: {
			control: 'radio',
			options: [
				'default',
				'filled',
				'faded',
				'invalid',
				'flushed',
				'unstyled',
			],
			description: 'The variant style for the input field.',
		},
		styles: {
			control: 'text',
			description: 'Additional styles for the Input component.',
		},
	},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
export const Filled = Template.bind({});
export const Faded = Template.bind({});
export const Invalid = Template.bind({});
export const Flushed = Template.bind({});
export const Unstyled = Template.bind({});

Default.args = {
	placeholder: 'Default Input',
	variant: 'default',
};

Filled.args = {
	placeholder: 'Filled Input',
	variant: 'filled',
};

Faded.args = {
	placeholder: 'Faded Input',
	variant: 'faded',
};

Invalid.args = {
	placeholder: 'Invalid Input',
	variant: 'invalid',
};

Flushed.args = {
	placeholder: 'Flushed Input',
	variant: 'flushed',
};

Unstyled.args = {
	placeholder: 'Unstyled Input',
	variant: 'unstyled',
};
