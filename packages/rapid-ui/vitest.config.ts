/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'happy-dom',
		include: ['**/*.{test,spec}.{js,ts,tsx}'],
	},
});
