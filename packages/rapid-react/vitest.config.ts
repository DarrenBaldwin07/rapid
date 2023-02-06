/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	test: {
		globals: true,
		environment: 'happy-dom',
		include: ['**/*.{test,spec}.{js,ts,tsx}'],
	},
});
