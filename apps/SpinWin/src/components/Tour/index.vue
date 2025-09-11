<template>
  <el-tour v-model="visible">
    <el-tour-step :target="bar" title="分割面板" description="点击分割面板，可调整左右面板的宽度" />
    <el-tour-step target="#prize-set" title="设置" description="点击设置，可设置抽奖的奖品" />
  </el-tour>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const visible = ref(false)

const bar = ref()

onMounted(() => {
  bar.value = document.querySelector('.el-splitter-bar__dragger-vertical')
  setTimeout(() => {
    visible.value = true
  }, 1000)
})
</script>
