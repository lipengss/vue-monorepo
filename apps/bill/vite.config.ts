import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { VantResolver, VantImports } from '@vant/auto-import-resolver';

import { resolve } from 'path';

const pathResolve = (dir: string) => resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver(), VantResolver()],
			imports: [VantImports()],
		}),
		Components({
			resolvers: [ElementPlusResolver(), VantResolver()],
		}),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
			// 指定symbolId格式
			symbolId: 'icon-[dir]-[name]',
			inject: 'body-last' || 'body-first',
			customDomId: '__svg__icons__dom__',
		}),
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
});
