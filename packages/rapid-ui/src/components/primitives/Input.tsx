import * as React from "react"
import { createVariant } from "../../theme";
import { RapidStyles } from "../../utils";


const THEME_CLASSNAME = 'rapid-input';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    styles?: string;
    variant?: string;
}

export const inputTheme = createVariant({
  baseStyle: 'rounded-lg transition-all ease-out duration-300 outline-none border border-lightGrey focus:outline-none focus:shadow-button-focus focus:border-main',
	variants: {
		default: 'px-3 py-1',
    filled: 'bg-lightGrey focus:bg-white',
    flushed: '',
    unstyled: '',
	},
	defaultProps: {
		variant: 'default',
	},
});

const getVariantClassName = (variant: string | undefined) => {
	if (variant) return `rapid-input-${variant}`;
	else return undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ styles, placeholder, variant, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        placeholder={placeholder || 'Rapid Input'}
        className={RapidStyles(styles, getVariantClassName(variant) || THEME_CLASSNAME)}
      />
    )
  }
)

Input.displayName = "Input"

export default Input;
