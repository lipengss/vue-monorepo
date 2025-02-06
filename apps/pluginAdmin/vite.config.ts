import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import cesium from 'vite-plugin-cesium'

const pathResolve = (dir: string): any => {
	return resolve(__dirname, './', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		__VUE_OPTIONS_API__: true,
		__VUE_PROD_DEVTOOLS__: false,
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
	},
	plugins: [
		vue(),
		vueJsx(),
		cesium(),
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
			components: pathResolve('src/components'),
		},
	},
	base: './',
	build: {
		assetsDir: 'static',
	},
	server: {
		host: '0.0.0.0',
		port: 8080,
		open: true,
		proxy: {
			'/api': {
				target: 'https://www.fastmock.site/mock/dfdcb909418cae662050b8993ef89675/admin',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
			'/upload': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/upload/, ''),
			},
		},
	},
})
