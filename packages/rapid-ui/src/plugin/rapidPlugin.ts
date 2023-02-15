import plugin from 'tailwindcss/plugin';
import { generateTailwindPluginTheme } from '../theme';
import { RapidTheme } from '../theme';
import defaultTheme from '../theme/defaultTheme';
import type * as CSS from 'csstype';

interface RapidPluginTheme<T, E> {
    global: {
        [key: string]: CSS.Properties | any
    };
    theme?: RapidTheme<T, E>;
}

// Tailwind Utility classes we want to use inside of the consumers tailwindConfig
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

// A rapid tailwindCSS plugin
// Currently, it only supports adding global styles in a little easier way
// TODO: at some point this could support multiple default themes like: MVP, etc (currently the default one is MVP)
function rapidPlugin<T, E>(styles: RapidPluginTheme<T, E>) {
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
    });
}


export default rapidPlugin;
