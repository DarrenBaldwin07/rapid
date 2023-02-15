import React from 'react';
import { createVariant } from '../../theme';
import { RapidStyles } from '../../utils';
import {default as AliasSpinner} from '../feedback/Spinner';

// This is the class name that will be used to apply the global rapid theme from tailwindCSS
const THEME_CLASSNAME = 'rapid-button';

export const buttomTheme = createVariant({
	baseStyle: 'p-3 transition-all ease-out duration-300 outline-none inline-flex items-center rounded-xl text-sm font-medium focus:shadow-button-focus focus:outline-none disabled:opacity-50 hover:disabled:cursor-not-allowed',
	variants: {
		default: 'bg-gray-200 hover:bg-gray-300',
		outline: 'bg-white border border-lightGrey',
		ghost: 'bg-transparent hover:bg-lightGrey',
		link: 'bg-transparent active:text-secondaryGrey focus:shadow-none'
	},
	sizes: {},
	defaultProps: {
		variant: 'default',
	},
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	styles?: string;
	isLoading?: boolean;
	spinner?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ styles, isLoading = false, spinner, children, ...rest }, ref) => {
		return (
			<button
				ref={ref}
				{...rest}
				className={RapidStyles(styles, THEME_CLASSNAME)}
				disabled={isLoading}
			>
				{isLoading ? (
					<>
						{spinner ? (
							spinner
						) : (
							<AliasSpinner size='sm' />
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
