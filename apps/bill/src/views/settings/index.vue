<template>
  <LineChart :series="data1" :axis="axis" />
  <LineChart :series="data2" :axis="axis" />
</template>
<script>
import LineChart from '@common/component/src/component/LineChart/LineChart.vue'
export default {
  components: {
    LineChart
  },
  data() {
    return {
      data1: [],
      data2: [],
      axis: []
    }
  },
  methods: {
    getData() {
      const color = ['#5470c6', '#91cc75', '#fac858']

      this.axis = ["2024-05-06", "2024-05-07", "2024-05-08", "2024-05-09", "2024-05-10", "2024-05-11", "2024-05-12"]

      const data1 = [{name:"收入",data:["38.06", "63.25", "35.67", "33.22", "51.07", "32.73", "17.23", "43.85", "99.11", "25.47", "49.96"], color: color[0]}]

      const data2 = [
          { name:"门急诊人次",data:["18", "12", "13", "8", "11", "4", "1"], color: color[0]},
          { name:"住院人次",data: ["1", "2", "0", "1", "3", "0", "0"], color: color[1]},
          { name:"出院人次",data: ["8", "6", "2", "5", "10", "20", "10"], color: color[2]}
      ]

      this.data1 = data1
      this.data2 = data2
      // data1.map((n, index) => {
      //   return {
      //     ...n,
      //     color: color[index]
      //   }
      // })


      // data2.map((n, index) => {
      //   return {
      //     ...n,
      //     color: color[index]
      //   }
      // })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style scoped lang="scss">

</style>