<template>
  <el-upload
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    v-model:file-list="fileList"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
  >
    <el-icon>
      <Plus :color="limit <= fileList.length ? '#ccc' : 'inherit'" />
    </el-icon>
  </el-upload>
  <el-image-viewer
    v-if="state.preview.show"
    :url-list="srcList"
    teleported
    show-progress
    :z-index="3000"
    :initial-index="state.preview.index"
    @close="state.preview.show = false"
  />
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import { computed, defineProps, reactive, ref, watchEffect } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 80,
  },
  imgs: {
    type: String,
    default: '',
  },
  limit: {
    type: Number,
    default: 1,
  },
})

const state = reactive({
  preview: {
    index: 0,
    url: '',
    show: false,
  },
})

const fileList = ref([])

const srcList = computed(() => fileList.value.map((n) => n.url))

const getSize = computed(() => props.size + 'px')

const emits = defineEmits(['setFileList'])

watchEffect(() => {
  fileList.value = [props.imgs].map((n) => ({
    url: n,
  }))
  emits('setFileList', fileList.value)
})

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  state.preview.index = fileList.value.findIndex((item) => item.name === file.name)
  state.preview.url = file.url!
  state.preview.show = true
}
</script>
<style scoped lang="scss">
:deep .el-upload-list--picture-card {
  --el-upload-list-picture-card-size: v-bind(getSize) !important;
}

:deep .el-upload--picture-card {
  --el-upload-picture-card-size: v-bind(getSize) !important;
}
</style>
