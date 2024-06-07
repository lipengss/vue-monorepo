import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
	state: () => ({
		token: '',
		routes: [
			{
				path: '/home',
				name: 'Home',
				meta: {
					title: '首页',
					icon: 'home',
				},
				component: () => import('@/views/home/index.vue'),
			},
			{
				path: '/plugins',
				name: 'Plugins',
				meta: {
					title: 'Vue3插件',
					icon: 'plugins',
				},
				redirect: '/plugins/splitpanes',
				component: () => import('@/layout/routerView.vue'),
				children: [
					{
						path: '/plugins/splitpanes',
						name: 'splitpanes',
						meta: {
							title: '窗口大小调整',
							github: 'https://github.com/antoniandre/splitpanes',
							npm: 'https://www.npmjs.com/package/splitpanes',
							star: '1.1k',
						},
						component: () => import('@/views/plugins/splitpanes.vue'),
					},
					{
						path: '/plugins/clipboard',
						name: 'vue-clipboard3',
						meta: {
							title: '剪切板',
							github: 'https://github.com/zenorocha/clipboard.js',
							npm: 'https://www.npmjs.com/package/vue-clipboard3',
							star: '32.6k',
						},
						component: () => import('@/views/plugins/clipboard.vue'),
					},
					{
						path: '/plugins/vuedraggable',
						name: 'vuedraggable',
						meta: {
							title: '拖动',
							github: 'https://github.com/SortableJS/vue.draggable.next',
							npm: 'https://www.npmjs.com/package/vuedraggable',
							warning: '支持Vue2/3版本，github链接默认跳转的是Vue3版本。npm是Vue2版本的。引用有区别！',
							star: '1.8k',
						},
						component: () => import('@/views/plugins/vuedraggable.vue'),
					},
					{
						path: '/plugins/animejs',
						name: 'Animejs',
						meta: {
							title: '动画库(animejs)',
							github: 'https://github.com/juliangarnier/anime',
							npm: 'https://www.npmjs.com/package/animejs',
							star: '43.2K',
						},
						component: () => import('@/views/plugins/animejs.vue'),
					},
					{
						path: '/plugins/VMdEditor',
						name: 'v-md-editor',
						meta: {
							title: '编辑器',
							github: 'https://github.com/code-farmer-i/vue-markdown-editor',
							npm: 'https://www.npmjs.com/package/@kangc/v-md-editor',
							star: '590K',
						},
						component: () => import('@/views/plugins/VMdEditor.vue'),
					},
					{
						path: '/plugins/three',
						name: 'threejs',
						meta: {
							title: 'three',
							github: 'https://github.com/mrdoob/three.js',
							npm: 'https://www.npmjs.com/package/three',
							star: '85.9K',
						},
						component: () => import('@/views/plugins/three.vue'),
					},
					{
						path: '/plugins/echarts',
						name: 'echartsjs',
						meta: {
							title: 'echarts',
							github: 'https://github.com/apache/echarts',
							npm: 'https://www.npmjs.com/package/echarts',
							star: '53K',
						},
						component: () => import('@/views/plugins/echarts.vue'),
					},
					{
						path: '/plugins/animate',
						name: 'animate.css',
						meta: {
							title: 'animate.css',
							github: 'https://github.com/animate-css/animate.css',
							npm: 'https://www.npmjs.com/package/animate.css/v/4.1.0',
							star: '76.3K',
						},
						component: () => import('@/views/plugins/animate.vue'),
					},
				],
			},
			{
				path: '/dynamicForms',
				name: 'dynamicForms',
				meta: {
					title: '动态表单创建',
				},
				component: () => import('@/views/dynamicForms/index.vue'),
			},
			{
				path: '/bigFileUpload',
				name: 'bigFileUpload',
				meta: {
					title: '大文件上传',
				},
				component: () => import('@/views/bigFileUpload/index.vue'),
			},
			{
				path: '/chatRoom',
				name: 'chatRoom',
				meta: {
					title: '聊天室',
				},
				component: () => import('@/views/chatRoom/index.vue'),
			},
			// {
			// 	path: '*',
			// 	name: '404',
			// 	component: () => import('@/views/error/404.vue'),
			// },
		],
	}),
})
