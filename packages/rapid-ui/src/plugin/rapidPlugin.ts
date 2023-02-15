import plugin from 'tailwindcss/plugin';
import { generateTailwindPluginTheme } from '../theme';
import { RapidTheme } from '../theme';
import type * as CSS from 'csstype';

interface RapidPluginTheme {
    global: {
        [key: string]: CSS.Properties | any
    };
    theme: RapidTheme;
}

// Tailwind Utility classes we want to use inside of
const tailwindUtilities = {
    '.spinner-slow': {
        animation: 'spin 3s linear infinite',
        '@keyframes spin': {
            from: {
                transform: 'rotate(0deg)'
            },
            to: {
                transform: 'rotate(360deg)'
            }
        }
    },
    '.spinner-medium': {
        animation: 'spin 1.5s linear infinite',
        '@keyframes spin': {
            from: {
                transform: 'rotate(0deg)'
            },
            to: {
                transform: 'rotate(360deg)'
            }
        }
    },
    '.spinner-fast': {
        animation: 'spin 0.5s linear infinite',
        '@keyframes spin': {
            from: {
                transform: 'rotate(0deg)'
            },
            to: {
                transform: 'rotate(360deg)'
            }
        }
    },
};

const rapidThemeComponents = {
    '.theme-test': {
        '@apply bg-red-500': {}
    }
}

// A rapid tailwindCSS plugin
// Currently, it only supports adding global styles in a little easier way
// TODO: at some point this could support multiple default themes like: MVP, etc (currently the default one is MVP)
function rapidPlugin(styles: RapidPluginTheme) {
    const globalStyles = styles.global;
    const theme = styles.theme;
    return plugin(function({ addBase, addUtilities, addComponents }) {
        // Tailwind Utilities
        addUtilities(tailwindUtilities);
        // Rapid theme via tailwind components dir
        addComponents(generateTailwindPluginTheme(theme));
        // Add in our global styles
        addBase(globalStyles);
    });
}


export default rapidPlugin;
