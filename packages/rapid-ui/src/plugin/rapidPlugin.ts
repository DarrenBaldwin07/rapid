import plugin from 'tailwindcss/plugin';
import type * as CSS from 'csstype';

interface GlobalStyles {
    global: {
        [key: string]: CSS.Properties | any
    };
}

// A rapid tailwindCSS plugin
// Currently, it only supports adding global styles in a little easier way
function rapidPlugin(styles: GlobalStyles) {
    const globalStyles = styles.global;
    return plugin(function({ addBase}) {
        addBase(globalStyles);
    });
}


export default rapidPlugin;
