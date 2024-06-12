import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = string
declare module "../../../../node_modules/.pnpm/nuxt@3.11.2_@opentelemetry+api@1.9.0_@parcel+watcher@2.4.1_@types+node@20.14.2_@unocss+reset@_4wj7dn27dikq6c3eea2zwzw5me/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}