import type {
  DataZoomComponentOption,
  GridComponentOption,
  LegendComponentOption,
  MarkPointComponentOption,
  TooltipComponentOption,
} from 'echarts'
import { merge } from 'lodash'

// 网格
function grid(data = {}) {
  const grid: GridComponentOption = {
    left: 10,
    top: 30,
    bottom: 10,
    right: 10,
    containLabel: true,
  }
  merge(grid, data)
  return grid
}
// 图例组件
function legend(data = {}) {
  const legend: LegendComponentOption = {
    left: 'center',
    show: true,
    type: 'scroll',
    right: 60,
    top: 4,
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
      type: 'line',
    },
    hideDelay: 0,
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
  ],
): DataZoomComponentOption[] {
  return data
}
// 图表标注
function markPoint(data = {}, unit: string = '') {
  const markPoint: MarkPointComponentOption = {
    symbol: 'rect',
    symbolSize: [0, 20],
    symbolOffset: [0, -15],
    data: [
      {
        name: '',
        type: 'max',
      },
    ],
    silent: true,
    label: {
      show: true,
      fontSize: 14,
      color: 'inherit',
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowBlur: 2,
      textShadowOffsetX: 1,
      textShadowOffsetY: 1,
      formatter: `{c} ${unit}`,
    },
  }
  merge(markPoint, data)
  return markPoint
}
// 工具栏
function toolbox(data = {}) {
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
    emphasis: {
      iconStyle: {
        textPosition: 'left',
      },
    },
  }
  merge(toolbox, data)
  return toolbox
}
// 颜色渐变
function colorLinear(data = {}) {
  const colorlinear = {
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [],
    },
  }
  merge(colorlinear, data)
  return colorlinear
}

const defaultOption = { grid, legend, tooltip, dataZoom, markPoint, colorLinear, toolbox }

export default defaultOption
