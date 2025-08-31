<template>
  <div class="spin-wheel-container">
    <!-- 使用 Element Plus 的 Row/Col 实现响应式布局 -->
    <el-row :gutter="24">
      <!-- 转盘区域 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="wheel-card" shadow="never">
          <!-- 抽奖次数显示 -->
          <template #header>
            <div class="header-content">
              <el-statistic title="剩余抽奖次数" :value="getRemainingSpins()" suffix="次" />
              <el-tag :type="getRemainingSpins() > 0 ? 'success' : 'danger'">
                {{ todaySpinCount }}/{{ maxDailySpins }}
              </el-tag>
            </div>
          </template>

          <div class="wheel-wrapper">
            <!-- SVG转盘 -->
            <svg
              ref="wheelRef"
              class="wheel-svg"
              :width="wheelSize"
              :height="wheelSize"
              :viewBox="`0 0 ${wheelSize} ${wheelSize}`"
              :style="{ transform: `rotate(${rotation}deg)` }"
            >
              <!-- 转盘背景圆 -->
              <circle
                :cx="wheelSize / 2"
                :cy="wheelSize / 2"
                :r="wheelSize / 2 - 10"
                fill="#fff"
                stroke="#ddd"
                stroke-width="4"
              />

              <!-- 扇形区域 -->
              <g v-for="(prize, index) in prizes" :key="index">
                <path
                  :d="getSegmentPath(index)"
                  :fill="prize.stock > 0 || prize.id === 7 ? prize.color : '#cccccc'"
                  stroke="rgba(255,255,255,0.3)"
                  stroke-width="2"
                  :opacity="prize.stock > 0 || prize.id === 7 ? 1 : 0.5"
                />

                <!-- 奖品文字 -->
                <text
                  :x="getTextX(index)"
                  :y="getTextY(index) - 10"
                  text-anchor="middle"
                  fill="white"
                  font-weight="bold"
                  :font-size="textSize"
                  text-shadow="2px 2px 4px rgba(0,0,0,0.7)"
                >
                  {{ prize.name }}
                </text>

                <!-- 库存显示 -->
                <text
                  v-if="prize.id !== 7"
                  :x="getTextX(index)"
                  :y="getTextY(index) + 5"
                  text-anchor="middle"
                  fill="white"
                  :font-size="textSize - 4"
                  text-shadow="1px 1px 2px rgba(0,0,0,0.7)"
                >
                  剩余: {{ prize.stock }}
                </text>

                <!-- 奖品图标 -->
                <text
                  v-if="prize.icon"
                  :x="getTextX(index)"
                  :y="getTextY(index) + 25"
                  text-anchor="middle"
                  :font-size="iconSize"
                >
                  {{ prize.icon }}
                </text>
              </g>
            </svg>

            <!-- 中心指针 -->
            <div class="center-pointer" :style="pointerStyle">
              <div class="pointer-needle" :style="needleStyle"></div>
              <div class="pointer-center" :style="centerStyle"></div>
            </div>

            <!-- 中心按钮 -->
            <el-button
              class="spin-button"
              :style="buttonStyle"
              type="primary"
              size="large"
              round
              @click="handleSpin"
              :disabled="isSpinning || getRemainingSpins() <= 0"
              :loading="isSpinning"
            >
              {{ getButtonText() }}
            </el-button>
          </div>
        </el-card>
      </el-col>

      <!-- 信息面板区域 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="info-panel">
          <Result />
          <el-tabs>
            <el-tab-pane label="抽奖结果" name="stork">
              <!-- 奖品库存统计 -->
              <el-card class="stock-card" shadow="never">
                <template #header>
                  <div class="card-header">奖品库存</div>
                </template>

                <div class="prize-list">
                  <div v-for="prize in prizes" :key="prize.id" class="prize-item">
                    <div class="prize-info">
                      <span class="prize-icon-small">{{ prize.icon }}</span>
                      <div class="prize-content">
                        <div class="prize-header">
                          <span class="prize-name">{{ prize.name }}</span>
                          <el-tag
                            :type="
                              prize.stock > 10 ? 'success' : prize.stock > 0 ? 'warning' : 'danger'
                            "
                            size="small"
                          >
                            {{ prize.id === 7 ? '无限' : `${prize.stock}件` }}
                          </el-tag>
                        </div>
                        <div class="prize-description">{{ prize.description }}</div>
                        <div v-if="prize.id !== 7" class="prize-progress">
                          <el-progress
                            :percentage="(prize.stock / prize.totalCount) * 100"
                            :show-text="false"
                            :stroke-width="6"
                            :color="
                              prize.stock > 10 ? '#67c23a' : prize.stock > 0 ? '#e6a23c' : '#f56c6c'
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="最近中奖记录" name="history">
              <!-- 中奖历史 -->
              <el-card class="history-card" shadow="never">
                <template #header>
                  <div class="card-header">最近中奖记录</div>
                </template>

                <el-empty v-if="spinHistory.length === 0" description="暂无中奖记录" />

                <el-timeline v-else>
                  <el-timeline-item
                    v-for="record in spinHistory.slice(0, 8)"
                    :key="record.id"
                    :type="record.prizeId === 7 ? 'primary' : 'success'"
                    :timestamp="new Date(record.timestamp).toLocaleTimeString()"
                  >
                    <div class="timeline-content">
                      <el-text tag="b">{{ record.prizeName }}</el-text>
                    </div>
                  </el-timeline-item>
                </el-timeline>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { storeToRefs } from 'pinia'
import { usePrizesStore } from '@/stores/prizes'
// import {
//   ElRow,
//   ElCol,
//   ElCard,
//   ElStatistic,
//   ElText,
//   ElTag,
//   ElButton,
//   ElProgress,
//   ElEmpty,
//   ElTimeline,
//   ElTimelineItem
// } from 'element-plus'
import Result from './result.vue'

const { prizes, spinHistory, todaySpinCount, maxDailySpins } = storeToRefs(usePrizesStore())
const { spin, getRemainingSpins } = usePrizesStore()

const wheelRef = ref<SVGElement>()
const rotation = ref(0)
const isSpinning = ref(false)
const result = ref<{ success: boolean; prize?: any; message: string } | null>(null)

// 响应式布局配置
const screenWidth = ref(window.innerWidth)

const isMobile = computed(() => screenWidth.value < 768)
const isTablet = computed(() => screenWidth.value >= 768 && screenWidth.value < 1200)

// 转盘尺寸配置
const wheelSize = computed(() => {
  if (isMobile.value) return 300
  if (isTablet.value) return 350
  return 400
})

const textSize = computed(() => {
  if (isMobile.value) return 12
  return 14
})

const iconSize = computed(() => {
  if (isMobile.value) return 16
  return 20
})

// 指针和按钮样式
const pointerStyle = computed(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 15,
}))

const needleStyle = computed(() => {
  const height = isMobile.value ? 100 : 120
  return {
    width: '4px',
    height: `${height}px`,
    background: 'linear-gradient(to bottom, #ff4757 0%, #ff3742 100%)',
    borderRadius: '2px',
    position: 'relative',
    transformOrigin: '50% 100%',
    boxShadow: '0 0 10px rgba(255, 71, 87, 0.5)',
  }
})

const centerStyle = computed(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20px',
  height: '20px',
  background: 'radial-gradient(circle, #fff 0%, #ddd 100%)',
  borderRadius: '50%',
  border: '3px solid #ff4757',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
  zIndex: 20,
}))

const buttonStyle = computed(() => {
  const size = isMobile.value ? 60 : 80
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    zIndex: 25,
    fontSize: isMobile.value ? '10px' : '12px',
  }
})

// 监听窗口大小变化
const handleResize = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 计算扇形路径
const getSegmentPath = (index: number): string => {
  const centerX = wheelSize.value / 2
  const centerY = wheelSize.value / 2
  const radius = wheelSize.value / 2 - 10
  const segmentAngle = 360 / prizes.value.length
  const startAngle = index * segmentAngle - 90
  const endAngle = (index + 1) * segmentAngle - 90

  const startAngleRad = (startAngle * Math.PI) / 180
  const endAngleRad = (endAngle * Math.PI) / 180

  const x1 = centerX + radius * Math.cos(startAngleRad)
  const y1 = centerY + radius * Math.sin(startAngleRad)
  const x2 = centerX + radius * Math.cos(endAngleRad)
  const y2 = centerY + radius * Math.sin(endAngleRad)

  const largeArcFlag = segmentAngle > 180 ? 1 : 0

  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
}

// 计算文字位置
const getTextX = (index: number): number => {
  const segmentAngle = 360 / prizes.value.length
  const angle = ((index * segmentAngle + segmentAngle / 2 - 90) * Math.PI) / 180
  const radius = (wheelSize.value / 2 - 10) * 0.6
  return wheelSize.value / 2 + radius * Math.cos(angle)
}

const getTextY = (index: number): number => {
  const segmentAngle = 360 / prizes.value.length
  const angle = ((index * segmentAngle + segmentAngle / 2 - 90) * Math.PI) / 180
  const radius = (wheelSize.value / 2 - 10) * 0.6
  return wheelSize.value / 2 + radius * Math.sin(angle)
}

// 计算奖品对应的角度
const getPrizeAngle = (prizeId: number): number => {
  const index = prizes.value.findIndex((p) => p.id === prizeId)
  const segmentAngle = 360 / prizes.value.length
  return index * segmentAngle + segmentAngle / 2
}

// 处理抽奖
const handleSpin = () => {
  if (isSpinning.value) return

  const spinResult = spin()

  if (!spinResult.success) {
    result.value = spinResult
    return
  }

  isSpinning.value = true
  result.value = null

  const targetAngle = getPrizeAngle(spinResult.prize!.id)
  const spins = 5 + Math.random() * 5
  const finalAngle = rotation.value + spins * 360 + (360 - targetAngle)

  gsap.to(rotation, {
    value: finalAngle,
    duration: 3 + Math.random() * 2,
    ease: 'power3.out',
    onComplete: () => {
      isSpinning.value = false
      result.value = spinResult
    },
  })
}

// 获取按钮文字
const getButtonText = (): string => {
  if (isSpinning.value) return '转动中'
  if (getRemainingSpins() <= 0) return '次数用完'
  return '开始抽奖'
}
</script>

<style scoped>
.spin-wheel-container {
  padding: 16px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.wheel-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wheel-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.wheel-svg {
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  background: white;
}

.info-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.result-card,
.stock-card,
.history-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.result-header,
.card-header {
  font-size: 18px;
  font-weight: bold;
  color: #409eff;
}

.prize-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.prize-details {
  margin-top: 1rem;
}

.prize-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.prize-item {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;
}

.prize-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.prize-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.prize-icon-small {
  font-size: 20px;
  flex-shrink: 0;
}

.prize-content {
  flex: 1;
}

.prize-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.prize-name {
  font-weight: bold;
}

.prize-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.prize-progress {
  margin-top: 8px;
}

.timeline-content {
  display: flex;
  align-items: center;
}

/* 移动端优化 */
@media (max-width: 767px) {
  .spin-wheel-container {
    padding: 8px;
  }

  .wheel-wrapper {
    padding: 10px;
  }

  .info-panel {
    margin-top: 16px;
  }
}

/* 平板端优化 */
@media (min-width: 768px) and (max-width: 1199px) {
  .spin-wheel-container {
    padding: 12px;
  }
}

/* PC端优化 */
@media (min-width: 1200px) {
  .spin-wheel-container {
    padding: 24px;
    height: 100vh;
    overflow: hidden;
  }
}
</style>
