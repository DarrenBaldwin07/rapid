import * as React from 'react';
import { createVariant } from '../../theme';
import { RapidStyles } from '../../utils';

const THEME_CLASSNAME = 'rapid-input';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	styles?: string;
	variant?: string;
}

export const inputTheme = createVariant({
	baseStyle:
		'h-9 rounded-lg transition-all ease-out duration-300 outline-none focus:outline-none focus:shadow-button-focus focus:border-main px-3 py-1 disabled:opacity-50 hover:disabled:cursor-not-allowed',
	variants: {
		default: 'border border-lightGrey',
		filled: 'bg-lightGrey focus:bg-white focus:border-main border border-transparent',
		invalid: 'focus:shadow-invalid focus:border-danger border border-danger',
		flushed:
			'px-0 rounded-none border-b border-t-0 border-l-0 border-r-0 focus:outline-none focus:shadow-none',
		unstyled:
			'border-none rounded-none px-0 focus:outline-none focus:shadow-none',
	},
	defaultProps: {
		variant: 'default',
	},
});

const getVariantClassName = (variant: string | undefined) => {
	if (variant) return `rapid-input-${variant}`;
	else return undefined;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ styles, placeholder, variant, ...rest }, ref) => {
		return (
			<input
				ref={ref}
				{...rest}
				placeholder={placeholder || 'Rapid Input'}
				className={RapidStyles(
					styles || rest.className,
					getVariantClassName(variant) || THEME_CLASSNAME,
				)}
			/>
		);
	},
);

Input.displayName = 'Input';

export default Input;
