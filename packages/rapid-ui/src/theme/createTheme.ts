import {
	ClassValue,
	ClassProp,
	ThemeSchema,
	DefaultProps,
	StringToBoolean,
	RapidUiThemeConfig,
} from './types';
import { RapidStyles } from '../utils';


export const createTheme = () => {};

function createVariant<T, E>(config: RapidUiThemeConfig<T, E>) {
	const { variants, defaultProps, sizes, baseStyle } = config;

	const typedSizes = sizes as E;

	type Variant = keyof typeof variants;
	type Size = keyof typeof typedSizes;

	// Get the variant based on either the default variant or the variant that was passed in as a prop
	const getVariantClassNames = (variant?: Variant) => variant ? variants[variant] : variants[defaultProps.variant];

	const getSizeClassNames = (size?: Size): ClassValue | string => {
		// Check if the consumer declared any sizes
		if (sizes) {
			// If they did then lets grab the classNames
			return size ? sizes[size] as ClassValue : sizes[defaultProps.size] as ClassValue;
		} else {
			// Return an empty string with no size classNames
			return '';
		}
	};

	return (variant?: Variant, size?: Size) => {
		let classNames = baseStyle
		let sizeVariantClassNames = RapidStyles(getSizeClassNames(size), getVariantClassNames(variant) as string)

		return RapidStyles(sizeVariantClassNames, baseStyle);
	};
}

const theme = createVariant({
	baseStyle: 'bg-red-500',
	variants: {
		danger: 'text-red-500',
		test: 'text-2'
	},
	sizes: {
		lg: 'h-12',
	},
	defaultProps: {
		size: 'lg',
		variant: 'danger',
	},
});

console.log(theme('danger', 'lg'))

export default createVariant;
