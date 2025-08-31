<template>
  <el-dialog v-model:visible="visible">
    <el-card v-if="result" class="result-card" shadow="never">
            <template #header>
              <div class="result-header">
                🎉 抽奖结果
              </div>
            </template>

            <el-result
              :icon="result.prize && result.prize.id !== 7 ? 'success' : 'info'"
              :title="result.message"
            >
              <template #icon v-if="result.prize && result.prize.id !== 7">
                <div class="prize-icon">{{ result.prize.icon }}</div>
              </template>

              <template #extra v-if="result.prize && result.prize.id !== 7">
                <div class="prize-details">
                  <el-descriptions :column="1" border>
                    <el-descriptions-item label="奖品名称">
                      <el-text tag="b">{{ result.prize.name }}</el-text>
                    </el-descriptions-item>
                    <el-descriptions-item label="奖品描述">
                      {{ result.prize.description }}
                    </el-descriptions-item>
                    <el-descriptions-item label="价值">
                      <el-text type="danger" tag="b">¥{{ result.prize.value }}</el-text>
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
              </template>
            </el-result>
          </el-card>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<style scoped>
.result-card {
  width: 400px;
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
