import { VariantOutput, ThemeObject } from './createTheme';
import { isValidClassName } from '../utils';

function generateVariants(theme: VariantOutput, baseClassName: string) {
	const variants = Object.keys(theme.themeObject.variants || {}).filter(
		(variant) => isValidClassName(variant),
	);
	const sizes = Object.keys(theme.themeObject.sizes || {}).filter((size) =>
		isValidClassName(size),
	);
	const classNames = [];

	if (variants.length > 0) {
		// Variants
		for (const variant of variants) {
			const className = `${baseClassName}-${variant}`;
			const styles = theme.variant(variant);
			const styleKey = `@apply ${styles}`;
			const styleObject: ThemeObject = {
				[className]: {
					[styleKey]: {},
				},
			};
			classNames.push(styleObject);
		}
	}

	if (sizes.length > 0) {
		// Main sizes
		for (const size of sizes) {
			const className = `${baseClassName}-${size}`;
			const styles = theme.variant(undefined, size);
			const styleKey = `@apply ${styles}`;
			const styleObject: ThemeObject = {
				[className]: {
					[styleKey]: {},
				},
			};
			classNames.push(styleObject);
		}
	}

	// Default className for when the user does not pass in a 'variant' prop
	const className = baseClassName;
	const styles = theme.variant();
	const styleKey = `@apply ${styles}`;
	const styleObject: ThemeObject = {
		[className]: {
			[styleKey]: {},
		},
	};
	classNames.push(styleObject);


	return classNames;
}

export default generateVariants;
