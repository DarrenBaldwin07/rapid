
import {
	RapidUiThemeConfig,
	CreateVariant,
	RapidTheme
} from './types';
import { ClassValue } from '../types';
import { RapidStyles, sanitizeClassNames } from '../utils';


// TODO: not yet sure what this will be exactly
export const createTheme = (theme: RapidTheme): RapidTheme => {
	return {
		...theme
	};
};

function createVariant<T, E>(config: RapidUiThemeConfig<T, E>): CreateVariant<T, E> {
	const { variants, defaultProps, sizes, baseStyle } = config;

	// Cast sizes as a non-undefind type
	const typedSizes = sizes as E;

	// Generate our strict typings to only allow existing classNames
	type Variant = keyof typeof variants;
	type Size = keyof typeof typedSizes;

	// Get the variant based on either the default variant or the variant that was passed in as a prop
	const getVariantClassNames = (variant?: Variant) => variant ? variants[variant] : variants[defaultProps.variant];

	const getSizeClassNames = (size?: Size): ClassValue | string => {
		// Check if the consumer declared any sizes
		if (sizes) {
			// If they did then lets grab the classNames
			return size ? sizes[size] as ClassValue : sizes[defaultProps.size as keyof E] as ClassValue;
		} else {
			// Return an empty string with no size classNames because the consumer did not input any sizes
			return '';
		}
	};

	// Give the consumer their callable theme function
	return (variant?: Variant, size?: Size) => {
		// Merge the variants with the sizes
		// NOTE: anything in the 'sizes' theme object will override variant styles
		let sizeVariantClassNames = RapidStyles(sanitizeClassNames(getSizeClassNames(size)), sanitizeClassNames(getVariantClassNames(variant) as string))

		// Output the merged and sanitized ClassNames
		return RapidStyles(sizeVariantClassNames, sanitizeClassNames(baseStyle));
	};
}

export default createVariant;
