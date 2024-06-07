<template>
  <div class="card-wrapper">
    <div class="card" style="--bg:#d1edc4;--bd:#67c23a">
      <div class="icon">
        <el-icon :size="60"><svg-icon name="income"></svg-icon></el-icon>
        <div class="name">总收入</div>
      </div>
      <div class="sum">{{totalIncome}} <small>元</small></div>
    </div>
    <div class="card" style="--bg:#fcd3d3;--bd:#f56c6c">
      <div class="icon">
        <el-icon :size="60"><svg-icon name="expenses"></svg-icon></el-icon>
        <div class="name">总支出</div>
      </div>
      <div class="sum">{{totalPay}} <small>元</small></div>
    </div>
    <div class="card" style="--bg:#f8e3c5;--bd:#e6a23c">
      <div class="icon">
        <el-icon :size="60"><svg-icon name="balance"></svg-icon></el-icon>
        <div class="name">结余</div>
      </div>
      <div class="sum">{{totalBalance}} <small>元</small></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { withDefaults, defineProps, computed } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

interface Props {
  list: IOrder[]
}
const props = withDefaults(defineProps<Props>(), {
  list: () => ([])
})


// 总收入
const totalIncome = computed(() => {
  return props.list.filter(item => item.expenses === 'income').map(item => item.price).reduce((pre,cur) => {
    return pre+cur
  }, 0)
})

// 总支出
const totalPay = computed(() => {
  return props.list.filter(item => item.expenses === 'pay').map(item => item.price).reduce((pre,cur) => {
    return pre+cur
  }, 0)
})

// 结余
const totalBalance = computed(() => {
  return totalIncome.value - totalPay.value
})



</script>
<style scoped lang="scss">

.card-wrapper{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-auto-flow: dense;
  grid-gap: 16px;
  margin-bottom: 16px;
  overflow-x: auto;
  .card{
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 10px;
    background-color: var(--bg);
    border: 1px solid var(--bd);
    color: var(--bd);
    .icon{
      min-width: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .sum{
      font-size: 50px;
      font-weight: bold;
    }
  }
}
@media only screen and (max-width: 767px) {
  /* 在这里编写适用于移动设备的 CSS */
  .card-wrapper{
    grid-template-columns: repeat(1,1fr);
  }
}
</style>