import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

// 'element-plus/dist/index.css',
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ['~/assets/css/common.scss', 'animate.css'],
	modules: ['nuxt-lodash', '@element-plus/nuxt', '@vueuse/nuxt', '@pinia/nuxt', 'nuxt-swiper'],
	elementPlus: {
		themes: ['dark'],
		importStyle: 'scss',
	},
	pinia: {
		storesDirs: ['./stores/**'],
	},
	// buildModules: ['@nuxtjs/router-extras'],
	devServer: {
		port: 8669,
		host: 'localhost',
	},
	server: {
		host: '0.0.0.0',
		port: 8669,
	},
	vite: {
		plugins: [
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), 'assets/svg')],
			}),
			{
				src: '~/plugins/VueGridLayout.client.js',
				ssr: false,
			},
		],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/assets/css/element-variables.scss" as element;`,
				},
			},
		},
	},
	app: {
		head: {
			viewport: 'width=device-width, initial-scale=1',
		},
	},
});
