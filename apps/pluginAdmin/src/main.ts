import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import './style/index.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

import plugins from './utils/plugins'
app.use(plugins)
app.use(ElementPlus)
app.use(Avue)
app.mount('#app')
