import plugin from 'tailwindcss/plugin';
import { generateTailwindPluginTheme } from '../theme';
import { RapidTheme } from '../theme';
import defaultTheme from '../theme/defaultTheme';
import tailwindUtilities from './utilities';
import type * as CSS from 'csstype';

interface RapidPluginTheme {
	global?: {
		[key: string]: CSS.Properties | any;
	};
	theme?: RapidTheme;
}

// Extended tailwind theme
// Currently, it only supports the safelist option
// TODO: we may want to see if we can simply throw our Tailwind theme into this
const extendedTheme = {
	safelist: [
		// Leaving this here for now -- we may need to safelist rapid theme classes later
		{ pattern: /rapid-.+/ },
		{ pattern: /spinner-.+/ },
		// SafeList styles for the Stack component to work
		{ pattern: /space-x-.+/ },
		{ pattern: /space-y-.+/ },
	],
};

// This merges Rapid's default theme with the one passed in (aka the user specified theme)
const mergeTheme = (theme: RapidTheme) => {
	return {
		...defaultTheme,
		...theme,
	};
};

// A Rapid tailwindCSS plugin
// TODO: at some point this could support multiple default themes like: MVP, etc (currently the default one is MVP)
function rapidPlugin(styles: RapidPluginTheme) {
	// Grab our global styles and theme
	const globalStyles = styles?.global || {};
	const theme = !!styles?.theme
		? generateTailwindPluginTheme(mergeTheme(styles.theme))
		: generateTailwindPluginTheme(defaultTheme);
	// Return back the plugin to tailwind...
	return plugin(function ({ addBase, addUtilities, addComponents }) {
		// Tailwind Utilities
		addUtilities(tailwindUtilities);
		// Rapid theme via tailwind components dir
		addComponents(theme);
		// Add in our global styles
		addBase(globalStyles);
	}, extendedTheme);
}

export default rapidPlugin;
