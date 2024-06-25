<template>
  <el-dialog v-model="dialog.visible" title="设备模型">

  </el-dialog>
</template>
<script setup lang="ts">
import {reactive} from "vue";

const dialog = reactive({
  visible: true
})
</script>