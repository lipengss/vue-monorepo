<template>
  <LineChart :option="option" />
</template>
<script>
import LineChart from '@common/component/src/component/LineChart/LineChart.vue'
export default {
  components: {
    LineChart
  },
  data() {
    return {
      option: {}
    }
  },
  methods: {

  },
  mounted() {
  }
}
</script>
<style scoped lang="scss">

</style>