import { defineStore } from "pinia"

export const useSettingStore = defineStore("settingStore", {
  state: () => ({
    isCollapsed: false,
  }),
  actions: {
    toggleCollapsed() {
      this.isCollapsed = !this.isCollapsed
    },
  },
})
