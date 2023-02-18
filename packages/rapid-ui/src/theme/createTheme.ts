import { ThemeSchema } from './../../dist/theme/types.d';
import { RapidUiThemeConfig, RapidTheme } from './types';
import { ClassValue } from '../types';
import { RapidStyles, sanitizeClassNames } from '../utils';
import generateVariants from './generateVariants';

export type ThemeObject = {
	[key: string]: any;
};

export interface VariantOutput {
	variant: (
		variant?: string | undefined,
		size?: string | undefined,
	) => string;
	themeObject: any;
}

/**
 * A very simple RapidUI helper for structuring a rapid theme object
 *
 * @param config RapidUiThemeConfig
 * @returns A HTML valid className
 *
 * @beta
 */
export const createTheme = (theme: RapidTheme): RapidTheme => {
	return {
		...theme,
	};
};

// Method for taking in a Rapid theme and generating formatted @apply styles for a tailwindCSS addComponents call
export const generateTailwindPluginTheme = (theme: RapidTheme) => {
	const themeKeys = Object.keys(theme);
	const classNames: ThemeObject[] = [];
	// Loop through the theme keys and generate the @apply styles for tailwind (eventually we want to add every rapidTheme component to this)
	for (const key of themeKeys) {
		switch (key) {
			case 'button':
				const typedTheme = theme[key] as unknown as VariantOutput;
				const styles = generateVariants(typedTheme, '.rapid-button');
				classNames.push(...styles);
				break;
			case 'input':
				const typedInputTheme = theme[key] as unknown as VariantOutput;
				const inputStyles = generateVariants(
					typedInputTheme,
					'.rapid-input',
				);
				classNames.push(...inputStyles);
				break;
		}
	}

	return classNames;
};

/**
 * A RapidUI helper for easily creating component variants with Tailwind (similar to CVA: https://github.com/joe-bell/cva)
 *
 * @param config RapidUiThemeConfig
 * @returns A HTML valid className
 *
 * @beta
 */
function createVariant<T extends ThemeSchema, E extends ThemeSchema>(
	config: RapidUiThemeConfig<T, E>,
): VariantOutput {
	const { variants, defaultProps, sizes, baseStyle } = config;

	// Cast sizes as a non-undefind type
	const typedSizes = sizes as E;

	// Generate our strict typings to only allow existing classNames
	type Variant = keyof typeof variants;
	type Size = keyof typeof typedSizes;

	// Get the variant based on either the default variant or the variant that was passed in as a prop
	const getVariantClassNames = (variant?: Variant) =>
		variant ? variants[variant] : variants[defaultProps.variant];

	const getSizeClassNames = (size?: Size): ClassValue | string => {
		// Check if the consumer declared any sizes
		if (sizes) {
			// If they did then lets grab the classNames
			return size
				? (sizes[size] as ClassValue)
				: (sizes[defaultProps.size as keyof E] as ClassValue) || '';
		} else {
			// Return an empty string with no size classNames because the consumer did not input any sizes
			return '';
		}
	};

	const themeOutput = {
		variant: (variant?: Variant, size?: Size) => {
			// Merge the variants with the sizes
			// NOTE: anything in the 'sizes' theme object will override variant styles
			let sizeVariantClassNames = RapidStyles(
				sanitizeClassNames(getSizeClassNames(size)),
				// We only want to apply variants if the user did not pass in a size
				size ? '' : sanitizeClassNames(getVariantClassNames(variant) as string),
			);

			// Output the merged and sanitized ClassNames
			return RapidStyles(
				sizeVariantClassNames,
				sanitizeClassNames(baseStyle),
			);
		},
		themeObject: config,
	};

	// Give the consumer their callable theme function
	return themeOutput;
}

export default createVariant;
