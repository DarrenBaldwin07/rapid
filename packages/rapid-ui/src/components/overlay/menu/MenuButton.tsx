import React, { forwardRef } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { RapidStyles } from '../../../utils';
import { createVariant } from '../../../theme';

const THEME_CLASSNAME = 'rapid-menu-button';

export const menuButtonTheme = createVariant({
	baseStyle:
		'p-3 transition-all ease-out duration-300 outline-none inline-flex items-center rounded-xl text-sm font-medium focus:shadow-button-focus focus:outline-none disabled:opacity-50 hover:disabled:cursor-not-allowed',
	variants: {
		default: 'bg-main hover:bg-hoverMain text-white',
		outline: 'bg-white hover:bg-hoverWhite border border-lightGrey',
	},
	defaultProps: {
		variant: 'default',
	},
});

interface MenuButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	styles?: string;
	variant?: string;
	size?: string;
}

const getVariantClassName = (
	variant: string | undefined,
	size: string | undefined,
) => {
	const classNames = [];
	if (size) classNames.push(`rapid-menu-button-${size}`);
	if (variant) classNames.push(`rapid-menu-button-${variant}`);

	if (classNames.length > 0) {
		return classNames.join(' ');
	} else {
		return undefined;
	}
};

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
	({ styles, variant, size, ...rest }, ref) => {
		return (
			<HeadlessMenu.Button
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					getVariantClassName(variant, size) || THEME_CLASSNAME,
				)}
			/>
		);
	},
);

export default MenuButton;
