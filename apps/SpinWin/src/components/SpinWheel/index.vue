<template>
  <div class="wheel-wrapper">
    <!-- 转盘容器 -->
    <div class="wheel-container" :style="{ width: `${wheelSize}px`, height: `${wheelSize}px` }">
      <!-- SVG 转盘 -->
      <svg ref="wheelRef" :width="wheelSize" :height="wheelSize" :style="{ transform: `rotate(${rotation}deg)` }"
        class="wheel-svg">
        <!-- 扇形区域 -->
        <g v-for="(prize, index) in prizes" :key="index">
          <!-- 扇形路径 -->
          <path :d="getSegmentPath(index)" :fill="prize.stock > 0 || prize.id === 7 ? prize.color : '#cccccc'"
            :opacity="prize.stock > 0 || prize.id === 7 ? 1 : 0.5" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1"
            class="segment-path" :class="{ 'out-of-stock': prize.stock <= 0 && prize.id !== 7 }" />

          <!-- 图标 -->
          <text v-if="prize.icon" :x="getTextX(index)" :y="getTextY(index) - 15"
            :transform="`rotate(${getTextRotation(index)}, ${getTextX(index)}, ${getTextY(index) - 15})`"
            text-anchor="middle" dominant-baseline="middle" :font-size="iconSize" fill="white" class="prize-icon">
            {{ prize.icon }}
          </text>

          <!-- 奖品文字 -->
          <text :x="getTextX(index)" :y="getTextY(index)"
            :transform="`rotate(${getTextRotation(index)}, ${getTextX(index)}, ${getTextY(index)})`"
            text-anchor="middle" dominant-baseline="middle" :font-size="textSize" font-weight="bold" fill="white"
            class="prize-name">
            {{ prize.name }}
          </text>

          <!-- 库存文字 -->
          <text v-if="prize.id !== 7" :x="getTextX(index)" :y="getTextY(index) + 15"
            :transform="`rotate(${getTextRotation(index)}, ${getTextX(index)}, ${getTextY(index) + 15})`"
            text-anchor="middle" dominant-baseline="middle" :font-size="textSize - 2" fill="white" opacity="0.9"
            class="prize-stock">
            剩余: {{ prize.stock }}
          </text>
        </g>
      </svg>

      <!-- 中心指针 -->
      <div class="pointer" :style="pointerStyle">
        <div class="needle" :style="needleStyle"></div>
        <div class="center" :style="centerStyle"></div>
      </div>

      <!-- 抽奖按钮 -->
      <button @click="handleSpin" :disabled="isSpinning || getRemainingSpins() <= 0" class="spin-button"
        :style="buttonStyle">
        {{ getButtonText() }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { storeToRefs } from 'pinia'
import { usePrizesStore } from '@/stores/prizes'
// import Result from './result.vue'

const { prizes } = storeToRefs(usePrizesStore())
const { spin, getRemainingSpins } = usePrizesStore()

const wheelRef = ref<SVGElement>()
const rotation = ref(0)
const isSpinning = ref(false)
const result = ref<{ success: boolean; prize?: any; message: string } | null>(null)

// 响应式布局配置
const screenWidth = ref(window.innerWidth)

const isMobile = computed(() => screenWidth.value < 768)

// 转盘尺寸配置
const wheelSize = computed(() => {
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

// 改进的扇形路径计算
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

// 优化后的文字位置计算 - 确保所有文字元素在扇形中心对齐
const getTextX = (index: number): number => {
  const segmentAngle = 360 / prizes.value.length
  const angle = ((index * segmentAngle + segmentAngle / 2 - 90) * Math.PI) / 180
  const radius = (wheelSize.value / 2 - 10) * 0.65  // 稍微调近一点，确保文字不会太靠边
  return wheelSize.value / 2 + radius * Math.cos(angle)
}

const getTextY = (index: number): number => {
  const segmentAngle = 360 / prizes.value.length
  const angle = ((index * segmentAngle + segmentAngle / 2 - 90) * Math.PI) / 180
  const radius = (wheelSize.value / 2 - 10) * 0.65
  return wheelSize.value / 2 + radius * Math.sin(angle)
}

// 计算文字旋转角度
const getTextRotation = (index: number): number => {
  const segmentAngle = 360 / prizes.value.length
  const angle = index * segmentAngle + segmentAngle / 2
  // 当角度超过90度且小于270度时，文字需要翻转180度以保持可读性
  if (angle > 90 && angle < 270) {
    return angle + 180
  }
  return angle
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

// 计算文字沿圆弧的路径
const getTextPath = (index: number): string => {
  const centerX = wheelSize.value / 2
  const centerY = wheelSize.value / 2
  const radius = (wheelSize.value / 2 - 10) * 0.85  // 文字圆弧半径，贴近内边缘
  const segmentAngle = 360 / prizes.value.length
  const startAngle = index * segmentAngle - 90 - segmentAngle / 2
  const endAngle = index * segmentAngle - 90 + segmentAngle / 2

  const startAngleRad = (startAngle * Math.PI) / 180
  const endAngleRad = (endAngle * Math.PI) / 180

  const x1 = centerX + radius * Math.cos(startAngleRad)
  const y1 = centerY + radius * Math.sin(startAngleRad)
  const x2 = centerX + radius * Math.cos(endAngleRad)
  const y2 = centerY + radius * Math.sin(endAngleRad)

  // 创建圆弧路径
  return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`
}
</script>

<style scoped lang="scss">
.wheel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.wheel-container {
  position: relative;
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  background: white;
  border: 4px solid #ddd;
  overflow: hidden;
}

.wheel-svg {
  transform-origin: center;
  transition: transform 0.1s ease;
}

.segment-path {
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(1.1);
  }

  &.out-of-stock {
    opacity: 0.5;
    fill: #cccccc !important;
  }
}

.prize-name,
.prize-stock,
.prize-icon {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  pointer-events: none;
  user-select: none;
}

.prize-icon {
  // 图标样式优化
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));
}

.prize-name {
  // 奖品名称样式
  font-weight: bold;
  letter-spacing: 1px;
}

.prize-stock {
  // 库存文字样式
  font-weight: 500;
  opacity: 0.95;
}

.pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
}

.needle {
  width: 4px;
  height: 120px;
  background: linear-gradient(to bottom, #ff4757 0%, #ff3742 100%);
  border-radius: 2px;
  position: relative;
  transform-origin: 50% 100%;
  box-shadow: 0 0 10px rgba(255, 71, 87, 0.5);
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #fff 0%, #ddd 100%);
  border-radius: 50%;
  border: 3px solid #ff4757;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  z-index: 20;
}

.spin-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border: none;
  color: white;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  z-index: 25;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

/* 移动端优化 */
@media (max-width: 767px) {
  .wheel-wrapper {
    padding: 10px;
  }

  .spin-button {
    width: 60px;
    height: 60px;
    font-size: 10px;
  }

  .needle {
    height: 100px;
  }
}
</style>
