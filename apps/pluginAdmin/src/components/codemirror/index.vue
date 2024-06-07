<template>
	<div class="code-mirror">
		<div class="operator">
			<el-button type="primary" @click="downModel">
				<template #icon>
					<!-- <arrow-down-outlined /> -->
				</template>
				JSON 下载
			</el-button>
		</div>
		<Codemirror ref="cmRefDom" v-model:value="strCode" :style="{ height: '100%' }" :options="defOption" border />
	</div>
</template>
<script setup lang="ts">
import { defineProps, reactive, computed } from 'vue'
import { ElButton } from 'element-plus'
// import { ArrowDownOutlined } from "@ant-design/icons-vue"
import { saveAs } from 'file-saver'

import { EditorConfiguration } from 'codemirror'
import Codemirror from 'codemirror-editor-vue3'
// language
import 'codemirror/mode/javascript/javascript.js'
// 折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'

// 搜索
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
interface Props {
	code: any
}
const props = withDefaults(defineProps<Props>(), {})

const defOption: EditorConfiguration = reactive({
	mode: 'javascript',
	theme: 'default', // 主题
	lineNumbers: true, // 显示行号
	smartIndent: true, // 智能缩进
	indentUnit: 2, // 智能缩进单位为4个空格长度
	tabSize: 2,
	foldGutter: true,
	lineWrapping: true,
	gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'], // 启用行槽中的代码折叠
})

const strCode = computed(() => {
	return JSON.stringify(props.code, undefined, 4)
})

/* 下载模型
------------------------------------------- */
const downModel = () => {
	const json = JSON.stringify(props.code, undefined, 4)
	var blob = new Blob([json], { type: 'json/plain;charset=utf-8' })
	saveAs(blob, `splitpanes${Date.now()}.json`)
}
</script>
<style lang="scss" scoped>
.code-mirror {
	.operator {
		text-align: right;
	}
}
</style>
