<template>
  <el-splitter class="home-splitter">
    <el-splitter-panel>
      <el-splitter layout="vertical">
        <el-splitter-panel class="pd6">
          <el-card ref="cardRef" class="wheel-card" body-class="wheel-card-body" size="small">
            <template #header>
              <div class="flex-between">
                <span>剩余抽奖次数</span>
                <el-space>
                  <el-tag :type="getRemainingSpins() > 0 ? 'success' : 'danger'">
                    {{ todaySpinCount }}/{{ maxDailySpins }}
                  </el-tag>
                  <el-button size="small" @click="toggle">
                    <svg-icon :name="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
                  </el-button>
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
        <el-splitter-panel class="pd6">
          <SpinHistory />
        </el-splitter-panel>
      </el-splitter>
    </el-splitter-panel>
    <el-splitter-panel class="pd6">
      <el-card>
        <template #header>
          <div class="flex-between">
            <span>奖品列表</span>
            <el-button size="small" type="warning" @click="settingSpinRef.open('prize')"
              >设置</el-button
            >
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
</template>

<script setup lang="ts">
import SettingSpin from '@/components/settingSpin/index.vue'
import { usePrizesStore } from '@/stores/prizes'
import { weightedRandom } from '@/utils/tools'
import { useFullscreen } from '@vueuse/core'
import confetti from 'canvas-confetti'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import SpinHistory from '@/components/SpinHistory/index.vue'

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

const wheelRef = useTemplateRef('cardRef')
const { isFullscreen, toggle } = useFullscreen(wheelRef.value)

const myLuckyRef = ref()
const settingSpinRef = ref()

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

function startCallback() {
  // 调用抽奖组件的play方法开始游戏
  myLuckyRef.value.play()
  // 模拟调用接口异步抽奖
  const weights = prizes.value.map((n) => n.range)
  const index = weightedRandom(weights)
  setTimeout(() => {
    // 减少库存
    prizes.value[index].stock--
    setSpinLocaData()
    // 调用stop停止旋转并传递中奖索引
    myLuckyRef.value.stop(index)
  }, 3000)
}

// 抽奖结束会触发end回调
function endCallback(prize) {
  spinHistory.value.push({
    id: prize.id,
    prizeId: prize.index,
    name: prize.fonts[0].text,
    icon: prize.fonts[1].text,
    description: prize.description,
    timestamp: new Date().getTime(),
  })
  setSpinLocaData()
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
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
