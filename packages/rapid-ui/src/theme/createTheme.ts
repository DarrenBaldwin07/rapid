import { ThemeSchema } from './../../dist/theme/types.d';
import {
	RapidUiThemeConfig,
	CreateVariant,
	RapidTheme
} from './types';
import { ClassValue } from '../types';
import { RapidStyles, sanitizeClassNames } from '../utils';

type themeObject = {
	[key: string]: any;
}


/**
   * A very simple RapidUI helper for structuring a rapid theme object
   *
   * @param config RapidUiThemeConfig
   * @returns A HTML valid className
   *
   * @beta
   */
export const createTheme = <T, E>(theme: RapidTheme<T, E>): RapidTheme<T, E> => {
	return {
		...theme
	};
};

// Method for taking in a Rapid theme and generating formatted @apply styles for a tailwindCSS addComponents call
export const generateTailwindPluginTheme = <T, E>(theme: RapidTheme<T, E>) => {
	const themeKeys = Object.keys(theme);
	const classNames: themeObject[] = [];
	// Loop through the theme keys and generate the @apply styles for tailwind (eventually we want to add every rapidTheme component to this)
	for (const key of themeKeys) {
		switch(key) {
			case 'button':
				const className = '.rapid-button';
				const styles = theme[key] as ((variant?: string | undefined, size?: string | undefined) => string);
				const styleKey = `@apply ${styles()}`;
				const styleObject: themeObject = {
					[className]: {
						[styleKey]: {}
					}
				};
				classNames.push(styleObject);
				break;
			case 'input':
				const inputClassName = '.rapid-input';
				const inputStyles = theme[key] as ((variant?: string | undefined, size?: string | undefined) => string);
				const inputStyleKey = `@apply ${inputStyles()}`;
				const inputStyleObject: themeObject = {
					[inputClassName]: {
						[inputStyleKey]: {}
					}
				};
				classNames.push(inputStyleObject);
				break;
		}
	}

	return classNames;
}


/**
   * A RapidUI helper for easily creating component variants with Tailwind (similar to CVA)
   *
   * @param config RapidUiThemeConfig
   * @returns A HTML valid className
   *
   * @beta
   */
function createVariant<T extends ThemeSchema, E extends ThemeSchema>(config: RapidUiThemeConfig<T, E>): CreateVariant<T, E> {
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
			return size ? sizes[size] as ClassValue : sizes[defaultProps.size as keyof E] as ClassValue || '';
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
