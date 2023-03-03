import type { Config } from 'tailwindcss';

const rapidDefaultTailwindTheme = {
	maxWidth: {
		container: '100rem',
	},
	boxShadow: {
		'button-focus': '0 0 0 4px #C5C5C590',
		invalid: '0 0 0 4px #E1000060',
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
		activeMain: '#646464',
		lightGrey: '#E0E0E0',
		secondaryGrey: '#C5C5C5',
		activeWhite: '#ebebeb',
		white: '#ffffff',
		hoverWhite: '#fafafa',
		danger: '#ef4444',
		hoverDanger: '#dc2626',
		activeDanger: '#c72323',
	},
};

// TODO: make this function return something that allows consumers to use different themes instead of just the default (like MVP, etc)
const rapidTailwindTheme = (consumerTheme: Config['theme']) => {
	return {
		...consumerTheme,
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
		},
	};
};

export default rapidTailwindTheme;
