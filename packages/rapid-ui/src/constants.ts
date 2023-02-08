// This is the entrypoint for all of our CSS styles in other applications
export const TAILWIND_COMPONENTS_ENTRYPOINT =
	'./node_modules/@rapid-web/ui/src/components/**/*.{js,jsx,ts,tsx}';

// This is a extended tailwind theme that can be injected into the users tailwind config before usage
const RAPID_TAILWIND_THEME = {
	extend: {
		boxShadow: {
			'button-focus': '0 0 0 5px #E0E0E090',
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
	},
};

export default RAPID_TAILWIND_THEME;
