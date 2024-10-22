<template>
	<div ref="chartRef" class="echarts">echarts</div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, watch, defineProps, withDefaults, defineEmits, defineExpose } from 'vue'
import * as echarts from 'echarts'
import { random, merge } from 'lodash'
import dayjs from 'dayjs'

const props = withDefaults(
	defineProps<{
		checkedArr: Map<string, any>
		seriesData: any[]
	}>(),
	{}
)

const emits = defineEmits(['checkedArr'])

const chartRef = ref()

let myChart: any = null

function checkedSymbol(opt?: any = {}) {
	const def = {
		label: {
			show: true,
		},
		symbol:
			'path://M820.113403 204.239638c-169.888272-169.918971-446.339558-169.918971-616.22783 0-169.921018 169.890318-169.921018 446.339558 0 616.22783 169.888272 169.921018 446.339558 169.921018 616.22783 0C990.035444 650.579195 990.035444 374.130979 820.113403 204.239638zM769.710456 398.811078 477.206566 710.212364c-1.832741 1.704828-3.759627 2.842745-5.183046 3.664459-1.579985 1.043772-2.685155 1.928932-4.297886 2.592035-3.697205 1.579985-7.614421 2.368954-11.722996 2.368954-3.76065 0-7.458879-0.694825-11.06194-2.085498l-3.476171-2.02103c-1.865487-0.980327-3.886517-2.023076-5.815449-3.729951l0-0.063445c-0.125867-0.094144-0.252757-0.220011-0.3776-0.346901l-0.980327-0.946558L268.257673 546.042327c-5.752004-5.626137-9.005095-13.20986-9.069563-21.268396-0.030699-8.119935 3.034103-15.737426 8.721639-21.519106 11.376095-11.502985 31.318286-11.598152 42.819225-0.252757l144.45195 142.30096 270.475178-287.952224c10.965749-11.661597 31.126928-12.294001 42.757826-1.359974 5.909593 5.593392 9.322319 13.115716 9.543354 21.23565C778.178315 385.285017 775.271102 392.96493 769.710456 398.811078z',
		symbolSize: 16,
		itemStyle: {
			color: '#1afa29',
			borderWidth: 2,
			borderColor: '#fff',
		},
	}
	return merge(def, opt)
}

const options: any = reactive({
	grid: {
		left: 16,
		top: 40,
		bottom: 80,
		right: 16,
		containLabel: true,
	},
	legend: {
		show: true,
		type: 'plain',
		zlevel: 10,
	},
	tooltip: {
		show: true,
		trigger: 'axis',
	},
	xAxis: {
		// type: 'value',
		splitLine: {
			show: false,
		},
		axisTick: {
			show: true,
			alignWithLabel: true,
			lineStyle: {
				color: '#1B4E67',
				width: 2,
			},
		},

		min: 23.209294674,
		// minInterval: 1,
		// maxInterval: ,
		axisLabel: {
			interval: 'auto',
			// formatter: (axisValue) => {
			// 	return dayjs(axisValue).format('YYYY-MM-DD hh:mm:ss')
			// },
		},
		triggerEvent: true,
	},
	yAxis: {
		type: 'value',
		triggerEvent: true,
		splitLine: {
			show: true,
		},
	},
	series: [],
	dataZoom: [
		{
			type: 'inside',
		},
		{
			type: 'slider',
			realtime: false, // 拖动结束时更新
			height: 60,
			bottom: 6,
			brushSelect: false,
			handleSize: '60%',
		},
	],
})

function initChart() {
	myChart = echarts.init(chartRef.value, { renderer: 'svg' })
	myChart.setOption(options, true)
	// 添加事件
	setEvent()
}
function setEvent() {
	myChart.off('click')
	myChart.on('click', (params: any) => {
		setXPostion(false)
		const { startValue, endValue } = myChart.getOption().dataZoom[0]
		// 当前的数据， 数据的索引值， 线的索引值， 选中的值
		const { data, dataIndex, seriesIndex, value, color, name } = params
		if (data.checked) {
			// 取消选中
			options.series[seriesIndex].data.splice(dataIndex, 1, data)
			props.checkedArr.delete(`${seriesIndex}_${dataIndex}`)
		} else {
			// 设置选中
			options.series[seriesIndex].data.splice(dataIndex, 1, {
				value,
				...checkedSymbol({ itemStyle: { color } }),
			})
			props.checkedArr.set(`${seriesIndex}_${dataIndex}`, {
				name,
				color,
				value,
				dataIndex,
				dataZoom: {
					startValue,
					endValue,
				},
			})
		}

		myChart.setOption(options)
	})
}
// 取消标记
function onCloseTag(id: string, value: number) {
	props.checkedArr.delete(id)
	const index = id.split('_')
	options.series[parseInt(index[0])].data.splice(parseInt(index[1]), 1, value)
	myChart.setOption(options)
}
// 点击标记
const onTagClick = (tag: any) => {
	setXPostion(true, tag.dataZoom)
	myChart.setOption(options)
}
// 动态设置zoomData的位置
function setXPostion(bool: boolean = true, dataZoom?: { startValue: number; endValue: number }) {
	options.dataZoom.forEach((item: any) => {
		if (bool) {
			item.startValue = dataZoom?.startValue
			item.endValue = dataZoom?.endValue
		} else {
			delete item.startValue
			delete item.endValue
		}
	})
}

watch(
	() => props.seriesData,
	(series) => {
		options.series = series
		console.log(series)
		// console.log('被触发了吧', series)
		// if (series.length) {
		// 	const xAxis = series
		// 		.map((item: any) => item.data)
		// 		.reduce((pre, cur) => {
		// 			return pre.concat(cur)
		// 		})
		// 		.map((item) => item.value[0])
		// 		.sort()
		// 	options.xAxis.data = [...new Set(xAxis)]
		// 	console.log(xAxis)
		// }

		myChart && myChart.setOption(options)
	},
	{
		deep: true,
		immediate: true,
	}
)

defineExpose({ onCloseTag, onTagClick })
onMounted(() => {
	initChart()
})
</script>
<style lang="scss" scoped>
.echarts {
	width: 100%;
	min-height: 400px;
	max-height: 100%;
}
</style>
