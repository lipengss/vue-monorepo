<template>
	<el-card>
		<el-table height="calc(100vh - 104px)" border>
			<el-table-column type="index" label="序号" width="60" align="center" />
			<el-table-column prop="name" label="监测点名称" align="center"></el-table-column>
			<el-table-column prop="address" label="详细地址" align="center"></el-table-column>
			<el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
			<el-table-column prop="run_time" label="运营时间" align="center"></el-table-column>
			<el-table-column prop="isAll" label="24小时制" align="center"></el-table-column>
			<el-table-column prop="scene" label="现场图" align="center"></el-table-column>
			<el-table-column label="操作" align="center"></el-table-column>
		</el-table>
	</el-card>
</template>
<script setup lang="ts">
import { ElCard, ElTable, ElTableColumn } from 'element-plus'
</script>
<style lang="scss" scoped></style>
