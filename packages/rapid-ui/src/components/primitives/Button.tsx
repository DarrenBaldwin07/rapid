import React from 'react';
import { createVariant } from '../../theme';
import { RapidStyles, getVariantClassName } from '../../utils';
import { default as AliasSpinner } from '../feedback/Spinner';

// This is the class name that will be used to apply the global rapid theme from tailwindCSS
const THEME_CLASSNAME = 'rapid-button';

export const buttomTheme = createVariant({
	baseStyle:
		'p-3 transition-all ease-out duration-300 outline-none inline-flex items-center rounded-xl text-sm font-medium focus:shadow-button-focus focus:outline-none disabled:opacity-50 hover:disabled:cursor-not-allowed',
	variants: {
		default: 'bg-main hover:bg-hoverMain text-white',
		outline: 'bg-white hover:bg-hoverWhite border border-lightGrey',
		destructive: 'bg-danger hover:bg-hoverDanger text-white',
		ghost: 'bg-transparent hover:bg-hoverWhite',
		link: 'bg-transparent active:text-secondaryGrey focus:shadow-none',
	},
	sizes: {
		default: 'p-3',
		sm: 'py-3 px-2',
		lg: 'px-8 py-3',
	},
	defaultProps: {
		variant: 'default',
		size: 'default',
	},
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	styles?: string;
	isLoading?: boolean;
	spinner?: React.ReactNode;
	variant?: string;
	size?: string;
}


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			styles,
			isLoading = false,
			spinner,
			variant,
			size,
			children,
			...rest
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
				{...rest}
				className={RapidStyles(
					styles || rest.className,
					getVariantClassName(variant, 'button', size) || THEME_CLASSNAME,
				)}
				disabled={isLoading}
			>
				{isLoading ? (
					<>
						{spinner ? (
							spinner
						) : (
							<AliasSpinner
								size='sm'
								styles='border-white border-t-transparent border-r-transparent'
							/>
						)}
					</>
				) : (
					children
				)}
			</button>
		);
	},
);
Button.displayName = 'Button';

export default Button;
