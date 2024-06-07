<template>
  <div class="echarts" ref="echartsRef" :style="{height: height }" />
</template>
<script >
import * as echarts from 'echarts'
export default {
  props: {
    height: {
      type: String,
      default: '200px'
    },
    series: {
      type: Array,
      default: () => [],
    },
    axis: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      myChart: null,
      option: {
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        grid: {
          top: 10,
          left: 10,
          right: 10,
          bottom: 10,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          // axisTick: {
          //   alignWithLabel: true
          // }
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
          }
        },
        series: []
      }
    }
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.echartsRef
      this.myChart = echarts.init(chartDom)
      this.myChart.setOption(this.option)
    },
    // 16进制色值转rgb
    hexToRgb(str) {
      let hex = '';
      let reg = /^\#?[0-9A-Fa-f]{6}$/;
      if (!reg.test(str)) {
        console.warn('输入错误的hex');
        return '';
      }
      str = str.replace('#', '');
      hex = str.match(/../g);
      for (let i = 0; i < 3; i++) hex[i] = parseInt(hex[i], 16);
      return hex;
    },
    // 样式设置
    areaStyle(color) {
      if (!color) return {}
      const rgbStr = this.hexToRgb(color).join(',')
      return {
        lineStyle: {
          color,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: `rgba(${rgbStr},0.8)`
            },
            {
              offset: 1,
              color: `rgba(${rgbStr},0.1)`
            }
          ])
        }
      }
    },
  },
  mounted() {
    this.initChart()
  },
  watch: {
    series: {
      handler(data) {
        this.option.series = data.map(n => {
           return {
             name: n.name,
             type: 'line',
             data: n.data,
             symbol: 'none',
             smooth: true,
             ...this.areaStyle(n.color)
           }
        })
        this.myChart.setOption(this.option)
      },
      deep: true
    },
    axis: {
      handler(axis) {
        this.option.xAxis = axis
        this.myChart.setOption(this.option)
      },
      deep: true
    }
  }
}
</script>
<style scoped lang="scss">
.echarts{
  width: 100%;
  min-height: 200px;
}
</style>