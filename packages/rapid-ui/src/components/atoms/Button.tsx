import React from 'react';
import { RapidStyles } from '../../utils';

const defaultStyles =
	'bg-gray-200 p-3 transition-all ease duration-300 outline-none text-black hover:bg-gray-300 inline-flex items-center justify-center rounded-xl text-sm font-medium focus:shadow-button-focus focus:outline-none disabled:opacity-50 hover:disabled:cursor-not-allowed';
const outlineStyles =
	'bg-white p-3 transition-all ease duration-300 outline-none text-black border border-lightGrey inline-flex items-center rounded-xl text-sm font-medium hover:bg-hoverWhite focus:shadow-button-focus focus:outline-none disabled:opacity-50 hover:disabled:cursor-not-allowed';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, ...rest }, ref) => {
		return (
			<button
				ref={ref}
				{...rest}
				className={RapidStyles(className || '', outlineStyles)}
			/>
		);
	},
);

export default Button;
