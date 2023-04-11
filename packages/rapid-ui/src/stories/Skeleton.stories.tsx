import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Skeleton } from '../';

export default {
	title: 'Components/feedback/Skeleton',
	component: Skeleton,
	argTypes: {
		isLoading: {
			control: { type: 'boolean' },
			description: 'Whether the skeleton text is in a loading state.',
		},
		speed: {
			control: { type: 'number' },
			description:
				'The speed at which the skeleton animation will pulse.',
		},
		styles: {
			control: {
				type: 'string',
			},
			description: 'Custom styles for the Skeleton component.',
		},
	},
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
	<Skeleton {...args} />
);

export const Default = Template.bind({});

export const WithCustomSpeed = Template.bind({});
WithCustomSpeed.args = {
	speed: 'skeleton-pulse-fast',
};
