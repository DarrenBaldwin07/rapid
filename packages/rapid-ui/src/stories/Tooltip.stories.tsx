import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, Tooltip } from '../';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Components/overlay/Tooltip',
	component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tooltip> = (_: any) => (
    <Tooltip label='Hello from the tooltip!'>
        <Button>Hello World!</Button>
    </Tooltip>

);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
