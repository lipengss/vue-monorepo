<template>
  <el-splitter class="home-splitter">
    <el-splitter-panel style="overflow: hidden">
      <el-splitter layout="vertical">
        <el-splitter-panel collapsible class="pd0">
          <el-card
            ref="cardRef"
            class="wheel-card"
            body-class="wheel-card-body"
            size="small"
            style="opacity: 0.1"
          >
            <template #header>
              <div class="flex-between">
                <span>剩余抽奖次数</span>
                <el-space>
                  <el-tag :type="getRemainingSpins() > 0 ? 'success' : 'danger'">
                    {{ todaySpinCount }}/{{ maxDailySpins }}
                  </el-tag>
                  <el-button size="small" type="warning" @click="settingSpinRef.open('base')">
                    设置
                  </el-button>
                </el-space>
              </div>
            </template>
            <LuckyWheel
              ref="myLuckyRef"
              :key="getSpinSize"
              :width="getSpinSize"
              :height="getSpinSize"
              :prizes="prizesList"
              :blocks="getBlocks"
              :buttons="buttons"
              @start="startCallback"
              @end="endCallback"
            />
            <el-slider
              class="my-slider"
              v-model="spinSty.size"
              size="small"
              show-input
              :min="spinSty.min"
              :max="spinSty.max"
              :step="spinSty.step"
            />
          </el-card>
        </el-splitter-panel>
        <el-splitter-panel collapsible class="pd0">
          <el-card class="record-card">
            <template #header>
              <div class="flex-between">
                <span>📋 最近中奖记录</span>
                <el-space>
                  <el-button size="small" type="danger" @click="clearHistory">清空记录</el-button>
                  <el-button size="small" type="warning" @click="settingSpinRef.open('history')">
                    设置
                  </el-button>
                </el-space>
              </div>
            </template>
            <el-empty v-if="spinHistory.length === 0" description="暂无中奖记录" />
            <el-scrollbar v-else view-style="padding:10px 20px 10px 10px">
              <el-timeline>
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
              </el-timeline>
            </el-scrollbar>
          </el-card>
        </el-splitter-panel>
      </el-splitter>
    </el-splitter-panel>
    <el-splitter-panel collapsible class="pd0">
      <el-card>
        <template #header>
          <div class="flex-between">
            <span>奖品列表</span>
            <el-button size="small" type="warning" @click="settingSpinRef.open('prize')">
              设置
            </el-button>
          </div>
        </template>
        <el-scrollbar view-class="prize-list">
          <div v-for="prize in prizes" :key="prize.id" class="prize-item">
            <div class="prize-info">
              <span class="prize-icon-small">{{ prize.icon }}</span>
              <div class="prize-content">
                <div class="prize-header">
                  <span class="prize-name">{{ prize.name }}</span>
                  <el-tag
                    :type="prize.stock > 10 ? 'success' : prize.stock > 0 ? 'warning' : 'danger'"
                    size="small"
                  >
                    {{ prize.stock }} / {{ prize.totalCount }} 件
                  </el-tag>
                </div>
                <div class="prize-description">{{ prize.description }}</div>
                <div class="prize-progress">
                  <el-progress
                    :percentage="(prize.stock / prize.totalCount) * 100"
                    :show-text="false"
                    :stroke-width="6"
                    :color="prize.stock > 10 ? '#67c23a' : prize.stock > 0 ? '#e6a23c' : '#f56c6c'"
                  />
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-card>
    </el-splitter-panel>
  </el-splitter>
  <SettingSpin ref="settingSpinRef" />
  <SpinResult ref="spinResultRef" />
</template>

<script setup lang="ts">
import SettingSpin from '@/components/SettingSpin/index.vue'
import SpinResult from '@/components/SpinResult/index.vue'
import { usePrizesStore } from '@/stores/prizes'
import { weightedRandom } from '@/utils/tools'
import confetti from 'canvas-confetti'
import { ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const {
  prizes,
  spinSty,
  spinHistory,
  todaySpinCount,
  maxDailySpins,
  getSpinSize,
  getBlocks,
  iconSize,
  fontSize,
} = storeToRefs(usePrizesStore())
const { getRemainingSpins, initLocalSet, setSpinLocaData } = usePrizesStore()

const myLuckyRef = ref()
const settingSpinRef = ref()
const spinResultRef = ref()
const currentPrizeIndex = ref(0)

const prizesList = computed(() => {
  return prizes.value.map((n) => ({
    id: n.id,
    range: n.range,
    fonts: [
      { text: n.name, fontColor: '#fff', fontSize: fontSize.value + 'px', top: '10%' },
      { text: n.icon, fontSize: iconSize.value + 'px', top: '35%' },
    ],
    background: n.color,
    description: n.description,
  }))
})

const buttons = [
  {
    radius: '24%',
    background: '#8a9bf3',
    pointer: true,
    fonts: [{ text: '开始', top: '-10px' }],
  },
]

function getIndex() {
  const weights = prizes.value.filter((n) => n.stock > 0).map((n) => n.range)
  const index = weightedRandom(weights)
  return index
}

function startCallback() {
  // 调用抽奖组件的play方法开始游戏
  myLuckyRef.value.play()
  // 模拟调用接口异步抽奖
  setTimeout(() => {
    currentPrizeIndex.value = getIndex()
    // 调用stop停止旋转并传递中奖索引
    myLuckyRef.value.stop(currentPrizeIndex.value)
  }, 1000)
}

// 抽奖结束会触发end回调
function endCallback(prize) {
  const result = {
    id: prize.id,
    prizeId: prize.index,
    name: prize.fonts[0].text,
    icon: prize.fonts[1].text,
    description: prize.description,
    timestamp: new Date().getTime(),
  }
  spinHistory.value.push(result)
  // 减少库存
  console.log('index', currentPrizeIndex.value)
  console.log('prizes.value[index]', prizes.value[currentPrizeIndex.value])
  prizes.value[currentPrizeIndex.value].stock--
  // 设置本地存储
  setSpinLocaData()
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  })
  spinResultRef.value.open(result)
}

function clearHistory() {
  ElMessageBox.confirm('确定清空最近中奖记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    spinHistory.value = []
    setSpinLocaData()
  })
}

onMounted(() => {
  initLocalSet()
})
</script>

<style scoped lang="scss">
.home-splitter {
  width: 100vw;
  height: 100vh;
  display: flex;
  :deep .el-splitter-panel {
    .el-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      border: none;
      .el-card__body {
        flex: 1;
        overflow: hidden;
        padding: 0;
        position: relative;
      }
    }
  }
  :deep .record-card {
    flex: none;
    height: 340px;

    .timeline-content {
      display: flex;
      align-items: center;
    }
  }

  :deep .wheel-card-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.my-slider {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 300px;
  :deep .el-input-number {
    width: 110px;
  }
}

:deep .prize-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;

  .prize-item {
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 16px;

    .prize-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .prize-icon-small {
        font-size: 30px;
        flex-shrink: 0;
      }

      .prize-content {
        flex: 1;

        .prize-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;

          .prize-name {
            font-weight: bold;
          }
        }

        .prize-description {
          color: #666;
          font-size: 14px;
          margin-bottom: 8px;

          .prize-progress {
            margin-top: 8px;
          }
        }
      }
    }
  }

  .prize-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}
</style>
