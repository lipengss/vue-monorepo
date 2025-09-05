<template>
  <el-upload action="#" list-type="picture-card" :auto-upload="false" multiple v-model:file-list="fileList"
    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>
  <el-image-viewer v-if="state.preview.show" :url-list="srcList" teleported show-progress :z-index="3000"
    :initial-index="state.preview.index" @close="state.preview.show = false" />
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, watchEffect, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

const props = defineProps({
  size: {
    type: Number,
    default: 100
  },
  imgs: {
    type: Array,
    default: () => [] as UploadFile[]
  }
})

const state = reactive({
  preview: {
    index: 0,
    url: '',
    show: false
  }
})

const fileList = ref([])

const emits = defineEmits(['setFileList'])

const srcList = computed(() => fileList.value.map(n => n.url))

const getSize = computed(() => props.size + 'px')

watchEffect(() => {
  console.log('props.imgs', props.imgs)
  fileList.value = props.imgs
  emits('setFileList', fileList.value)
})


const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  state.preview.index = fileList.value.findIndex(item => item.name === file.name)
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
