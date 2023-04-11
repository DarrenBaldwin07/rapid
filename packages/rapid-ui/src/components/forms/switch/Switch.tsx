import React from 'react';
import { Switch as HeadlessSwitch, SwitchGroupProps } from '@headlessui/react';
import { RapidStyles, getVariantClassName } from '../../../utils';
import classes from '../../../conditional';
import { createVariant } from '../../../theme';
import { motion } from 'framer-motion';

export interface SwitchProps extends SwitchGroupProps<typeof HeadlessSwitch> {
	styles?: string;
	ariaLabel?: string;
	enabled: boolean;
	size?: 'sm' | 'md' | 'lg';
	variant?: string;
	enabledStyles?: string;
	disabledStyles?: string;
}

export const switchTheme = createVariant({
	variants: {
		default:
			'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
	},
	sizes: {
		sm: 'h-[20px] w-[40px]',
		md: 'h-[28px] w-[52px]',
		lg: 'h-[36px] w-[64px]',
	},
	defaultProps: {
		variant: 'default',
		size: 'md',
	},
});

const THEME_CLASSNAME = 'rapid-switch';

const Switch = React.forwardRef<
	React.ElementRef<typeof HeadlessSwitch>,
	SwitchProps
>(
	(
		{
			styles,
			ariaLabel,
			enabled,
			size,
			variant,
			enabledStyles,
			disabledStyles,
			...rest
		},
		ref,
	) => {
		const switchClassNames = RapidStyles(
			classes(
				enabled
					? enabledStyles || 'bg-black'
					: disabledStyles || 'bg-lightGrey',
				'inline-flex ring-0 focus:ring-0',
				enabled ? 'justify-end' : 'justify-start',
			),
			styles || rest.className,
			getVariantClassName(variant, 'switch', size) || THEME_CLASSNAME,
		);

		const switchLabel = ariaLabel || 'toggle';

		return (
			<HeadlessSwitch
				checked={enabled}
				ref={ref}
				{...rest}
				className={switchClassNames}
			>
				<span className='sr-only'>{switchLabel}</span>
				<motion.span
					layout
					transition={{
						duration: 0.2,
					}}
					aria-hidden='true'
					className='pointer-events-none inline-block aspect-square h-[100%] transform rounded-full bg-white shadow-lg ring-0 focus:ring-0'
				/>
			</HeadlessSwitch>
		);
	},
);

Switch.displayName = 'Switch';

export default Switch;
