<template>
  <div class="spin-wheel-container">
    <!-- 使用 Naive UI 的 Grid 实现响应式布局 -->
    <n-grid :cols="gridCols" :x-gap="24" :y-gap="24" responsive="screen">
      <!-- 转盘区域 -->
      <n-grid-item :span="wheelSpan">
        <n-card class="wheel-card" :bordered="false">
          <!-- 抽奖次数显示 -->
          <template #header>
            <n-space justify="space-between" align="center">
              <n-statistic label="剩余抽奖次数" :value="getRemainingSpins()">
                <template #suffix>
                  <n-text type="info">次</n-text>
                </template>
              </n-statistic>
              <n-tag :type="getRemainingSpins() > 0 ? 'success' : 'error'">
                {{ todaySpinCount }}/{{ maxDailySpins }}
              </n-tag>
            </n-space>
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
            <n-button 
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
            </n-button>
          </div>
        </n-card>
      </n-grid-item>
      <!-- 信息面板区域 -->
      <n-grid-item :span="infoSpan">
        <n-space vertical :size="24">
          <!-- 结果显示 -->
          <n-card v-if="result" class="result-card" :bordered="false">
            <template #header>
              <n-text type="success" style="font-size: 18px; font-weight: bold;">
                🎉 抽奖结果
              </n-text>
            </template>
            
            <n-result 
              :status="result.prize && result.prize.id !== 7 ? 'success' : 'info'"
              :title="result.message"
            >
              <template #icon v-if="result.prize && result.prize.id !== 7">
                <div class="prize-icon">{{ result.prize.icon }}</div>
              </template>
              
              <div v-if="result.prize && result.prize.id !== 7" class="prize-details">
                <n-descriptions :column="1" bordered>
                  <n-descriptions-item label="奖品名称">
                    <n-text strong>{{ result.prize.name }}</n-text>
                  </n-descriptions-item>
                  <n-descriptions-item label="奖品描述">
                    {{ result.prize.description }}
                  </n-descriptions-item>
                  <n-descriptions-item label="价值">
                    <n-text type="error" strong>¥{{ result.prize.value }}</n-text>
                  </n-descriptions-item>
                </n-descriptions>
              </div>
            </n-result>
          </n-card>

          <!-- 奖品库存统计 -->
          <n-card title="奖品库存" :bordered="false">
            <n-list>
              <n-list-item v-for="prize in prizes" :key="prize.id">
                <template #prefix>
                  <span style="font-size: 20px;">{{ prize.icon }}</span>
                </template>
                
                <n-thing>
                  <template #header>
                    <n-space align="center">
                      <span>{{ prize.name }}</span>
                      <n-tag 
                        :type="prize.stock > 10 ? 'success' : prize.stock > 0 ? 'warning' : 'error'"
                        size="small"
                      >
                        {{ prize.id === 7 ? '无限' : `${prize.stock}件` }}
                      </n-tag>
                    </n-space>
                  </template>
                  
                  <template #description>
                    {{ prize.description }}
                  </template>
                  
                  <template #action v-if="prize.id !== 7">
                    <n-progress 
                      type="line" 
                      :percentage="(prize.stock / prize.totalCount) * 100"
                      :show-indicator="false"
                      :height="6"
                      :color="prize.stock > 10 ? '#18a058' : prize.stock > 0 ? '#f0a020' : '#d03050'"
                    />
                  </template>
                </n-thing>
              </n-list-item>
            </n-list>
          </n-card>

          <!-- 中奖历史 -->
          <n-card title="最近中奖记录" :bordered="false">
            <n-empty v-if="spinHistory.length === 0" description="暂无中奖记录" />
            
            <n-timeline v-else>
              <n-timeline-item 
                v-for="record in spinHistory.slice(0, 8)" 
                :key="record.id"
                :type="record.prizeId === 7 ? 'default' : 'success'"
              >
                <template #header>
                  <n-space align="center">
                    <n-text strong>{{ record.prizeName }}</n-text>
                    <n-time :time="record.timestamp" format="HH:mm:ss" />
                  </n-space>
                </template>
              </n-timeline-item>
            </n-timeline>
          </n-card>
        </n-space>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { storeToRefs } from 'pinia'
import { usePrizesStore } from '@/stores/prizes'
import { 
  NGrid, 
  NGridItem, 
  NCard, 
  NSpace, 
  NStatistic, 
  NText, 
  NTag, 
  NButton, 
  NResult, 
  NDescriptions, 
  NDescriptionsItem, 
  NList, 
  NListItem, 
  NThing, 
  NProgress, 
  NEmpty, 
  NTimeline, 
  NTimelineItem, 
  NTime
} from 'naive-ui'

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

// Grid 配置
const gridCols = computed(() => {
  if (isMobile.value) return 1
  return 2
})

const wheelSpan = computed(() => {
  if (isMobile.value) return 1
  return 1
})

const infoSpan = computed(() => {
  if (isMobile.value) return 1
  return 1
})

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
  zIndex: 15
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
    boxShadow: '0 0 10px rgba(255, 71, 87, 0.5)'
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
  zIndex: 20
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
    fontSize: isMobile.value ? '10px' : '12px'
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
  const angle = (index * segmentAngle + segmentAngle / 2 - 90) * Math.PI / 180
  const radius = (wheelSize.value / 2 - 10) * 0.6
  return wheelSize.value / 2 + radius * Math.cos(angle)
}

const getTextY = (index: number): number => {
  const segmentAngle = 360 / prizes.value.length
  const angle = (index * segmentAngle + segmentAngle / 2 - 90) * Math.PI / 180
  const radius = (wheelSize.value / 2 - 10) * 0.6
  return wheelSize.value / 2 + radius * Math.sin(angle)
}

// 计算奖品对应的角度
const getPrizeAngle = (prizeId: number): number => {
  const index = prizes.value.findIndex(p => p.id === prizeId)
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
    ease: "power3.out",
    onComplete: () => {
      isSpinning.value = false
      result.value = spinResult
    }
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

.result-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.prize-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.prize-details {
  margin-top: 1rem;
}

/* 移动端优化 */
@media (max-width: 767px) {
  .spin-wheel-container {
    padding: 8px;
  }
  
  .wheel-wrapper {
    padding: 10px;
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