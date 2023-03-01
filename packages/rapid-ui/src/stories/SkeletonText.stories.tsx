import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SkeletonText } from '../';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Components/feedback/SkeletonText',
	component: SkeletonText,
} as ComponentMeta<typeof SkeletonText>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SkeletonText> = (_: any) => (
	<SkeletonText />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
