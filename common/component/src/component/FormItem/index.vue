<template>
  <el-form-item :prop="props.prop" :rules="props.rules">
    <template #label>
      {{ props.label }}<small v-if="props.rules && props.rules.required" class="required-text">（必填）</small>
    </template>
    <slot />
  </el-form-item>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import { ElFormItem } from 'element-plus'

interface Props {
  label?: string
  prop?: string
  rules?: { required: boolean, message: string },
}

const props = withDefaults(defineProps<Props>(), {})

</script>
<style lang="scss" scoped>
.required-text{
  color: #f56c6c
}
</style>