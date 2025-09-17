<template>
  <el-drawer
    v-model="visible"
    title="参数设置"
    direction="rtl"
    :size="isMobile ? '100%' : drawerWidth"
    append-to-body
  >
    <template #default>
      <el-tabs v-model="activeTab" id="setting-tabs">
        <el-tab-pane label="🕹️ 转盘设置" name="base">
          <Base />
        </el-tab-pane>
        <el-tab-pane label="🏅 奖品设置" name="prize">
          <Prize />
        </el-tab-pane>
        <el-tab-pane label="📋 中奖记录" name="history">
          <History />
        </el-tab-pane>
      </el-tabs>
      <div class="resize-handle" @mousedown="onDragStart">
        <div class="line" />
        <div class="line" />
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, ref } from 'vue'
import Base from './base.vue'
import History from './history.vue'
import { useDragMove } from './onDrageStart'
import Prize from './prize.vue'

const { isMobile } = storeToRefs(useThemeStore())

const activeTab = ref('history')
const visible = ref(false)

const drawerWidth = ref(1200)

const { onDragStart, onDragEnd } = useDragMove(drawerWidth)

function open(tabName: string) {
  if (tabName) {
    activeTab.value = tabName
  }
  visible.value = true
}

defineExpose({
  open,
})

onBeforeUnmount(() => {
  onDragEnd()
})
</script>

<style lang="scss" scoped>
.resize-handle {
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 100%;
  cursor: col-resize;
  z-index: 10;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  padding-right: 1px;
  .line {
    width: 1px;
    height: 60px;
    background: #999;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
}

#pane-history {
  display: flex;
  flex-direction: column;
}

.el-tabs {
  height: 100%;
  .el-tab-pane {
    height: 100%;
  }
}
</style>
