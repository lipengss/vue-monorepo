<template>
	<el-space class="mb10">
		<el-button type="primary" @click="">暗黑模式</el-button>
		<el-button type="primary" @click="">序列化</el-button>
		<el-checkbox border v-model="options.mainMenuBar">主菜单栏</el-checkbox>
	</el-space>
	<JsonEditorVue v-model="formatCode" v-bind="options" />
</template>

<script setup lang="ts">
import { withDefaults, defineProps, reactive } from 'vue';
import JsonEditorVue from 'json-editor-vue';

interface Props {
	code: JSON;
}

const props = withDefaults(defineProps<Props>(), {});

const formatCode = computed(() => props.code);

const options: EditorOptions = reactive({
	mode: 'text',
	mainMenuBar: false, // 不显示主菜单栏
});
</script>

<style lang="scss" scoped></style>
