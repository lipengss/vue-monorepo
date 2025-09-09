<template>
  <el-card class="record-card">
    <template #header>
      <div class="flex-between">
        <span>📋 最近中奖记录</span>
        <el-button size="small" type="danger" @click="clearHistory">清空记录</el-button>
      </div>
    </template>
    <el-empty v-if="spinHistory.length === 0" description="暂无中奖记录" />
    <el-scrollbar v-else view-style="padding:10px 20px 10px 10px">
      <el-timeline>
        <VerticalScroll :list="spinHistory" hover :visibleCount="3">
          <el-timeline-item
            v-for="record in spinHistory.slice(0, 8)"
            :key="record.id"
            :type="record.prizeId === 7 ? 'primary' : 'success'"
            placement="top"
            :timestamp="new Date(record.timestamp).toLocaleTimeString()"
          >
            <el-card body-style="padding: 10px;" :header="record.icon + ' ' + record.name">
              <h4>{{ record.description }}</h4>
            </el-card>
          </el-timeline-item>
        </VerticalScroll>
      </el-timeline>
    </el-scrollbar>
  </el-card>
</template>

<script setup lang="ts">
import { usePrizesStore } from '@/stores/prizes'
import { ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import { VerticalScroll } from 'vue3-seamless-scroll'

const { spinHistory } = storeToRefs(usePrizesStore())
const { setLocalData } = usePrizesStore()

const clearHistory = () => {
  ElMessageBox.confirm('确定清空最近中奖记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    spinHistory.value = []
    setLocalData()
  })
}
</script>
