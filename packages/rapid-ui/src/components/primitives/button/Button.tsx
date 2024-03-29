import React from 'react';
import { createVariant } from '../../../theme';
import { RapidStyles, getVariantClassName } from '../../../utils';
import { default as AliasSpinner } from '../../feedback/spinner/Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	styles?: string;
	isLoading?: boolean;
	spinner?: React.ReactNode;
	variant?: string;
	size?: string;
}

export const buttonTheme = createVariant({
	baseStyle:
		'p-3 transition-all ease-out duration-300 outline-none inline-flex justify-center items-center rounded-xl text-sm font-medium focus:shadow-button-focus focus:outline-none disabled:opacity-50 hover:disabled:cursor-not-allowed',
	variants: {
		default: 'bg-main hover:bg-hoverMain text-white active:bg-activeMain',
		outline:
			'bg-white hover:bg-hoverWhite border border-lightGrey active:bg-activeWhite',
		destructive:
			'bg-danger hover:bg-hoverDanger text-white active:bg-activeDanger',
		ghost: 'bg-transparent hover:bg-hoverWhite active:bg-activeWhite',
		link: 'bg-transparent active:text-activeMain focus:shadow-none',
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

// This is the class name that will be used to apply the global rapid theme from tailwindCSS
const THEME_CLASSNAME = 'rapid-button';

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
					getVariantClassName(variant, 'button', size) ||
						THEME_CLASSNAME,
				)}
				disabled={isLoading}
			>
				{isLoading ? (
					<>
						{spinner ? (
							spinner
						) : (
							<AliasSpinner
								data-testid='button-spinner'
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
