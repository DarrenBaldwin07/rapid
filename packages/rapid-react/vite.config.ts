import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { name } from './package.json';
export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
		}),
	],
	// we should add in alias' here for @components etc (usng the resolve: {} prop)
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name,
			formats: ['es', 'umd'],
			fileName: (format) => `${name}.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'axios'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					axios: 'axios'
				},
			},
		},
	},
});
