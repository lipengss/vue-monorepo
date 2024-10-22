<template>
	<el-table size="small" class="mb18" border :data="datas" row-key="id">
		<el-table-column prop="label" label="表单名称">
			<template #default="{ row }">
				<el-form-item :rules="{ required: true, message: '请输入表单名称' }">
					<el-input v-model="row.label" placeholder="输入表单名称"></el-input>
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column prop="field" label="表单字段">
			<template #default="{ row }">
				<el-form-item :rules="{ required: true }">
					<el-input v-model="row.field" placeholder="输入表单字段名"></el-input>
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column prop="type" label="表单类型" width="297">
			<template #default="{ row }">
				<el-form-item :rules="{ required: true }">
					<el-select v-model="row.type" @change="onTypeChange($event, row)">
						<el-option v-for="item in ENUM_TYPE" :key="item" :label="item" :value="item" />
					</el-select>
					<el-button class="ml6" :disabled="row.type === 'object'" @click="operationRef.operation(row)">更多</el-button>
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column prop="required" label="是否必填" align="center">
			<template #default="{ row }">
				<el-form-item>
					<el-switch v-model="row.required" @change="onRequiredChange($event, row)" :disabled="['object', 'radio', 'switch'].includes(row.type)" />
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column prop="show" label="显示" align="center">
			<template #default="{ row }">
				<el-form-item>
					<el-switch v-model="row.show" />
				</el-form-item>
			</template>
		</el-table-column>
		<el-table-column label="操作" align="center">
			<template #default="{ row }">
				<el-space>
					<el-dropdown placement="bottom-start" @command="onAddRow($event, row)">
						<el-button type="success" size="small" circle :icon="Plus" />
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item command="adjoin">添加相邻节点</el-dropdown-item>
								<el-dropdown-item v-if="['object', 'array'].includes(row.type)" command="children">添加子节点</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
					<el-button type="danger" size="small" @click="onDeleteRow(row)" circle :icon="Delete" />
				</el-space>
			</template>
		</el-table-column>
	</el-table>
	<el-button type="success" class="w100" :icon="Plus" @click="onPushRow">添加表单</el-button>
	<input-operation ref="operationRef" />
</template>
<script setup lang="ts">
import { withDefaults, defineProps, ref } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import inputOperation from './inputOperation/inputOperation.vue'
import { ENUM_TYPE, Idata } from '@/types/IModel'
import { useTableTree, useInputEvent } from './hook'
import {
	ElTable,
	ElTableColumn,
	ElButton,
	ElFormItem,
	ElInput,
	ElSelect,
	ElOption,
	ElSpace,
	ElDropdown,
	ElDropdownMenu,
	ElDropdownItem,
	ElSwitch,
} from 'element-plus'

interface Props {
	datas: Idata[]
}

const props = withDefaults(defineProps<Props>(), {
	datas: Array,
})

const operationRef = ref()

const delOrAdd = ref('add')

const [onTypeChange, onRequiredChange] = useInputEvent()

const [onAddRow, onPushRow, onDeleteRow] = useTableTree(props.datas, delOrAdd)
</script>
<style lang="scss" scoped>
.el-table {
	:deep .cell {
		display: flex;
		align-items: center;
	}
}
</style>
