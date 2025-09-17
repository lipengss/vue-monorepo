import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: './',
  build: {
    assetsDir: 'static',
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/dfdcb909418cae662050b8993ef89675/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/upload': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upload/, ''),
      },
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/assets/base.scss" as *;`,
  //     },
  //   },
  // },
})
