<template>
  <el-form
    :model="state.form"
    :rules="state.rules"
    ref="formRef"
    label-width="100px"
    label-position="top"
    class="demo-ruleForm"
  >
    <el-form-item label="中奖次数" prop="time">
      <el-slider
        style="width: 340px"
        v-model="maxDailySpins"
        show-input
        :min="1"
        :max="500"
        :step="1"
        @change="setSpinLocaData"
      />
    </el-form-item>
    <el-form-item label="转盘大小" prop="time">
      <el-slider
        style="width: 340px"
        v-model="spinSty.size"
        show-input
        :min="spinSty.min"
        :max="spinSty.max"
        :step="spinSty.step"
        @change="setSpinLocaData"
      />
    </el-form-item>
    <el-card shadow="never" size="small" body-style="padding:6px;">
      <template #header>
        <div class="flex-between">
          <span class="mr6">⚙️ 转盘块设置</span>
          <el-button type="primary" size="small" @click="addBlock">➕︎ 添加</el-button>
        </div>
      </template>
      <template v-if="blocks.length">
        <div v-for="(block, pIndex) in blocks" class="block-item">
          <el-descriptions :column="isMobile ? 1 : 3" :data="blocks" class="mb4" border>
            <el-descriptions-item label="内边距">
              <el-input-number v-model="block.padding" @change="setSpinLocaData" />
            </el-descriptions-item>
            <el-descriptions-item label="背景色">
              <el-color-picker v-model="block.background" @change="setSpinLocaData" />
            </el-descriptions-item>
            <el-descriptions-item label="操作">
              <el-button size="small" type="danger" plain circle @click="onRemoveBlock(pIndex)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-descriptions-item>
          </el-descriptions>
          <el-table :data="block.imgs" border>
            <el-table-column label="图片" prop="src" align="center">
              <template #default="{ row }">
                <UploadPictureCard :imgs="row.src" @set-file-list="(imgs) => (row.imgs = imgs)" />
              </template>
            </el-table-column>
            <el-table-column label="大小" prop="size" align="center">
              <template #default="{ row }">
                <el-input-number v-model="row.size" />
              </template>
            </el-table-column>
            <el-table-column label="旋转" prop="rotate" align="center">
              <template #header>
                <div class="flex-center">
                  <span class="mr6">旋转</span>
                  <el-tooltip content="背景图片是否跟随旋转" placement="top">
                    <el-icon class="mt2"><Warning /></el-icon>
                  </el-tooltip>
                </div>
              </template>
              <template #default="{ row }">
                <el-switch v-model="row.rotate" />
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="{ row }">
                <el-button type="primary" size="small" @click="editImg(row)">编辑</el-button>
                <el-button type="danger" size="small" @click="removeImg(row, pIndex)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-button type="success" size="small" class="w100" @click="addImg(pIndex)">
            添加图片
          </el-button>
        </div>
      </template>
      <el-empty v-else />
    </el-card>
  </el-form>
</template>
<script setup lang="ts">
import UploadPictureCard from '@/components/UploadPictureCard/index.vue'
import { usePrizesStore } from '@/stores/prizes'
import { useThemeStore } from '@/stores/theme'
import { iconList } from '@/utils/publicData'
import { Delete, Warning } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'

const { isMobile } = storeToRefs(useThemeStore())

const { prizes, spinSty, blocks, maxDailySpins } = storeToRefs(usePrizesStore())
const { setSpinLocaData } = usePrizesStore()

const state = reactive({
  activeTab: 'prizes',
  iconSearch: '',
  iconList: iconList,
  rowEdit: null,
  form: {
    time: 0,
  },
  rules: {
    // time: [{ required: true, message: '请输入转盘时间', trigger: 'blur' }],
  },
})

function addImg(pIndex) {
  blocks.value[pIndex].imgs.push({
    src: '',
    size: 0,
    rotate: false,
  })
  setSpinLocaData()
}

function editImg(row) {
  state.rowEdit = row
  setSpinLocaData()
}

function removeImg(row, pIndex) {
  const currentBlock = blocks.value[pIndex]
  const index = currentBlock.imgs.findIndex((item) => item.src === row.src)
  currentBlock.imgs.splice(index, 1)
  // blocks.value = blocks.value[pIndex].imgs.filter((item) => item.src === row.src)
  setSpinLocaData()
}

/* ----------------------------------- 添加背景块 ----------------------------------- */

function addBlock() {
  blocks.value.push({
    padding: 0,
    background: '#fff',
    imgs: [],
  })
  setSpinLocaData()
}

function onRemoveBlock(pIndex: number) {
  blocks.value.splice(pIndex, 1)
  setSpinLocaData()
}
</script>
<style lang="scss" scoped>
.block-item:not(:last-child) {
  margin-bottom: 8px;
}
</style>
