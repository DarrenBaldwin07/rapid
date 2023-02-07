import plugin from 'tailwindcss/plugin';
import type * as CSS from 'csstype';

interface GlobalStyles {
    global: {
        [key: string]: CSS.Properties | any
    };
};

// A tailwindcss plugin for defining global styles (without having to touch actual css files)
function rapidPlugin(styles: GlobalStyles) {
    const globalStyles = styles.global;
    return plugin(function({ addUtilities, addComponents, e, config, addBase, theme, ...rest }) {
        addBase(globalStyles);
    });
};


export default rapidPlugin;
