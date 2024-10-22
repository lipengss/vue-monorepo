<template>
  <el-table>
    <el-table-column label="字段名称" prop="name"></el-table-column>
    <el-table-column label="字段标识" prop="prop"></el-table-column>
    <el-table-column label="读写类型" prop="dataType.unit"></el-table-column>
    <el-table-column label="数据类型" prop="dataType.type"></el-table-column>
    <el-table-column label="描述" prop="description"></el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const table = reactive({
  dataList: [],
  loading: false,
  
})


</script>
<style lang="scss" scoped></style>