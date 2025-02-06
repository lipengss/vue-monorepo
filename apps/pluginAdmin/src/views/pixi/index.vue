<template>
	<div class="pixi-gsap">
		<el-select v-model="selected" style="width: 200px">
			<el-option v-for="[key, obj] in map" :label="obj.title" :value="key" />
		</el-select>
		<component :is="map.get(selected)?.component" />
	</div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

const selected = ref('sprite')

const componentStr = (path: string) => defineAsyncComponent(() => import(`./${path}`))

const map = new Map([
	['break', { title: '刹车动效', component: componentStr('brake/index.vue') }],
	['orbit', { title: '轨迹动效', component: componentStr('motionPathPlugin.tsx') }],
	['sprite', { title: '使用雪碧图', component: componentStr('sprite/index.vue') }],
	['shape', { title: '形状', component: componentStr('shape/index.vue') }],
	['train', { title: '小火车', component: componentStr('train/index.vue') }],
])
</script>
<style lang="scss" scoped>
.pixi-gsap {
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: grid;
	grid-template-rows: 40px 1fr;
}
</style>
