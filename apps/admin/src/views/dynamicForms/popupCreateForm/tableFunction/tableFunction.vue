<template>
	<el-table :data="datas" class="mb18" border size="small">
		<el-table-column prop="name" label="按钮名称" align="center">
			<template #default="{ row }">
				<el-form-item :rules="{ required: true }">
					<el-input v-model="row.name" placeholder="请输入按钮名称" />
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column prop="type" label="按钮类型" align="center">
			<template #default="{ row }">
				<el-form-item :rules="{ required: true }">
					<el-select v-model="row.type" placeholder="请选择按钮类型">
						<el-option v-for="typ in btnTypes" :value="typ" :label="typ" />
					</el-select>
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column prop="icon" label="按钮图表" align="center">
			<template #default="{ row }">
				<el-form-item :rules="{ required: true }">
					<icon-select v-model:value="row.icon" />
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column prop="fun_type" label="功能类型" align="center">
			<template #default="{ row }">
				<el-form-item :rules="{ required: true }">
					<el-select v-model="row.fun_type" placeholder="请选择功能类型">
						<el-option v-for="fun in fun_types" :value="fun.value" :label="fun.label" />
					</el-select>
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column label="操作" align="center">
			<template #default="{ row }">
				<el-button icon="Plus" circle size="small" type="success" @click="onAdd(row)" />
				<el-button icon="Delete" circle size="small" type="danger" @click="onDelete(row)" />
			</template>
		</el-table-column>
	</el-table>
	<el-button type="success" class="w100" icon="Plus" @click="onPushRow">添加表单</el-button>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'
import { Ifunction } from "@/types/IModel.d"
import IconSelect from '@/components/IconSelect/IconSelect.vue'
import { useTableEvent } from './hook'

import { ElTable, ElTableColumn, ElFormItem, ElButton, ElSelect, ElOption, ElInput } from 'element-plus'

const btnTypes = ['primary', 'success', 'warning', 'danger', 'info', 'default']
const fun_types = [
	{ label: '提交表单', value: 'submitForm' },
	{ label: '重置表单', value: 'resetForm' },
]

interface Props {
	datas: Ifunction[]
}
const props = withDefaults(defineProps<Props>(), {
	datas: Array,
})

const [onPushRow, onAdd, onDelete] = useTableEvent(props.datas)
</script>
