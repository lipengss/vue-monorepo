<template>
  <div class="home">
    <div class="area">
      <el-card body-class="wheel-card" size="small">
        <template #header>
          <div class="header-content">
             <span>剩余抽奖次数</span>
            <el-tag :type="getRemainingSpins() > 0 ? 'success' : 'danger'">
              {{ todaySpinCount }}/{{ maxDailySpins }}
            </el-tag>
          </div>
        </template>
        <LuckyWheel ref="myLuckyRef" :width="getSpinSize" :height="getSpinSize" :prizes="prizesList" :blocks="blocks"
          :buttons="buttons" @start="startCallback" @end="endCallback" />
      </el-card>
      <el-card header="最近中奖记录" class="record-card">
        <el-empty v-if="spinHistory.length === 0" description="暂无中奖记录" />
        <el-scrollbar v-else view-style="padding:10px">
          <el-timeline>
            <el-timeline-item v-for="record in spinHistory.slice(0, 8)" :key="record.id"
              :type="record.prizeId === 7 ? 'primary' : 'success'"
              :timestamp="new Date(record.timestamp).toLocaleTimeString()">
              <div class="timeline-content">
                <el-text tag="b">{{ record.prizeName }}</el-text>
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </el-card>
    </div>
    <div class="area">
      <el-card>
        <template #header>
          <div class="header-content">
            <span>奖品列表</span>
            <el-button size="small" type="warning" @click="isDrawer = true">设置</el-button>
          </div>
        </template>
        <el-scrollbar view-class="prize-list">
          <div v-for="prize in prizes" :key="prize.id" class="prize-item">
            <div class="prize-info">
              <span class="prize-icon-small">{{ prize.icon }}</span>
              <div class="prize-content">
                <div class="prize-header">
                  <span class="prize-name">{{ prize.name }}</span>
                  <el-tag :type="prize.stock > 10 ? 'success' : prize.stock > 0 ? 'warning' : 'danger'
                    " size="small">
                    {{ prize.stock }} / {{ prize.totalCount }} 件
                  </el-tag>
                </div>
                <div class="prize-description">{{ prize.description }}</div>
                <div class="prize-progress">
                  <el-progress :percentage="(prize.stock / prize.totalCount) * 100" :show-text="false" :stroke-width="6"
                    :color="prize.stock > 10 ? '#67c23a' : prize.stock > 0 ? '#e6a23c' : '#f56c6c'
                      " />
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-card>
    </div>
  </div>
  <SettingSpin v-model:visible="isDrawer" :setSpinSize="setSpinSize" />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { usePrizesStore } from '@/stores/prizes'
import SettingSpin from '@/components/SettingSpin.vue'
const { prizes, spinHistory, todaySpinCount, maxDailySpins, getSpinSize } = storeToRefs(usePrizesStore());
const { getRemainingSpins } = usePrizesStore()

const myLuckyRef = ref()

const isDrawer = ref(true)

const blocks = [{ padding: '13px', background: '#617df2' }];
const prizesList = computed(() => {
  return prizes.value.map(n => {
    return {
      fonts: [
        { text: n.name, fontColor: '#fff', fontSize: '14px', top: '10%' },
        { text: n.icon, fontSize: '20px', top: '35%' }
      ],
      background: n.color
    }
  })
});

const buttons = [{
  radius: '24%',
  background: '#8a9bf3',
  pointer: true,
  fonts: [{ text: '开始', top: '-10px' }]
}]

function startCallback() {
  // 调用抽奖组件的play方法开始游戏
  myLuckyRef.value.play()
  // 模拟调用接口异步抽奖
  setTimeout(() => {
    // 假设后端返回的中奖索引是0
    const index = 0
    // 调用stop停止旋转并传递中奖索引
    myLuckyRef.value.stop(index)
  }, 3000)
}

function setSpinSize() {
  console.log('getSpinSize.value', getSpinSize.value)
  myLuckyRef.value.initLucky()
}

// 抽奖结束会触发end回调
function endCallback(prize) {
  console.log(prize)
}

onMounted(() => {
  console.log('myLuckyRef', myLuckyRef.value)
})


</script>

<style scoped lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  gap: 10px;

  .area {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    :deep .el-card {
      flex: 1;
      display: flex;
      flex-direction: column;

      .el-card__body {
        flex: 1;
        padding: 0;
        overflow: hidden;
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

    :deep .wheel-card {
      display: flex;
      justify-content: center;
      align-items: center;
    }
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
