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
				main: '#040211',
				mainBlue: '#092AD0',
				secondaryBlue: '#0EC5FF',
				docsText: '#A6AABF'
			}
		}),
	},
	plugins: [
		rapidPlugin({
			// Configure global styles variants here (documentation coming soon)
			global: {
				body: {
					background: '#0E0C13',
					fontFamily: 'archivo',
				}
			},
		}),
	],
} satisfies Config;
