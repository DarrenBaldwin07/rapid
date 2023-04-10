import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '../';

export default {
	title: 'Components/primitives/Text',
	component: Text,
	argTypes: {
		as: {
			control: 'select',
			options: [
				'p',
				'span',
				'i',
				'b',
				'u',
				'abbr',
				'cite',
				'kbd',
				'mark',
				's',
				'samp',
				'sup',
			],
			description: 'The HTML element used for the Text component.',
		},
		styles: {
			control: 'text',
			description: 'Additional styles for the Text component.',
		},
	},
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => (
	<Text {...args}>Hello World!</Text>
);

export const Primary = Template.bind({});
