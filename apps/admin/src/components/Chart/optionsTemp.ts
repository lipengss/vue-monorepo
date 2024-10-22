import { DataZoomComponentOption, GridComponentOption, LegendComponentOption, MarkPointComponentOption, TooltipComponentOption } from 'echarts'
import { merge } from 'lodash'
import { useSettingStore } from '@/store/setting'

// 网格
function grid(data = {}) {
	const grid: GridComponentOption = {
		left: 16,
		top: 40,
		bottom: 16,
		right: 16,
		containLabel: true,
	}
	merge(grid, data)
	return grid
}
// 图例组件
function legend(data = {}) {
	const legend: LegendComponentOption = {
		show: true,
		type: 'scroll',
		right: 16,
		top: 10,
	}
	merge(legend, data)
	return legend
}
// 弹窗
function tooltip(data = {}) {
	const tooltip: TooltipComponentOption = {
		show: true,
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
		},
		hideDelay: 0,
		borderWidth: 0,
	}
	merge(tooltip, data)
	return tooltip
}
// 区域缩放
function dataZoom(
	data = [
		{
			type: 'inside',
		},
	]
): DataZoomComponentOption[] {
	return data
}
// 图表标注
function markPoint(data = {}) {
	const markPoint: MarkPointComponentOption = {
		symbol: 'rect',
		symbolSize: [40, 22],
		symbolOffset: [0, -20],
		data: [
			{
				name: '',
				type: 'max',
			},
		],
		silent: true,
		label: {
			show: true,
			padding: [4, 10],
			fontSize: 14,
			backgroundColor: 'inherit',
		},
	}
	merge(markPoint, data)
	return markPoint
}
// 工具栏
function toolbox(data = {}) {
	const settingStore = useSettingStore()
	const toolbox = {
		right: 10,
		feature: {
			dataZoom: {
				yAxisIndex: 'none',
				title: {
					zoom: '缩放',
					back: '还原',
				},
			},
		},
	}
	merge(toolbox, data)
	return toolbox
}

export { grid, legend, tooltip, dataZoom, markPoint, toolbox }
