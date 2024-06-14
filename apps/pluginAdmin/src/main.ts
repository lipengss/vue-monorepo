import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import './style/index.scss'
import 'element-plus/dist/index.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

import plugins from './utils/plugins'
app.use(plugins)
app.use(ElementPlus)
app.use(Avue)
app.mount('#app')
