import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isMobile: /mobile/i.test(navigator.userAgent),
  }),
})
