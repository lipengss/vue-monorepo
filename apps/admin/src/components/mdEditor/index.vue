<template>
	<div class="v-md-editor">
		<v-md-editor
			v-model="content"
			left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | tip"
			height="60vh"
			@change="change"
		></v-md-editor>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

// 编辑器
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'

// 主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

/* 主题
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
js高亮
import hljs from 'highlight.js' */

// tip插件
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index'
import '@kangc/v-md-editor/lib/plugins/tip/tip.css'
// copy
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'

const content = ref()

VMdEditor.use(vuepressTheme, {
	Prism,
})
VMdEditor.use(createTipPlugin())
VMdEditor.use(createCopyCodePlugin())

const emits = defineEmits(['update:content'])
const change = (code: string) => {
	emits('update:content', code)
}
</script>
