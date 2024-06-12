import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { VantResolver, VantImports } from '@vant/auto-import-resolver';
import { useConfig } from '../../viteConfig';

import { resolve } from 'path';

const pathResolve = (dir: string) => resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig((mode:ConfigEnv) => {
	const env = loadEnv(mode.mode, process.cwd());
	const { server, plugins, build } = useConfig(mode);
	return {
		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver(), VantResolver()],
				imports: [VantImports()],
			}),
			Components({
				resolvers: [ElementPlusResolver(), VantResolver()],
			}),
			...plugins()
		],
		resolve: {
			alias: {
				'@': pathResolve('src'),
			},
		},
		server: {
			host: '0.0.0.0',
			hmr: true,
		},
		// build: build({ outDir: 'bill' })
	}
});
