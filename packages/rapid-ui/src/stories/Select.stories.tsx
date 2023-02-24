import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select, Option } from '../';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Components/primitives/Select',
	component: Select,
} as ComponentMeta<typeof Select>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Select> = (_: any) => (
	<Select styles='w-56'>
		<Option value='Test'>Test</Option>
	</Select>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
