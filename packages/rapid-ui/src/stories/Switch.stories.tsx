import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import { Switch, SwitchProps } from '../';

export default {
	title: 'Components/forms/Switch',
	component: Switch,
	args: {
		ariaLabel: 'Toggle Switch',
	},
	argTypes: {
		enabled: {
			control: { type: 'boolean' },
			description: 'Whether the switch is enabled or disabled.',
		},
		size: {
			control: { type: 'inline-radio', options: ['sm', 'md', 'lg'] },
			description: 'The size of the switch.',
		},
		variant: {
			control: { type: 'text' },
			description: 'The variant of the switch.',
		},
		enabledStyles: {
			control: { type: 'text' },
			description: 'Custom styles for the enabled state of the switch.',
		},
		disabledStyles: {
			control: { type: 'text' },
			description: 'Custom styles for the disabled state of the switch.',
		},
	},
};

const Template: ComponentStory<typeof Switch> = (args: SwitchProps) => {
	const [enabled, setEnabled] = useState(args.enabled);
	return (
		<div>
			<Switch
				{...args}
				enabled={enabled}
				onChange={(value) => setEnabled(value)}
			/>
		</div>
	);
};

export const Primary = Template.bind({});
Primary.args = {
	enabled: true,
};
