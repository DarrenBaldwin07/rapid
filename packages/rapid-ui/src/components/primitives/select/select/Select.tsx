import React from 'react';
import { createVariant } from '../../../../theme';
import { RapidStyles } from '../../../../utils';
import SelectIcon from '../selectIcon/selectIcon';
import Option from '../Option/Option';

const THEME_CLASSNAME = 'rapid-select';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	styles?: string;
	icon?: React.ReactNode;
	iconProps?: React.SVGProps<SVGSVGElement>;
	variant?: string;
	variantSize?: string;
	placeholder?: string;
	selectStyles?: string;
}

export const selectTheme = createVariant({
	baseStyle:
		'h-9 rounded-lg transition-all ease-out duration-300 outline-none focus-within:outline-none focus-within:shadow-button-focus focus-within:border-main py-1 disabled:opacity-50 hover:disabled:cursor-not-allowed',
	variants: {
		default: 'border border-lightGrey',
		filled: 'bg-lightGrey focus-within:bg-white focus-within:border-main border border-transparent',
		invalid:
			'focus-within:shadow-invalid focus-within:border-danger border border-danger',
		flushed:
			'px-0 rounded-none border-b border-t-0 border-l-0 border-r-0 focus-within:outline-none focus-within:shadow-none',
		unstyled:
			'border-none rounded-none px-0 focus-within:outline-none focus-within:shadow-none',
	},
	defaultProps: {
		variant: 'default',
	},
});

const getVariantClassName = (
	variant: string | undefined,
	size: string | undefined,
) => {
	const classNames = [];
	if (size) classNames.push(`rapid-select-${size}`);
	if (variant) classNames.push(`rapid-select-${variant}`);

	if (classNames.length > 0) {
		return classNames.join(' ');
	} else {
		return undefined;
	}
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	(props: SelectProps, ref) => {
		const defaultSelectStyles =
			'w-full focus:outline-none focus:shadow-none px-3 bg-transparent';

		const {
			styles,
			variant,
			variantSize,
			placeholder,
			iconProps,
			children,
			selectStyles,
			icon = <SelectIcon {...iconProps} />,
			...rest
		} = props;

		return (
			<div
				className={RapidStyles(
					styles || rest.className,
					'relative flex items-center',
					getVariantClassName(variant, variantSize) ||
						THEME_CLASSNAME,
				)}
			>
				<select
					ref={ref}
					{...rest}
					className={RapidStyles(
						selectStyles || defaultSelectStyles,
						'rapid-select-child',
					)}
				>
					{placeholder && <Option value=''>{placeholder}</Option>}
					{children}
				</select>
				{icon}
			</div>
		);
	},
);

export default Select;
