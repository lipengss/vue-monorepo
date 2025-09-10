<template>
  <BarChart :option="chartOptions" style="width: 100%; height: 300px" />
  <el-table :data="spinHistory" border>
    <el-table-column label="奖品等级" prop="name" align="center" />
    <el-table-column label="奖品名称" prop="description" align="center">
      <template #default="{ row }">
        {{ row.icon }}
        {{ row.description }}
      </template>
    </el-table-column>
    <el-table-column label="中奖时间" prop="timestamp" align="center">
      <template #default="{ row }">
        {{ dayjs(row.timestamp).format('YYYY年MM月DD日 HH:mm:ss') }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import BarChart from '@/components/BarChart/index.vue'
import { usePrizesStore } from '@/stores/prizes'
import { dayjs } from 'element-plus'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { spinHistory } = storeToRefs(usePrizesStore())

const chartOptions = computed(() => {
  const obj = spinHistory.value.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1
    return acc
  }, {})
  return {
    title: {
      text: '最近中奖记录',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: 50,
      left: 40,
      right: 0,
      bottom: 40,
    },
    xAxis: {
      type: 'category',
      data: Object.keys(obj),
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
    },
    series: [
      {
        data: Object.values(obj),
        barWidth: 30,
        type: 'bar',
      },
    ],
  }
})
</script>
<style lang="scss"></style>
