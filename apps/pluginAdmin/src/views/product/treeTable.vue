<template>
	<el-table
		:data="dataList"
		row-key="uuid"
		:tree-props="{ children: 'hospitalDataList' }"
		:row-class-name="getRowClassName"
		:expand-row-keys="expands"
		@expand-change="onExpandChange"
	>
		<el-table-column label="科室名称" prop="standardDeptName"></el-table-column>
		<el-table-column label="医疗收入（千元）" align="center">
			<el-table-column label="当月" prop="opEmIncome" align="center"></el-table-column>
			<el-table-column label="同比" prop="opEmPatCountRatio" align="center"></el-table-column>
		</el-table-column>
		<el-table-column label="门诊急诊人次" align="center">
			<el-table-column label="当日" prop="opEmPatCount" align="center"></el-table-column>
			<el-table-column label="同比" prop="opEmPatCountRatio" align="center"></el-table-column>
		</el-table-column>
	</el-table>
</template>
<script>
import { ElTable, ElTableColumn } from 'element-plus'
import { data } from './mockData'
export default {
	components: {
		ElTable,
		ElTableColumn,
	},
	data() {
		return {
			dataList: data,
			expands: [],
		}
	},
	methods: {
		onExpandChange(row) {
			const [num] = this.expands
			if (num === row.uuid) {
				this.expands = []
				return false
			}
			this.expands = []
			this.expands.push(row.uuid)
			console.log(this.expands)
		},
		getRowClassName(row) {
			if (row.row.flag) {
				return 'row-expand-cover'
			}
		},
	},
}
</script>
<style lang="scss" scoped>
:deep .row-expand-cover {
	.el-table__expand-icon {
		visibility: hidden;
	}
}
</style>
