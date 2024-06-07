<template>
  <van-sticky>
    <van-dropdown-menu ref="menuRef">
      <van-dropdown-item v-model="state.expenses" :options="expensesList" />
      <van-dropdown-item v-model="state.purpose" :options="purposeList" />
    </van-dropdown-menu>
  </van-sticky>
</template>
<script setup lang="ts">
import {computed, reactive} from 'vue'
import { _PURPOSE, EXPENSES } from '@/assets/data'

const state = reactive({
  expenses: 'all',
  purpose: 'all'
})

const expensesList = computed(() => {
  const arr = Array.from(EXPENSES).map(([key, obj]) => {
    return {
      text: obj.label,
      value: key
    }
  })
  return [{ text: '全部收支', value: 'all'}, ...arr]
})
const purposeList = computed(() => {
  const arr = Array.from(_PURPOSE).map(([key, obj]) => {
    return {
      text: obj.label,
      value: key
    }
  })
  return [{ text: '全部用途', value: 'all'}, ...arr]
})



</script>

<style scoped lang="scss">

</style>