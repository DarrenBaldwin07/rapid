import type { Config } from 'tailwindcss';
import {
	rapidStylesPath,
	rapidTailwindTheme,
	rapidPlugin,
} from '@rapid-web/ui';

export default {
	content: ['./app/**/*.{js,jsx,ts,tsx}', rapidStylesPath],
	theme: {
		extend: rapidTailwindTheme({
			// Extend the default rapid tailwind theme here (documentation coming soon)
			colors: {
				main: '#0E0C13',
				mainBlue: '#092AD0',
				grey: '#1A191D',
				lightGrey: '#222222',
				secondaryBlue: '#0EC5FF',
				thirdBlue: '#1A4E61',
				docsText: '#A6AABF',
				clearCode: 'hsla(0, 0%, 100%, 0.026)',
				borderClearCode: 'hsl(0, 0%, 20.5%)',
				backdrop: 'hsla(0, 0%, 100%, 0.0015)',
			},
			screens: {
				xs: '500px',
				xxs: '450px',
			},
		}),
	},
	plugins: [
		rapidPlugin({
			// Configure global styles variants here (documentation coming soon)
			global: {
				body: {
					fontFamily: 'archivo',
				},
			},
		}),
	],
} satisfies Config;
