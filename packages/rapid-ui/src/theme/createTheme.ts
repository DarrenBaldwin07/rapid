import {
	ClassValue,
	ClassProp,
	ThemeSchema,
	DefaultProps,
	StringToBoolean,
	RapidUiThemeConfig,
} from './types';

const generateClassNames = () => {};

export const createVariant = () => {};

function createTheme<T, E>(config: RapidUiThemeConfig<T, E>) {
	return config;
}

const theme = createTheme({
	variants: {
		danger: 'text-red-500',
	},
	sizes: {
		lg: 'h-12',
	},
	defaultProps: {
		size: 'lg',
		variant: 'danger',
	},
});

export default createTheme;
