import type { App } from 'vue'

import SvgIcon from '@/components/SvgIcon/index.vue'
import 'virtual:svg-icons-register'

import router from '@/router/index'

import { createPinia } from 'pinia'

export default {
  install(app: App) {
    // 路由
    app.use(router)
    // 状态存储
    app.use(createPinia())
    // svg组件
    app.component('svg-icon', SvgIcon)
  },
}
