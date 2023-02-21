import React from 'react';
import { createVariant } from '../../../theme';
import { RapidStyles } from '../../../utils';

const THEME_CLASSNAME = 'rapid-select';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  styles?: string;
};

export const selectTheme = createVariant({
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

const Select = ({ styles, ...rest }: SelectProps) => {
  return (
    <select
      {...rest}
      className={RapidStyles(styles, THEME_CLASSNAME)}
    />
  )
}

export default Select;
