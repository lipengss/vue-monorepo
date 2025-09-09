<template>
  <el-table :data="spinHistory" border>
    <el-table-column label="奖品等级" prop="name" align="center" />
    <el-table-column label="奖品名称" prop="description" align="center">
      <template #default="{ row }">
        {{ row.icon }}
        {{ row.description }}
      </template>
    </el-table-column>
    <el-table-column label="中奖时间" prop="timestamp" align="center">
      <template #default="{ row }">
        {{ dayjs(row.timestamp).format('YYYY年MM月DD日 HH:mm:ss') }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { usePrizesStore } from '@/stores/prizes'
import { iconList, prizeLevel } from '@/utils/publicData'
import { ElMessage, dayjs } from 'element-plus'
import { nanoid } from 'nanoid'
import { storeToRefs } from 'pinia'
import Sortable from 'sortablejs'
import { computed, onMounted, reactive } from 'vue'

const { spinHistory, iconSize, fontSize } = storeToRefs(usePrizesStore())
const { setSpinLocaData } = usePrizesStore()
const state = reactive({
  rowEdit: null,
  iconSearch: '',
})

const filterIconList = computed(() => {
  if (state.iconSearch) {
    return iconList.filter((item) => item.description.includes(state.iconSearch))
  }
  return iconList
})

const addPrize = () => {
  if (prizes.value.length >= prizeLevel.length + 1) {
    return ElMessage.warning(`最多添加${prizeLevel.length}个奖品`)
  }
  const id = nanoid()
  state.rowEdit = id
  const prizeName = prizeLevel[prizes.value.length]
  prizes.value.push({
    id: id,
    name: prizeName,
    icon: '🌈',
    description: '',
    color: '#fff',
    totalCount: 0,
    range: 0,
    stock: 0,
    value: 0,
  })
  setSpinLocaData()
}

const removePrize = (row) => {
  prizes.value = prizes.value.filter((item) => item.id !== row.id)
  setSpinLocaData()
}

const onSave = () => {
  state.rowEdit = null
  setSpinLocaData()
}

function rowDrop() {
  // 确保DOM已经渲染完成
  setTimeout(() => {
    const tbody = document.querySelector('.el-table__body-wrapper tbody')
    if (!tbody) {
      console.error('找不到表格DOM元素')
      return
    }

    Sortable.create(tbody, {
      onEnd({ newIndex, oldIndex }) {
        console.log('拖动了行，序号(index)"' + oldIndex + '"拖动到序号(index)"' + newIndex + '"')
        const currentRow = prizes.value.splice(oldIndex, 1)[0] // 直接使用prizes.value
        prizes.value.splice(newIndex, 0, currentRow)
        setSpinLocaData() // 保存更新后的数据
      },
    })
  }, 100) // 短暂延迟确保DOM已渲染
}

onMounted(() => {
  rowDrop()
})
</script>
<style lang="scss">
.add-btn {
  width: 100%;
  margin-top: 10px;
}
.scroll-view {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;

  .item {
    padding: 10px;
    background-color: var(--el-color-primary-light-9);
    cursor: pointer;

    &:hover:not(.active) {
      background-color: var(--el-color-primary-light-8);
    }
  }

  .active {
    background-color: var(--el-color-primary-light-7);
  }
}

.color-block {
  display: inline-block;
  min-width: 90px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  background-color: var(--color);
}

:deep .input-name {
  .el-input-group__prepend {
    padding: 0 10px;
    user-select: none;
    cursor: pointer;
  }
}
</style>
