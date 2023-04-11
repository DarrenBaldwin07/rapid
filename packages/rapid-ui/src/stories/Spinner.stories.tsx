import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Spinner } from '..';

export default {
	title: 'Components/feedback/Spinner',
	component: Spinner,
	argTypes: {
		speed: {
			control: {
				type: 'inline-radio',
				options: ['slow', 'medium', 'fast'],
			},
			description: 'The spinning speed of the spinner.',
		},
		size: {
			control: { type: 'inline-radio', options: ['sm', 'md', 'lg'] },
			description: 'The size of the spinner.',
		},
		label: {
			control: { type: 'text' },
			description: 'Accessible label for the spinner.',
		},
	},
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
	<Spinner {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	speed: 'fast',
	size: 'md',
	label: 'Loading...',
};
