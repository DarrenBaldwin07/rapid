import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container } from '../';

export default {
	title: 'Components/layout/Container',
	component: Container,
	argTypes: {
		styles: {
			description: 'Custom styles to be applied to the container.',
			control: { type: 'text' },
		},
		maxWidth: {
			description: 'The maximum width of the container.',
			control: { type: 'radio', options: ['sm', 'md', 'lg'] },
		},
	},
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => (
	<Container {...args}>
		<div
			style={{
				backgroundColor: 'red',
				height: '50px',
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontWeight: 'bold',
			}}
		>
			I'm a div wrapper inside a Rapid-UI container
		</div>
	</Container>
);

export const Primary = Template.bind({});

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
	styles: 'border-2 border-blue-500',
};

export const SmallContainer = Template.bind({});
SmallContainer.args = {
	maxWidth: 'sm',
};

export const MediumContainer = Template.bind({});
MediumContainer.args = {
	maxWidth: 'md',
};

export const LargeContainer = Template.bind({});
LargeContainer.args = {
	maxWidth: 'lg',
};
