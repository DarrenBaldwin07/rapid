import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '../';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Components/forms/Switch',
	component: Switch,
} as ComponentMeta<typeof Switch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Switch> = (_: any) => {
	const [enabled, setEnabled] = useState(false);
	return (
		<div>
			<Switch enabled={enabled} onChange={(value) => setEnabled(value)} />
		</div>
	);
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
