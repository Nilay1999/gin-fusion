import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	base: '',
	plugins: [react()],
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
		},
	},
	server: {
		open: true,
		port: 3000,
	},
});
