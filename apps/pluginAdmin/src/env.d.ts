/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}

declare module 'vue-grid-layout'
declare module 'qs'
declare module 'splitpanes'
declare module 'file-saver'
declare module 'codemirror'
declare module 'prismjs'
declare module '@kangc/v-md-editor'
declare module '@kangc/v-md-editor/lib/preview'
declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
declare module '@kangc/v-md-editor/lib/plugins/tip/index'
declare module '@kangc/v-md-editor/lib/plugins/copy-code/index'
declare module 'animejs/lib/anime.es.js'
declare module 'three'
declare module 'dat.gui'
