<template>
	<el-table :data="datas" class="mb18" border size="small">
		<el-table-column prop="事件名称" label="事件名称" align="center">
			<template #default="{ row }">
				<el-form-item :rules="{ required: true }">
					<el-input v-model="row.name" placeholder="请输入事件名称" />
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column prop="type" label="from" align="center">
			<template #default="{ row }">
				<el-form-item :rules="{ required: true }">
					<el-cascader v-model="row.relation.from" :options="inputs" :props="{ value: 'field' }" collapse-tags clearable />
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column prop="type" label="to" align="center">
			<template #default="{ row }">
				<el-form-item :rules="{ required: true }">
					<el-cascader v-model="row.relation.to" :options="inputs" :props="{ multiple: true, value: 'field' }" collapse-tags clearable />
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column prop="icon" label="执行动作" align="center">
			<template #default="{ row }">
				<el-form-item :rules="{ required: true }">
					<el-select v-model="row.action" placeholder="请选择执行动作">
						<el-option v-for="typ in actions" :value="typ.value" :label="typ.label" />
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
import { ElTable, ElTableColumn, ElButton, ElFormItem, ElSelect, ElOption, ElCascader, ElInput } from 'element-plus'

import { useTableEvent } from './hook'

const actions = [
	{ label: '禁启用', value: 'disabled' },
	{ label: '显示隐藏', value: 'isShow' },
]

interface Props {
	inputs: Idata[]
	datas: Ievent[]
}
const props = withDefaults(defineProps<Props>(), {
	inputs: Array,
	datas: Array,
})

const [onPushRow, onAdd, onDelete] = useTableEvent(props.datas)
</script>
