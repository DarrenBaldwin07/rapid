import rapidUI from '@rapid-web/ui';
const { createVariant, createTheme } = rapidUI;

export const theme = createTheme({
    button: createVariant({
        baseStyle:
            'p-3 transition-all ease-out duration-300 outline-none inline-flex items-center rounded-xl text-sm font-medium focus:shadow-button-focus focus:outline-none disabled:opacity-50 hover:disabled:cursor-not-allowed',
        variants: {
            default: 'bg-main hover:bg-hoverMain text-white',
            purple: 'bg-purple-500 hover:bg-purple-600 text-white',
        },
        sizes: {
            default: 'p-3',
            sm: 'py-3 px-2',
            lg: 'px-8 py-3',
        },
        defaultProps: {
            variant: 'default',
            size: 'default',
        },
    })
});


