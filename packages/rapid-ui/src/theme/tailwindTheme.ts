

interface TailwindTheme {
    [key: string]: any;
}

const rapidDefaultTailwindTheme = {
    maxWidth: {
        'container': '100rem'
    },
    boxShadow: {
        'button-focus': '0 0 0 5px #C5C5C590',
        'button-focus2': '0 0 0 5px #99E7FF90',
    },
    borderRadius: {
        none: '0',
        sm: '.125rem',
        DEFAULT: '.25rem',
        lg: '.5rem',
        xl: '1rem',
        full: '9999px',
    },
    colors: {
        main: '#000000',
        hoverMain: '#323232',
        lightGrey: '#E0E0E0',
        secondaryGrey: '#C5C5C5',
        white: '#ffffff',
        hoverWhite: '#F6F6F6',
        danger: '#E10000',
    },
};



// TODO: make this function return something that allows consumers to use different themes instead of just the default (like MVP, etc)
const rapidTailwindTheme = (consumerTheme: TailwindTheme) => {
    return {
        maxWidth: {
            ...rapidDefaultTailwindTheme.maxWidth,
            ...consumerTheme?.maxWidth,
        },
        boxShadow: {
            ...rapidDefaultTailwindTheme.boxShadow,
            ...consumerTheme?.boxShadow,
        },
        borderRadius: {
            ...rapidDefaultTailwindTheme.borderRadius,
            ...consumerTheme?.borderRadius,
        },
        colors: {
            ...rapidDefaultTailwindTheme.colors,
            ...consumerTheme?.colors,
        }
    };
}

export default rapidTailwindTheme;
