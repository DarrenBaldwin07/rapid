import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Divider } from '../';

export default {
	title: 'Components/primitives/Divider',
	component: Divider,
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
			description: 'The thickness size of the Divider component.',
		},
		orientation: {
			control: 'select',
			options: ['horizontal', 'vertical'],
			description: 'The orientation of the Divider component.',
		},
		variant: {
			control: 'select',
			options: ['dashed', 'solid'],
			description: 'The visual style variant of the Divider component.',
		},
		styles: {
			control: 'text',
			description: 'Additional styles for the Divider component.',
		},
	},
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => {
	const isVertical = args.orientation === 'vertical';

	return (
		<div
			className={`${
				isVertical ? 'flex' : 'flex-col'
			} h-48 w-48 items-center justify-center`}
		>
			<div className='h-16 w-16 bg-blue-200' />
			<Divider {...args} />
			<div className='h-16 w-16 bg-blue-200' />
		</div>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	size: 'sm',
	orientation: 'horizontal',
	variant: 'solid',
};
