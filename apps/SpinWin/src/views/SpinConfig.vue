<template>
  <el-card class="config">
    <el-tabs v-model="state.activeTab" type="border-card">
      <el-tab-pane name="prizes" label="奖品配置">
        <template #label>
          奖品配置
          <el-button class="ml10" type="default" size="small" circle @click="addPrize">
            <el-icon>
              <Plus />
            </el-icon>
          </el-button>
        </template>
        <el-table :data="prizes" border>
          <el-table-column label="奖品等级" prop="name" align="center">
            <template #default="{ row }">
              <el-select v-if="state.rowEdit === row.id" v-model="row.name" placeholder="请选择">
                <el-option v-for="item in prizes" :label="item.name" :value="item.name" />
              </el-select>
              <span v-else>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖品名称" prop="description" :min-width="120">
            <template #default="{ row }">
              <el-input v-if="state.rowEdit === row.id" class="input-name" v-model="row.description"
                placeholder="请输入奖品名称">
                <template #prepend>
                  <el-popover placement="bottom" trigger="click" show-arrow :width="200">
                    <template #default>
                      <el-input v-model="state.iconSearch" style="margin-bottom: 10px;" placeholder="请输入图标描述"
                        :suffix-icon="Search" />
                      <el-scrollbar v-if="filterIconList.length" view-class="scroll-view" :max-height="200">
                        <span class="item" :class="{ 'active': item.icon === row.icon }" v-for="item in filterIconList"
                          :key="item.id">{{ item.icon }}</span>
                      </el-scrollbar>
                      <el-empty v-else image-size="100" description="暂无图标"></el-empty>
                    </template>
                    <template #reference>
                      {{ row.icon }}
                    </template>
                  </el-popover>
                </template>
              </el-input>
              <span v-else>{{ row.icon }} {{ row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖品颜色" prop="color" align="center">
            <template #default="{ row }">
              <el-color-picker v-if="state.rowEdit === row.id" v-model="row.color" />
              <span v-else class="color-block" :style="`--color:${row.color}`">{{ row.color }}</span>
            </template>
          </el-table-column>
          <el-table-column label="库存/剩余" prop="totalCount" align="center">
            <template #default="{ row }">
              <el-space v-if="state.rowEdit === row.id">
                <el-input-number style="width:80px" v-model="row.stock" :controls="false" />
                <el-input-number style="width:80px" v-model="row.totalCount" :controls="false" />
              </el-space>
              <span v-else> {{ row.stock }} / {{ row.totalCount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖品概率" prop="probability" align="center">
            <template #default="{ row }">
              <el-input-number v-if="state.rowEdit === row.id" v-model="row.probability" :controls="false" />
              <span v-else>{{ row.probability }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="operation">
            <template #default="{ row }">
              <el-button type="primary" size="small" v-if="state.rowEdit !== row.id"
                @click="state.rowEdit = row.id">编辑</el-button>
              <el-button type="primary" size="small" v-else @click="state.rowEdit = null">保存</el-button>
              <el-button type="info" size="small" v-if="state.rowEdit === row.id"
                @click="state.rowEdit = null">取消</el-button>
              <el-button type="danger" size="small" v-else @click="removePrize(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { usePrizesStore } from '@/stores/prizes'
import { iconList, prizeLevel } from '@/utils/publicData'
import { Search, Plus } from '@element-plus/icons-vue'
import { nanoid } from 'nanoid'
import { ElMessage } from 'element-plus'

const { prizes } = storeToRefs(usePrizesStore())


const state = reactive({
  activeTab: 'prizes',
  iconSearch: '',
  iconList: iconList,
  rowEdit: null,
})

const filterIconList = computed(() => {
  if (state.iconSearch) {
    return iconList.filter(item => item.description.includes(state.iconSearch))
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
    probability: 0,
    stock: 0,
    value: 0,
  })
}

const removePrize = (row) => {
  prizes.value = prizes.value.filter((item) => item.id !== row.id)
}

</script>
<style scoped lang="scss">
:deep .scroll-view {
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

:deep .input-name {
  .el-input-group__prepend {
    padding: 0 10px;
    user-select: none;
    cursor: pointer;
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
</style>
