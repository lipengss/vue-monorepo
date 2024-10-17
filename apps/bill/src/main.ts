import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

import router from '@/router/index';
import { createPinia } from 'pinia';

import { Toast, Dialog } from 'vant';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';

const app = createApp(App);

app.use(router);
app.use(Toast);
app.use(Dialog);
app.use(createPinia());

import plugins from '@common/component/src/utils/plugin';
plugins.elSvg(app);

app.mount('#app');
