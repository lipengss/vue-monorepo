import { merge } from 'lodash'

export const defOption = {
	grid(data = {}) {
		const grid = {
			left: 16,
			top: 40,
			bottom: 16,
			right: 16,
			containLabel: true,
		}
		merge(grid, data)
		return grid
	},
	/* 图例组件 */
	legend(data = {}) {
		const legend = {
			right: 16,
			top: 10,
		}
		merge(legend, data)
		return legend
	},
	/* 弹窗 */
	tooltip(data = {}) {
		const tooltip = {
			show: true,
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
			hideDelay: 0,
			backgroundColor: 'rgba(22,80,158,0.8)',
			borderWidth: 2,
			borderColor: 'rgba(7,166,255,0.7)',
			textStyle: {
				color: '#fff',
			},
		}
		merge(tooltip, data)
		return tooltip
	},
	xAxis(data = {}) {
		const xAxis = {
			name: '',
		}
		return merge(xAxis, data)
	},
}
