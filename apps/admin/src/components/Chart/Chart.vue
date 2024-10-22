<template>
	<div class="echarts" :id="id" />
</template>
<script setup lang="ts">
import { withDefaults, defineProps, watch, defineEmits, onMounted, onBeforeMount } from 'vue'
import { nanoid } from 'nanoid'
import * as echarts from 'echarts'
import type { EChartsOption, ECharts } from 'echarts'
import chartTheme from './chartTheme.json'

interface Props {
	options: EChartsOption | any
}
const props = withDefaults(defineProps<Props>(), {
	options: Object,
})

const emits = defineEmits(['onAddEvents'])

let chart: ECharts | null = null
const id = `vue-chart-${nanoid()}`
function initEcharts() {
	if (!chart) {
		const dom: HTMLElement | null = document.getElementById(id)
		if (!dom) return
		chart = echarts.init(dom, chartTheme, {
			renderer: 'canvas',
		})
	}
	chart.setOption(props.options)
	chart.off('click')
	emits('onAddEvents', chart)
}

onMounted(() => {
	initEcharts()
})

watch(
	() => props.options,
	(option) => {
		chart && chart.setOption(option, true)
	},
	{
		deep: true,
		immediate: true,
	}
)
onBeforeMount(() => {
	chart && chart.dispose()
	chart = null
})
</script>
<style lang="scss" scoped>
.echarts {
	width: 100%;
	height: 100%;
}
</style>
