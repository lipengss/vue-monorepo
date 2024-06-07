import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import './style/index.scss'
import 'element-plus/dist/index.css'

import plugins from './utils/plugins'
app.use(plugins)

app.mount('#app')
