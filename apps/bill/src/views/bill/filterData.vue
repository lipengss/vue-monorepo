<template>
  <van-sticky>
    <van-dropdown-menu ref="menuRef">
      <van-dropdown-item v-model="filter.expenses" :options="expensesList" />
      <van-dropdown-item v-model="filter.purpose" :options="purposeList" />
    </van-dropdown-menu>
  </van-sticky>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBillStore } from '@/stores/bill'
import { _PURPOSE, EXPENSES, formatMap } from '@/assets/data'

const { filter } = storeToRefs(useBillStore())

const expensesList = computed(() => {
  const arr = formatMap(EXPENSES)
  return [{ text: '全部收支', value: 'all'}, ...arr]
})
const purposeList = computed(() => {
  const arr = formatMap(_PURPOSE)
  return [{ text: '全部用途', value: 'all'}, ...arr]
})


</script>

<style scoped lang="scss">

</style>