import { Local } from '@common/utils'
import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'

export interface Prize {
  id: string
  name: string
  description: string
  probability: number
  color: string
  icon?: string
  stock: number // 库存数量
  totalCount: number // 总数量
  value: number // 奖品价值（用于排序）
}

export interface SpinRecord {
  id: string
  prizeId: number
  prizeName: string
  timestamp: number
  userId?: string
}

export const usePrizesStore = defineStore('prizes', {
  state: () => ({
    // 转盘配置
    spinSty: {
      min: 300,
      max: 1200,
      step: 10,
      size: 400,
    },
    fontSty: {},
    // 奖品配置
    prizes: [
      {
        id: nanoid(),
        name: '一等奖',
        description: 'iPhone 15 Pro',
        probability: 0.01,
        color: '#FF6B6B',
        icon: '📱',
        stock: 2,
        totalCount: 2,
        value: 8999,
      },
      {
        id: nanoid(),
        name: '二等奖',
        description: 'iPad Air',
        probability: 0.05,
        color: '#4ECDC4',
        icon: '📱',
        stock: 5,
        totalCount: 5,
        value: 4999,
      },
      {
        id: nanoid(),
        name: '三等奖',
        description: 'AirPods Pro',
        probability: 0.1,
        color: '#45B7D1',
        icon: '🎧',
        stock: 10,
        totalCount: 10,
        value: 1999,
      },
      {
        id: nanoid(),
        name: '四等奖',
        description: '小米手环',
        probability: 0.15,
        color: '#96CEB4',
        icon: '⌚',
        stock: 20,
        totalCount: 20,
        value: 299,
      },
      {
        id: nanoid(),
        name: '五等奖',
        description: '充电宝',
        probability: 0.2,
        color: '#FFEAA7',
        icon: '🔋',
        stock: 50,
        totalCount: 50,
        value: 99,
      },
      {
        id: nanoid(),
        name: '六等奖',
        description: '数据线',
        probability: 0.25,
        color: '#DDA0DD',
        icon: '🔌',
        stock: 100,
        totalCount: 100,
        value: 29,
      },
      {
        id: nanoid(),
        name: '谢谢参与',
        description: '下次再来',
        probability: 0.24,
        color: '#FFB6C1',
        icon: '🎈',
        stock: 999999,
        totalCount: 999999,
        value: 0,
      },
    ] as Prize[],
    blocks: [
      {
        padding: 13,
        background: '#617df2',
        imgs: [
          {
            src: 'https://w.wallhaven.cc/full/xe/wallhaven-xe8g6o.jpg',
            rotate: false,
            size: 500,
          },
        ],
      },
    ],
    // 中奖记录
    spinHistory: [] as SpinRecord[],
    // 用户今日抽奖次数
    todaySpinCount: 0,
    maxDailySpins: 3, // 每日最大抽奖次数
    iconSize: 30,
    fontSize: 16,
  }),
  getters: {
    getSpinSize: (state) => state.spinSty.size + 'px',
    getBlocks: (state) =>
      state.blocks.map((item) => ({
        background: item.background,
        padding: item.padding + 'px',
        imgs: item.imgs.map((img) => ({
          src: img.src,
          width: img.size + 'px',
          height: img.size + 'px',
          top: '20px',
        })),
      })),
  },
  actions: {
    initLocalSet() {
      if (Local.get('SpinData')) {
        const data = Local.get('SpinData')
        this.spinSty = data.spinSty
        this.prizes = data.prizes
        this.blocks = data.blocks
        this.spinHistory = data.spinHistory
        this.todaySpinCount = data.todaySpinCount
        this.maxDailySpins = data.maxDailySpins
      } else {
        this.setSpinLocaData()
      }
    },
    setSpinLocaData() {
      Local.set('SpinData', {
        spinSty: this.spinSty,
        prizes: this.prizes,
        blocks: this.blocks,
        spinHistory: this.spinHistory,
        todaySpinCount: this.todaySpinCount,
        maxDailySpins: this.maxDailySpins,
      })
    },
    // 根据概率和库存选择奖品
    selectPrize(): Prize {
      // 过滤掉库存为0的奖品（除了谢谢参与）
      const availablePrizes = this.prizes.filter((prize) => prize.stock > 0 || prize.id === 7)

      // 重新计算概率分布
      const totalProbability = availablePrizes.reduce((sum, prize) => sum + prize.probability, 0)
      const random = Math.random() * totalProbability

      let cumulativeProbability = 0
      for (const prize of availablePrizes) {
        cumulativeProbability += prize.probability
        if (random <= cumulativeProbability) {
          return prize
        }
      }

      // 兜底返回谢谢参与
      return this.prizes.find((p) => p.id === 7) || this.prizes[this.prizes.length - 1]
    },
    // 执行抽奖
    spin(): { success: boolean; prize?: Prize; message: string } {
      // 检查今日抽奖次数
      if (this.todaySpinCount >= this.maxDailySpins) {
        return {
          success: false,
          message: `今日抽奖次数已用完，明天再来吧！（${this.todaySpinCount}/${this.maxDailySpins}）`,
        }
      }

      // 选择奖品
      const selectedPrize = this.selectPrize()

      // 减少库存（除了谢谢参与）
      if (selectedPrize.id !== 7) {
        selectedPrize.stock = Math.max(0, selectedPrize.stock - 1)
      }

      // 增加抽奖次数
      this.todaySpinCount++

      // 记录中奖历史
      const record: SpinRecord = {
        id: Date.now().toString(),
        prizeId: selectedPrize.id,
        prizeName: selectedPrize.name,
        timestamp: Date.now(),
      }
      this.spinHistory.unshift(record)

      // 只保留最近100条记录
      if (this.spinHistory.length > 100) {
        this.spinHistory = this.spinHistory.slice(0, 100)
      }

      return {
        success: true,
        prize: selectedPrize,
        message:
          selectedPrize.id === 7 ? '很遗憾，下次再来！' : `恭喜获得：${selectedPrize.name}！`,
      }
    },
    // 重置今日抽奖次数（可以用于测试或管理员操作）
    resetDailyCount() {
      this.todaySpinCount = 0
    },
    // 补充库存（管理员功能）
    restockPrize(prizeId: number, amount: number) {
      const prize = this.prizes.find((p) => p.id === prizeId)
      if (prize) {
        prize.stock += amount
        prize.totalCount += amount
      }
    },
    // 获取奖品统计信息
    getPrizeStats() {
      return this.prizes.map((prize) => ({
        ...prize,
        winCount: this.spinHistory.filter((record) => record.prizeId === prize.id).length,
        stockPercentage: prize.totalCount > 0 ? (prize.stock / prize.totalCount) * 100 : 0,
      }))
    },
    // 获取今日剩余抽奖次数
    getRemainingSpins() {
      return Math.max(0, this.maxDailySpins - this.todaySpinCount)
    },
  },
})
