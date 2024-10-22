import { loadEnv, ConfigEnv } from 'vite';
import { buildConfig } from './build';
import { resolve } from 'path';
// name
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus';
// 代码压缩
import viteCompression from 'vite-plugin-compression';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export function useConfig(mode: ConfigEnv) {
	const env = loadEnv(mode.mode, process.cwd());
	function server(url?: string) {
		return {
			host: '0.0.0.0',
			port: env.VITE_PORT as unknown as number,
			open: JSON.parse(env.VITE_OPEN),
			hmr: true,
			proxy: {
				'/api': {
					ws: true,
					target: url,
					secure: false,
					changeOrigin: true,
					rewrite: (path: string) => path.replace(/^\/api/, ''),
				},
				'/socket': {
					ws: true,
					target: url,
					secure: false,
					changeOrigin: true,
					rewrite: (path: string) => path.replace(/^\/socket/, ''),
				},
			},
		};
	}
	function build(option?: any) {
		return {
			outDir: 'admin',
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
				},
			},
			...option,
		};
	}
	function plugins() {
		return [
			vueSetupExtend(), // 命名空间
			viteCompression(), // 压缩包
			JSON.parse(env.VITE_OPEN_CDN) ? buildConfig.cdn() : null,
			// svg图标显示
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]',
				inject: 'body-last' || 'body-first',
				customDomId: '__svg__icons__dom__',
			}),
		];
	}
	return {
		server,
		build,
		plugins,
	};
}
