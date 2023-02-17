import * as React from "react"
import { createVariant } from "../../theme";
import { RapidStyles } from "../../utils";


const THEME_CLASSNAME = 'rapid-input';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    styles?: string;
}

export const inputTheme = createVariant({
  baseStyle: 'rounded-lg transition-all ease-out duration-300 outline-none border border-lightGrey focus:outline-none focus:shadow-button-focus focus:border-main',
	variants: {
		default: 'px-3 py-1',
	},
	defaultProps: {
		variant: 'default',
	},
});

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ styles, placeholder, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        placeholder={placeholder || 'Rapid Input'}
        className={RapidStyles(styles, THEME_CLASSNAME)}
      />
    )
  }
)

Input.displayName = "Input"

export default Input;
