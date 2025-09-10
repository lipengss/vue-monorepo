<template>
  <v-chart
    class="chart"
    ref="chartRef"
    :option="mergeOption"
    :theme="props.theme"
    :group="props.group"
    autoresize
    @click="handleClick"
    @dblclick="handledbclick"
    @datazoom="handleDatazoom"
  />
</template>
<script setup lang="ts">
import defaultOption from '@/assets/defaultOption'
import { BarChart } from 'echarts/charts'
import {
  DataZoomComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { debounce } from 'lodash'
import { computed, defineProps, provide, shallowRef, withDefaults } from 'vue'
import VChart, { THEME_KEY } from 'vue-echarts'

interface Props {
  option: any
  theme?: any
  group?: any
}
const props = withDefaults(defineProps<Props>(), {})

const emits = defineEmits(['click', 'dblclick', 'datazoom'])

const chartRef = shallowRef()

const mergeOption = computed(() => {
  return {
    grid: defaultOption.grid(),
    legend: defaultOption.legend(),
    tooltip: defaultOption.tooltip({
      axisPointer: {
        type: 'line',
      },
    }),
    toolbox: defaultOption.toolbox(),
    dataZoom: defaultOption.dataZoom(),
    ...props.option,
  }
})

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  DatasetComponent,
  TitleComponent,
])

function handleClick(params: any) {
  emits('click', params)
}
function handledbclick(params: any) {
  emits('dblclick', params)
}

function resize() {
  chartRef.value.chart && chartRef.value.chart.resize()
}

function handleDatazoom(params: any) {
  emits('datazoom', params)
}

function getInstance() {
  return chartRef.value.chart
}

window.addEventListener(
  'resize',
  debounce(
    () => {
      resize()
    },
    500,
    {
      leading: true,
    },
  ),
)

defineExpose({
  resize,
  getInstance,
})

provide(THEME_KEY, 'light')
</script>
