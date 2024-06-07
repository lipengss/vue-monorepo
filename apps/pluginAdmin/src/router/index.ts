import { createRouter, createWebHashHistory } from 'vue-router'
import { dynamicRoutes, staticRoutes } from './routes'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [...dynamicRoutes, ...staticRoutes],
})

export default router
