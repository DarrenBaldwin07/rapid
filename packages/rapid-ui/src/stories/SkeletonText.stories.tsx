import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SkeletonText } from '../';

export default {
	title: 'Components/feedback/SkeletonText',
	component: SkeletonText,
	argTypes: {
		isLoading: {
			control: { type: 'boolean' },
			description: 'Whether the skeleton text is in a loading state.',
		},
		numberOfLines: {
			control: { type: 'number' },
			description: 'The number of lines of skeleton text to display.',
		},
		speed: {
			control: { type: 'number' },
			description:
				'The speed at which the skeleton animation will pulse.',
		},
		containerStyles: {
			control: {
				type: 'string',
			},
			description: 'Custom container styles for the Skeleton component.',
		},
		lineSpacing: {
			control: {
				type: 'select',
				options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
			},
			description: 'The spacing between the lines of skeleton text.',
		},
		styles: {
			control: {
				type: 'string',
			},
			description: 'Custom styles for the Skeleton component.',
		},
	},
} as ComponentMeta<typeof SkeletonText>;

const Template: ComponentStory<typeof SkeletonText> = (args) => (
	<SkeletonText {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	isLoading: true,
	numberOfLines: 4,
	lineSpacing: 'lg',
};
