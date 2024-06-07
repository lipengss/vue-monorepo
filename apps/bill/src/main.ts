import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router/index';

import { Toast, Dialog } from 'vant'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'

const app =createApp(App);

app.use(router);
app.use(Toast)
app.use(Dialog)

import plugins from '@common/component/src/utils/plugin'
plugins.elSvg(app)
plugins.pinia(app)

app.mount('#app')
