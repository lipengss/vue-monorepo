<template>
	<div class="warapper">
		<el-descriptions :column="6" border class="desc" size="small" direction="vertical" title="故障位置计算">
			<el-descriptions-item label="单端/双端" :width="160" align="center">
				<el-radio-group v-model="stateData.calc.calc">
					<el-radio-button label="single">单端</el-radio-button>
					<el-radio-button label="dobule">双端</el-radio-button>
				</el-radio-group>
			</el-descriptions-item>
			<el-descriptions-item label="算法" :width="200" align="center">
				<el-radio-group v-model="stateData.calc.mode">
					<el-radio-button label="mode1">模式一</el-radio-button>
					<el-radio-button label="mode2">模式二</el-radio-button>
				</el-radio-group>
			</el-descriptions-item>
			<el-descriptions-item label="波速(m/us)" :width="160" align="center">
				<el-input-number v-model="stateData.calc.speed" />
			</el-descriptions-item>
			<el-descriptions-item label="故障点(min)" align="center"> {{ faultData[0]?.value }} </el-descriptions-item>
			<el-descriptions-item label="故障点(max)" align="center"> {{ faultData[1]?.value }} </el-descriptions-item>
			<el-descriptions-item label="操作" align="center">
				<el-space>
					<el-button type="default" @click="onHandleClearFaultInfo">清除</el-button>
					<el-button type="danger" @click="onHandleFaultCalc" :disabled="stateData.calc.fualtPoints.length !== 2">故障位置计算</el-button>
				</el-space>
			</el-descriptions-item>
		</el-descriptions>
		<Chart class="wavas" :options="chartOptions" @onAddEvents="onChartEvent" />
		<tower ref="towerRef" :tower-data="allTower.data" :fault-position="stateData.calc.fualtPosition" :fault-wave="stateData.faultWave" />
	</div>
</template>
<script setup lang="ts">
import { reactive, computed, toRef, ref } from 'vue'
import Chart from '@/components/Chart/Chart.vue'
import wavesData from './chartsData/wave.json'
import tower from './chartsData/tower.vue'
import { min, sortBy } from 'lodash'
import { ElDescriptions, ElDescriptionsItem, ElRadioGroup, ElRadioButton, ElInputNumber, ElButton, ElSpace, ElMessage } from 'element-plus'
import { LineStateData } from '@/types/faultLocation'
import { grid, legend } from '@/components/Chart/optionsTemp'
import allTower from './chartsData/towers.json'
import { useCalc } from './chartsData/calc'

let _chart: any = null
const stateData: LineStateData = reactive({
	calc: {
		calc: 'single',
		mode: 'mode1',
		speed: 300,
		fualtPoints: [],
		faultDistance: 0,
		fualtPosition: {
			description: '',
			type: 'error',
		},
	},
	faultWave: {
		date_time: '2023-10-29 18:42:44.217',
		dev_model_id: 'TLT201',
		device_id: 'C0322022000001393',
		fault_type: 2,
		fault_type_name: '非雷击',
		parent_entry_name: 'T01',
		phase: 3,
		phase_name: 'C相',
		ts: 1698576164217471700,
		wave_id: '293B0AEB-23E4-4571-898F-FCE40E87F3F5',
		wave_type: 2,
		wave_type_name: '行波电流',
	},
})

const towerRef = ref()

const { signleCalc } = useCalc(allTower.data, toRef(stateData, 'calc'))

const chartOptions: any = reactive({
	legend: legend({
		right: 50,
	}),
	grid: grid({
		top: 40,
		bottom: 60,
		left: 30,
		right: 50,
	}),
	xAxis: {
		type: 'value',
		min: '',
		axisLine: {
			lineStyle: {
				type: 'solid',
			},
		},
		axisTick: {
			show: true,
		},
		splitLine: {
			lineStyle: {
				type: 'dashed',
			},
		},
	},
	yAxis: {
		type: 'value',
		axisLine: {
			lineStyle: {
				type: 'solid',
			},
		},
		splitLine: {
			lineStyle: {
				type: 'dashed',
			},
		},
	},
	toolbox: {
		top: 5,
		feature: {
			dataZoom: {
				emphasis: {
					iconStyle: {
						borderColor: '#67c23a',
					},
				},
				iconStyle: {
					borderWidth: 2,
				},
			},
		},
	},
	tooltip: {
		trigger: 'axis',
	},
	dataZoom: [
		{
			type: 'slider',
			borderRadius: 0,
			handleStyle: {
				borderWidth: 6,
				borderCap: 'square',
			},
		},
		{
			type: 'inside',
			zoomOnMouseWheel: false,
		},
	],
	series: [],
})

function onChartEvent(chart: any) {
	_chart = chart
	chart.on('select', function (params: any) {
		const { seriesIndex, dataIndexInside } = params

		stateData.calc.fualtPoints.push({
			seriesIndex,
			dataIndex: dataIndexInside,
			...chartOptions.series[seriesIndex].data[dataIndexInside],
		})
		if (stateData.calc.fualtPoints.length > 2) {
			ElMessage.warning('最多只能选择两个点位进行计算！')
			chart.dispatchAction({
				type: 'unselect',
				seriesIndex: seriesIndex,
				dataIndex: dataIndexInside,
			})
			stateData.calc.fualtPoints.pop()
		}
	})
	chart.on('unselect', function (params: any) {
		const { seriesIndex, dataIndexInside } = params
		const index = stateData.calc.fualtPoints.findIndex((item) => item.dataIndex === dataIndexInside && item.seriesIndex === seriesIndex)
		if (index !== -1) {
			stateData.calc.fualtPoints.splice(index, 1)
		}
	})
}

for (const key in wavesData.data) {
	if (key !== 'relatedFaultCurrentWaves') {
		chartOptions.series.push({
			name: wavesData.data[key].name,
			type: wavesData.data[key].type,
			data: wavesData.data[key].value,
			id: key,
			emphasis: {
				scale: true,
			},
			symbol: 'emptyCircle',
			symbolSize: 2,
			selectedMode: 'multiple',
			select: {
				label: {
					show: true,
					fontWeight: 'bold',
				},
				itemStyle: {
					color: '#f56c6c',
					borderColor: '#f56c6c',
					borderWidth: 4,
				},
			},
		})
	}
}
const xMin = min(chartOptions.series.map((item: any) => Number(item.data[0].value[0])))
chartOptions.xAxis.min = xMin

/*
 * 记录了
 * 线的下表和数据点的下标
 * 还有波形值和时间
 */
const faultData = computed(() => {
	const list = stateData.calc.fualtPoints.map((item, index) => {
		const cur = chartOptions.series[item.seriesIndex].data[item.dataIndex]
		const obj = {
			...cur,
			...item,
		}
		return obj
	})
	return sortBy(list, (o) => o.dataIndex)
})

function onHandleFaultCalc() {
	if (stateData.calc.fualtPoints.length !== 2) {
		return ElMessage.warning('至少选中两个点位！！！')
	}
	signleCalc(stateData.faultWave)
	towerRef.value.setFaultDistance(stateData.calc.faultDistance)
}
function onHandleClearFaultInfo() {
	if (_chart === null) return
	_chart.dispatchAction({
		type: 'unselect',
		seriesIndex: stateData.calc.fualtPoints.map((item) => item.seriesIndex),
		dataIndex: stateData.calc.fualtPoints.map((item) => item.dataIndex),
	})
	stateData.calc.fualtPoints = []
	stateData.calc.fualtPosition.description = ''
	towerRef.value.clearFaultDistance(stateData.calc.faultDistance)
}
</script>
<style lang="scss" scoped>
.desc {
	margin-bottom: 10px;
}
.wavas {
	width: 100%;
	height: 400px;
	margin-bottom: 10px;
	background-color: #f5f7fa;
	border: 1px solid #ebeef5;
}
</style>
