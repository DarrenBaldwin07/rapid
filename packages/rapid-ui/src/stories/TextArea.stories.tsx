import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Textarea } from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Components/primitives/Textarea',
	component: Textarea,
} as ComponentMeta<typeof Textarea>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Textarea> = (_: any) => <Textarea />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
