import React from 'react';
import { createVariant } from '../../theme';
import { RapidStyles } from '../../utils';

export const buttomTheme = createVariant({
	baseStyle: 'p-3 transition-all ease duration-300 outline-none inline-flex items-center rounded-xl text-sm font-medium focus:shadow-button-focus focus:outline-none disabled:opacity-50 hover:disabled:cursor-not-allowed',
	variants: {
		default: 'bg-gray-200 hover:bg-gray-300',
		outline: 'bg-white border border-lightGrey'
	},
	sizes: {},
	defaultProps: {
		variant: 'default',
	},
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, ...rest }, ref) => {
		return (
			<button
				ref={ref}
				{...rest}
				className={RapidStyles(className, buttomTheme())}
			/>
		);
	},
);

export default Button;
