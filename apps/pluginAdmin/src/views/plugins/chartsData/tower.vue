<template>
	<div class="tower">
		<el-descriptions :column="2" border class="line-info" size="small" title="线路信息">
			<el-descriptions-item label="故障线路">{{ stateData.lineName }}</el-descriptions-item>
			<el-descriptions-item label="线路长度(m)">{{ stateData.lineLength }}</el-descriptions-item>
			<el-descriptions-item label="起止变电站">{{ stateData.substation }}</el-descriptions-item>
			<el-descriptions-item label="故障时间">{{ faultWave.date_time }}</el-descriptions-item>
			<el-descriptions-item label="故障位置">
				<el-space v-if="props.faultPosition?.description">
					<el-alert show-icon :closable="false" :title="props.faultPosition.description" :type="props.faultPosition.type" />
					<el-button type="warning" size="large" @click="stateData.dialogVisible = true">保存故障位置</el-button>
				</el-space>
			</el-descriptions-item>
		</el-descriptions>
		<Chart class="tower-chart" :options="chartOptions" />
		<el-dialog v-model="stateData.dialogVisible" title="故障定位结果" width="30%" :before-close="handleClose">
			<el-descriptions :column="1" border>
				<el-descriptions-item label="是否发送南瑞"><el-switch /></el-descriptions-item>
				<el-descriptions-item label="是否雷击"><el-switch /></el-descriptions-item>
				<el-descriptions-item label="雷击性质"><el-select></el-select></el-descriptions-item>
				<el-descriptions-item label="是否跳闸"><el-switch></el-switch></el-descriptions-item>
				<el-descriptions-item label="重合闸"><el-select></el-select></el-descriptions-item>
			</el-descriptions>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="stateData.dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="stateData.dialogVisible = false">保存定位信息</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup lang="ts">
import { reactive, defineProps, withDefaults, defineExpose } from 'vue'
import Chart from '@/components/Chart/Chart.vue'
import { ElDescriptions, ElDescriptionsItem, ElAlert, ElSpace, ElButton, ElDialog, ElSwitch, ElSelect, ElOption } from 'element-plus'
import { grid, tooltip, dataZoom } from '@/components/Chart/optionsTemp'
import { TowerData, TowerStateData, FaultWave } from '@/types/faultLocation'
import { towerIcon } from './icon'

interface Props {
	towerData: Array<TowerData>
	faultWave: FaultWave
	faultPosition: {
		description: string
		type: 'success' | 'error'
	}
}
const props = withDefaults(defineProps<Props>(), {})

const stateData: TowerStateData = reactive({
	substation: '',
	lineLength: 0,
	lineName: '多上一线',
	towerDevs: [],
	dialogVisible: false,
})

initData()

function setSeries() {
	let lineType, icon, symbolColor, symbolSize, labelShow
	const series: any = {
		type: 'graph',
		name: '多上一线',
		coordinateSystem: 'cartesian2d',
		yAxisIndex: 0,
		data: [],
		links: [],
	}
	props.towerData.forEach((item, index, arr) => {
		if (index === 0 || index === arr.length - 1) {
			lineType = 'dashed'
			icon = 'circle'
			stateData.substation += item.entry_name + '，'
			symbolColor = index === 0 ? '#67c23a' : '#f56c6c'
			symbolSize = [10, 10]
			labelShow = false
		} else {
			lineType = 'solid'
			icon = towerIcon
			symbolColor = '#1aaef4'
			symbolSize = [16, 20]
			labelShow = true
		}
		// 连接线
		series.links.push({
			source: item.entry_name,
			target: arr[index + 1] ? arr[index + 1].entry_name : item.entry_name,
			value: arr[index + 1] ? arr[index + 1].tower_step : item.tower_step,
			lineStyle: {
				type: lineType,
				width: 2,
				color: '#1aaef4',
			},
		})
		// 连接点
		series.data.push({
			name: item.entry_name,
			value: [item.toolNum, arr[index + 1] ? arr[index + 1].toolNum : arr[index].toolNum],
			symbol: icon,
			symbolSize: symbolSize,
			symbolOffset: [0, 0],
			label: {
				show: labelShow,
				position: 'top',
				fontSize: 10,
				color: '#999999',
			},
			itemStyle: {
				color: symbolColor,
			},
		})
	})
	return series
}

const chartOptions: any = reactive({
	grid: grid({
		top: 10,
		bottom: 10,
		left: 30,
		right: 50,
	}),
	tooltip: tooltip({
		trigger: 'item',
	}),
	dataZoom: dataZoom(),
	xAxis: {
		min: 0,
		max: stateData.lineLength,
		show: true,
		type: 'value',
		splitLine: {
			show: false,
		},
		axisTick: {
			show: true,
		},
		axisLabel: {
			formatter: '{value}米',
		},
	},
	yAxis: {
		show: true,
		type: 'category',
		data: [
			{
				value: '多上一线',
			},
		],
		splitLine: {
			show: false,
		},
		axisLine: {
			show: false,
		},
		axisLabel: {
			show: false,
			fontWeight: 'bold',
			fontSize: 16,
			margin: 16,
		},
	},
	series: setSeries(),
})

function handleClose() {}

function initData() {
	const tooal = props.towerData.reduce((pre, cur, index) => {
		const num = pre + cur.tower_step
		props.towerData[index].toolNum = num
		return num
	}, 0)

	stateData.lineLength = tooal

	const towerDevs = props.towerData.filter((item) => {
		return item.devs
	})
	stateData.towerDevs = towerDevs
}

function setFaultDistance(faultDistance: number) {
	chartOptions.series.data.push({
		name: '故障位置',
		value: [faultDistance, faultDistance],
		symbol: 'pin',
		symbolSize: 18,
		label: {
			show: true,
			color: 'red',
			position: 'top',
		},
		itemStyle: {
			color: 'red',
			borderColor: 'red',
		},
	})
}

function clearFaultDistance(faultDistance: number) {
	const index = chartOptions.series.data.findIndex((item) => item.name === '故障位置')
	if (index !== -1) {
		chartOptions.series.data.splice(index, 1)
	}
}

defineExpose({
	setFaultDistance,
	clearFaultDistance,
})
</script>
<style lang="scss" scoped>
.line-info {
	margin-bottom: 10px;
}
.tower-chart {
	width: 100%;
	height: 100px;
	position: relative;
	border: 1px solid #ebeef5;
	background-color: #f5f7fa;
}
</style>
