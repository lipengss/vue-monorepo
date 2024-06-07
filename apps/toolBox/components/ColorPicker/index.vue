<template>
	<el-space>
		<div
			class="circle-item"
			v-if="props.colorList"
			v-for="color in props.colorList"
			:key="color"
			:class="{ active: color === props.color }"
			@click="onColorChange(color)"
		>
			<div class="circle" :style="`--color:${color}`"></div>
		</div>
		<el-color-picker v-model="_color" :show-alpha="props.showAlpha" :color-format="props.showAlpha ? 'rgba' : 'hex'" @change="onColorChange" />
	</el-space>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

interface Props {
	colorList?: Array<string>;
	color: string;
	showAlpha?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	showAlpha: false,
});

const _color = ref(props.color);

const emits = defineEmits(['update:color', 'change']);

function onColorChange(color: string | null) {
	_color.value = color || '';
	emits('update:color', color);
	emits('change', color);
}
</script>
<style lang="scss" scoped>
.circle-item {
	padding: 4px;
	border: 1px solid var(--el-border-color);
	border-radius: 3px;
}
.active {
	border-color: var(--el-color-primary);
}
.circle {
	width: 22px;
	height: 22px;
	background-color: var(--color);
	border-radius: 3px;
	cursor: pointer;
}
</style>
