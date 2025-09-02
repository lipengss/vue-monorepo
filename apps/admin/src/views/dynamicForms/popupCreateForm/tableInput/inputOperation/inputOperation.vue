<template>
	<el-dialog v-model="state.visible" :title="state.data.label">
		<el-form :model="state.data" label-position="top">
			<el-form-item v-if="!customIncludes(['checkbox', 'radio', 'switch'])" label="清空按钮" prop="clearable">
				<el-switch v-model="state.data.expand.clearable" />
			</el-form-item>
			<el-form-item label="禁启用" prop="disabled">
				<el-switch v-model="state.data.expand.disabled" />
			</el-form-item>
			<template v-if="customIncludes('select')">
				<el-form-item label="是否多选" prop="multiple">
					<el-switch v-model="state.data.expand.multiple" />
				</el-form-item>
			</template>
			<el-form-item v-if="!customIncludes(['checkbox', 'radio', 'switch'])" label="表单头部图标" prop="readonly">
				<icon-select v-model:value="state.data.expand.prefix" />
			</el-form-item>
			<template v-if="customIncludes(['datePicker'])">
				<el-form-item label="年/月/周/日" prop="readonly">
					<el-space>
						<el-select v-model="state.data.expand.type">
							<el-option v-for="item in DATE_TYPE" :key="item" :label="item" :value="item" />
						</el-select>
						<el-popover placement="top" title="提示" :width="200" trigger="hover"
							content="日期筛选以/年/月/周/日为单位的展示效果进行筛选">
							<template #reference>
								<el-icon>
									<warning />
								</el-icon>
							</template>
						</el-popover>
					</el-space>
				</el-form-item>
			</template>
			<el-form-item v-if="customIncludes(['checkbox', 'radio', 'select'])" label="枚举类型">
				<el-alert type="warning" show-icon>
					<template #title>
						<span v-if="state.data.defaultValue"> 当前选中的默认值为：{{ state.data.defaultValue }} </span>
						<span v-else> 单击表表格可选中枚举的默认显示值 </span>
					</template>
				</el-alert>
				<el-table size="small" class="mb14" border :data="state.data.options" highlight-current-row
					@current-change="handleCurrentChange">
					<el-table-column type="index" label="序号" width="50" align="center" />
					<el-table-column prop="value" label="值" align="center">
						<template #default="{ row, $index }">
							<el-form-item :prop="`options[${$index}].value`" :rules="{ required: true }">
								<el-input v-model="row.value" placeholder="输入表单名称"></el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="label" label="文本" align="center">
						<template #default="{ row, $index }">
							<el-form-item :prop="`options[${$index}].label`"
								:rules="{ required: true, message: '请输入表单名称' }">
								<el-input v-model="row.label" placeholder="输入表单名称"></el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="required" label="操作" align="center">
						<template #default="{ row, $index }">
							<el-space>
								<el-button type="success" size="small" @click="onAdd($index)" circle :icon="Plus"
									title="添加相邻元素" />
								<el-button type="danger" size="small" @click="onDelete($index)" circle :icon="Delete" />
							</el-space>
						</template>
					</el-table-column>
				</el-table>
				<el-button type="success" class="w100" :icon="Plus" @click="onPush">添加表单</el-button>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="state.visible = false">取消</el-button>
				<el-button type="primary" @click="state.visible = false"> 保存 </el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { ENUM_TYPE, DATE_TYPE } from "@/types/IModel.d"
import IconSelect from '@/components/IconSelect/IconSelect.vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import { defineExpose } from 'vue'
import { useEnumTable, useComputed, useExpose, IState } from './hook'
import {
	ElForm,
	ElTable,
	ElTableColumn,
	ElButton,
	ElFormItem,
	ElAlert,
	ElDialog,
	ElSpace,
	ElSelect,
	ElOption,
	ElPopover,
	ElIcon,
	ElSwitch,
	ElInput,
} from 'element-plus'

const state: IState = reactive({
	visible: false,
	data: {
		label: '',
		field: '',
		type: ENUM_TYPE.input,
		id: '',
		parent: '',
		required: false,
		expand: {},
	},
})

const [onPush, onAdd, onDelete, handleCurrentChange] = useEnumTable(state)

const [customIncludes] = useComputed(state)

defineExpose(useExpose(state))
</script>
