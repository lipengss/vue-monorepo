<template>
	<v-md-preview class="md-preview" :text="text" height="400px" :default-show-toc="true"></v-md-preview>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
// 主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
// tip插件
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index'
import '@kangc/v-md-editor/lib/plugins/tip/tip.css'
// copy
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'

VMdPreview.use(vuepressTheme, {
	Prism,
})
VMdPreview.use(createTipPlugin())
VMdPreview.use(createCopyCodePlugin())
interface Props {
	text: string
}
withDefaults(defineProps<Props>(), {
	text: '',
})
</script>

<style lang="scss" scoped>
// .md-preview{
//   .vuepress-markdown-body{
//     padding: 0;
//   }
// }
</style>
