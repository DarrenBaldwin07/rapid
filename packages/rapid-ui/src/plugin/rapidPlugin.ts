import plugin from 'tailwindcss/plugin';
import type * as CSS from 'csstype';

interface GlobalStyles {
    global: {
        [key: string]: CSS.Properties | any
    };
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
    }
};


// A rapid tailwindCSS plugin
// Currently, it only supports adding global styles in a little easier way
// TODO: at some point this could support multiple default themes like: MVP, etc (currently the default one is MVP)
function rapidPlugin(styles: GlobalStyles) {
    const globalStyles = styles.global;
    return plugin(function({ addBase, addUtilities }) {
        // Tailwind Utilities
        addUtilities(tailwindUtilities)
        // Add in our global styles
        addBase(globalStyles);
    });
}


export default rapidPlugin;
