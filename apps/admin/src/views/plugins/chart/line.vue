<template>
	<div ref="chartDom" class="chart" />
</template>
<script setup lang="ts">
import { ref, defineProps, withDefaults, inject, watch, nextTick, onMounted } from 'vue'
import { merge } from 'lodash'
import { defOption } from './option'
import theme from './theme.json'
interface Props {
	option?: any
}
const props = withDefaults(defineProps<Props>(), {
	option: {},
})

const chartDom = ref()

let instance: any = null

const option = {
	tooltip: defOption.tooltip({
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
		},
		triggerOn: 'none',
	}),
	grid: defOption.grid({
		bottom: 60,
	}),
	legend: {
		show: true,
	},
	xAxis: {
		scale: true,
		boundaryGap: false,
		axisPointer: {
			show: true,
			handle: {
				show: true,
			},
			label: {
				show: true,
			},
		},
	},
	yAxis: {
		type: 'value',
	},
	dataZoom: [
		{ type: 'inside' },
		// {
		// 	type: 'slider',
		// },
	],
	axisPointer: {
		show: true,
		triggerTooltip: false,
	},
	series: [],
}

const echarts: any = inject('echarts')

function initChart() {
	nextTick(() => {
		instance = echarts.init(chartDom.value, theme, { renderer: 'svg' })
		const opt = merge(option, props.option)
		instance.setOption(opt)
		setEvent()
	})
}

function setEvent() {
	if (!instance) return
	instance.off('click')
	instance.on('click', (params: any) => {
		console.log('click事件触发啦')
		const { data, seriesIndex, dataIndex, value, color, seriesId } = params
		const curSeries: any = option.series[seriesIndex]
		const curVal = curSeries.data[dataIndex]
		curSeries.data.splice(dataIndex, 1, {
			name: curVal.text,
			value: curVal.value,
			symbol: 'circle',
			symbolSize: 16,
			label: {
				show: true,
			},
		})
		instance.setOption(option)
	})
}

onMounted(() => {
	initChart()
})

watch(
	() => props.option,
	() => {
		initChart()
	},
	{
		deep: true,
	}
)
</script>
<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 100%;
}
</style>
