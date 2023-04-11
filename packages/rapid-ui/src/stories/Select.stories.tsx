import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select, Option } from '..';

export default {
	title: 'Components/primitives/Select',
	component: Select,
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: [
					'default',
					'filled',
					'invalid',
					'flushed',
					'unstyled',
				],
			},
			description: 'The variant of the Select component.',
		},
		variantSize: {
			control: {
				type: 'select',
				options: ['sm', 'md', 'lg'],
			},
			description: 'The size of the Select component.',
		},
	},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
	<Select {...args}>
		<Option value='test1'>Option 1</Option>
		<Option value='test2'>Option 2</Option>
		<Option value='test3'>Option 3</Option>
	</Select>
);

export const Default = Template.bind({});

export const Filled = Template.bind({});
Filled.args = { variant: 'filled' };

export const Invalid = Template.bind({});
Invalid.args = { variant: 'invalid' };

export const Flushed = Template.bind({});
Flushed.args = { variant: 'flushed' };

export const Unstyled = Template.bind({});
Unstyled.args = { variant: 'unstyled' };

export const Small = Template.bind({});
Small.args = { variantSize: 'sm' };

export const Medium = Template.bind({});
Medium.args = { variantSize: 'md' };

export const Large = Template.bind({});
Large.args = { variantSize: 'lg' };
