<template>
	<div>
		<highcharts :options="options"></highcharts>
		<el-date-picker v-model="selectedDate" type="date" :inline="true" placeholder="选择日期" />
	</div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { dayjs } from 'element-plus'
import wavedata from './wavedata.json'
import bigInt from 'big-integer'

const datestr = '2024-12-19 15:24:40.971057070'

const [date, ns] = datestr.split('.')

const second = dayjs(date).unix()

const msNs = bigInt(second).multiply(1e9).add(ns)

console.log(dayjs.unix(Number(bigInt(msNs).divide(1e9).toString())).format('YYYY-MM-DD HH:mm:ss'))

console.log(bigInt(msNs).mod(1e9))

const selectedDate = ref()

const options = computed(() => {
	const data = wavedata.data.reduce((acc, cur) => {
		acc = acc.concat(cur.value)
		return acc
	}, [])
	const min = Math.min(...data.map((n) => n.value[0]))
	return {
		title: {
			text: '波形列表',
		},
		tooltip: {
			crosshairs: true,
			shared: true,
		},
		xAxis: {
			min: min,
			labels: {
				format: '{value}',
			},
		},
		accessibility: {
			enabled: false,
		},
		yAxis: {
			title: {
				text: '电流',
			},
		},
		zoomType: 'x',
		series: wavedata.data.map((n) => {
			const data = n.value.map((m) => {
				return {
					x: Number(m.value[0]),
					y: m.value[1],
				}
			})
			return {
				data,
			}
		}),
	}
})
</script>
