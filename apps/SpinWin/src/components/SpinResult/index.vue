<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    class="result-el-dialog"
    :width="isMobile ? '95%' : '500px'"
  >
    <el-card v-if="result" class="result-card" shadow="never" body-style="padding: 0;">
      <template #header>
        <div class="result-header">🎉 抽奖结果</div>
      </template>
      <el-result
        :icon="result.id !== getLoseId ? 'success' : 'info'"
        :title="result.name"
        :sub-title="result.id !== getLoseId ? '恭喜您抽中了以下奖品' : '很遗憾，您没有抽中任何奖品'"
      >
        <template #icon v-if="result.id !== getLoseId">
          <div class="prize-icon">{{ result.icon }}</div>
        </template>
        <template #extra v-if="result.id !== getLoseId">
          <el-descriptions :column="1" border>
            <el-descriptions-item label="奖品名称">
              <el-text tag="b">{{ result.name }}</el-text>
            </el-descriptions-item>
            <el-descriptions-item label="奖品描述">
              {{ result.description }}
            </el-descriptions-item>
            <el-descriptions-item label="价值">
              <el-text type="danger" tag="b">¥ {{ result.price }} 元</el-text>
            </el-descriptions-item>
          </el-descriptions>
        </template>
      </el-result>
    </el-card>
  </el-dialog>
</template>

<script setup lang="ts">
import { usePrizesStore } from '@/stores/prizes'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

interface SpinResult {
  name: string
  description: string
  price: number
  icon: string
  id: string
}

const { isMobile } = storeToRefs(useThemeStore())
const visible = ref(false)
const result = ref<SpinResult>({
  name: '谢谢参与',
  description: '很遗憾，您没有抽中任何奖品',
  price: 0,
  icon: '',
  id: '',
})
const { getLoseId } = storeToRefs(usePrizesStore())

function open(res: SpinResult) {
  visible.value = true
  console.log('res', res)
  if (res.id === getLoseId.value) {
    result.value = {
      name: '未中奖',
      description: '很遗憾，您没有抽中任何奖品',
      price: 0,
      icon: '🎉',
      id: getLoseId.value,
    }
  } else {
    result.value = res
  }
}

defineExpose({ open })
</script>

<style scoped lang="scss">
.result-card {
  width: 100%;
}

.result-header {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}

.prize-icon {
  font-size: 48px;
  color: #409eff;
}

.prize-details {
  margin-top: 20px;
}
</style>
<style>
.result-el-dialog {
  padding: 0 !important;
  .el-dialog__header {
    padding: 0;
  }
  .el-result__extra {
    width: 100%;
  }
}
</style>
