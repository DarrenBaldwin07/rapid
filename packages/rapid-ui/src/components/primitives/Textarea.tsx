import React, { forwardRef } from 'react';
import { RapidStyles } from '../../utils';
import { createVariant } from '../../theme';

const THEME_CLASSNAME = 'rapid-textarea';

export interface TextareaProps
	extends React.HTMLAttributes<HTMLTextAreaElement> {
	variant?: string;
	styles?: string;
}

export const textAreaTheme = createVariant({
	baseStyle:
		'rounded-lg transition-all ease-out duration-300 outline-none focus:outline-none focus:shadow-button-focus focus:border-main px-3 py-1 disabled:opacity-50 hover:disabled:cursor-not-allowed',
	variants: {
		default: 'border border-lightGrey',
		shadow: 'bg-hoverWhite border-lightGrey focus:bg-white focus:border-main border',
		invalid:
			'focus:shadow-invalid focus:border-danger border border-danger border border-transparent',
		filled: 'bg-lightGrey focus:bg-white focus:border-main border border-transparent',
	},
	defaultProps: {
		variant: 'default',
	},
});

const getVariantClassName = (variant: string | undefined) => {
	if (variant) return `rapid-textarea-${variant}`;
	else return undefined;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ styles, variant, ...rest }, ref) => {
		return (
			<textarea
				{...rest}
				ref={ref}
				placeholder={rest.placeholder || 'Rapid Textarea'}
				className={RapidStyles(
					styles || rest.className,
					getVariantClassName(variant) || THEME_CLASSNAME,
				)}
			/>
		);
	},
);

export default Textarea;
