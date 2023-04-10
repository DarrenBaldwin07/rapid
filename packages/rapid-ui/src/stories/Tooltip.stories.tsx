import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, Container, Tooltip } from '../';

export default {
	title: 'Components/overlay/Tooltip',
	component: Tooltip,
	argTypes: {
		label: {
			control: 'text',
			description: 'The content of the tooltip.',
		},
		orientation: {
			control: 'select',
			options: ['top', 'bottom', 'left', 'right'],
			description:
				'The orientation of the tooltip relative to the target element.',
		},
		shouldCloseOnSroll: {
			control: 'boolean',
			description:
				'Determines if the tooltip should close when the user scrolls.',
		},
		isAnimated: {
			control: 'boolean',
			description:
				'Determines if the tooltip should have an animated appearance and disappearance.',
		},
		variant: {
			control: 'select',
			options: ['default', 'outline', 'destructive', 'unstyled'],
			description: 'The visual style variant of the Tooltip component.',
		},
		styles: {
			control: 'text',
			description: 'Additional styles for the Tooltip component.',
		},
	},
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
	<Container styles='m-8 flex justify-center'>
		<Tooltip {...args}>
			<Button>Hello World!</Button>
		</Tooltip>
	</Container>
);

export const Primary = Template.bind({});
Primary.args = {
	label: 'Hello from the tooltip!',
	orientation: 'bottom',
};
