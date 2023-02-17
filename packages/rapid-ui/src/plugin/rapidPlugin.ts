import plugin from 'tailwindcss/plugin';
import { generateTailwindPluginTheme } from '../theme';
import { RapidTheme } from '../theme';
import defaultTheme from '../theme/defaultTheme';
import tailwindUtilities from './utilities';
import type * as CSS from 'csstype';

interface RapidPluginTheme {
    global: {
        [key: string]: CSS.Properties | any
    };
    theme?: RapidTheme;
}

// Extended tailwind theme
// Currently it only allows
const extendedTheme = {
    safelist: [
        {pattern: /rapid-/},
        {pattern: /spinner-/},
    ]
};

// A rapid tailwindCSS plugin
// Currently, it only supports adding global styles in a little easier way
// TODO: at some point this could support multiple default themes like: MVP, etc (currently the default one is MVP)
function rapidPlugin(styles: RapidPluginTheme) {
    // Grab our global styles and theme
    const globalStyles = styles.global;
    const theme = !!styles.theme ? generateTailwindPluginTheme(styles.theme) : generateTailwindPluginTheme(defaultTheme);
    // Return back the plugin to tailwind...
    return plugin(function({ addBase, addUtilities, addComponents }) {
            // Tailwind Utilities
            addUtilities(tailwindUtilities);
            // Rapid theme via tailwind components dir
            addComponents(theme);
            // Add in our global styles
            addBase(globalStyles);
        },
        extendedTheme
    );
}


export default rapidPlugin;
