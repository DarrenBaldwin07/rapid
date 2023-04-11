import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Textarea } from '..';

export default {
	title: 'Components/primitives/Textarea',
	component: Textarea,
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'filled', 'faded', 'invalid', 'unstyled'],
			description: 'The visual style variant of the Textarea component.',
		},
		styles: {
			control: 'text',
			description: 'Additional styles for the Textarea component.',
		},
	},
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
	<Textarea {...args} />
);

export const Primary = Template.bind({});
