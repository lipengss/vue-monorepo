<template>
	<div class="container">
		<Dialog v-model:visible="dialog.visible" title="字段创建" width="500" draggable>
			<el-form :model="dialog.data" hide-required-asterisk label-position="top">
				<FormItem label="字段名" prop="name" :rules="{ required: true, message: '输入字段名' }">
					<el-input v-model="dialog.data.label" placeholder="请输入字段名" clearable />
				</FormItem>
				<FormItem label="字段标识" prop="prop" :rules="{ required: true, message: '输入字段标识' }">
					<el-input v-model="dialog.data.label" placeholder="请输入字段标识" clearable />
				</FormItem>
				<FormItem label="读写类型" prop="dataType.unit">
					<el-radio-group v-model="dialog.data.readWrite">
						<el-radio v-for="[key, obj] in readWriteList" :key="key" :label="key">{{ obj.label }}</el-radio>
					</el-radio-group>
				</FormItem>
				<FormItem label="数据类型" prop="dataType.type" :rules="{ required: true, message: '选择数据类型' }">
					<el-select v-model="dialog.data.dataType.type" placeholder="请选择数据类型">
						<el-option v-for="[key, obj] in typeList" :key="key" :value="key" :label="obj.label" />
					</el-select>
				</FormItem>
				<FormItem v-if="dataType === 'string'" label="字节长度" prop="dataType.length">
					<el-input v-model="dialog.data.dataType.length">
						<template #append>字节</template>
					</el-input>
				</FormItem>
				<template v-if="['int', 'float', 'double'].includes(dataType)">
					<el-space alignment="last baseline">
						<FormItem label="取值范围" prop="dataType.min">
							<el-input-number v-model="dialog.data.dataType.min" placeholder="最小值" :controls="false" />
						</FormItem>
						<el-icon><Minus /></el-icon>
						<FormItem label="" prop="dataType.max">
							<el-input-number v-model="dialog.data.dataType.max" placeholder="最大值" :controls="false" />
						</FormItem>
					</el-space>
					<FormItem label="步长" prop="dataType.step">
						<el-input-number v-model="dialog.data.dataType.step" placeholder="请输入步长" :controls="false" />
					</FormItem>
					<FormItem label="单位" prop="dataType.unit">
						<el-select v-model="dialog.data.dataType.unit" placeholder="请选择单位">
							<el-option v-for="[key, obj] in unitList" :key="key" :value="key" :label="obj.label" />
						</el-select>
					</FormItem>
				</template>
				<template v-if="dataType === 'enum'">
					<EnumTable :elements="dialog.data.dataType.elements" />
				</template>
				<template v-if="dataType === 'boolean'">
					<el-radio-group v-model="dialog.data.dataType.default_value">
						<template v-for="item in dialog.data.dataType.elements">
							<el-space class="mb10">
								<el-radio :label="item.value" style="min-width: 60px">
									{{ item.label }}
								</el-radio>
								<el-input v-model="item.label" />
							</el-space>
						</template>
					</el-radio-group>
				</template>

				<!--          <FormItem label="默认值" prop="dataType.defaultValue">-->
				<!--            <el-input v-model="dialog.data.dataType.defaultValue" placeholder="请输入默认值" clearable />-->
				<!--          </FormItem>-->
				<!--        </el-card>-->
				<FormItem label="描述" prop="description">
					<el-input v-model="dialog.data.description" type="textarea" placeholder="描述信息..." />
				</FormItem>
			</el-form>
		</Dialog>
		<el-button @click="dialog.visible = true">添加字段</el-button>
		<treeTable />
	</div>
</template>
<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import FormItem from '@common/component/src/component/FormItem/index.vue'
import Dialog from '@common/component/src/component/Dialog/index.vue'
import EnumTable from './component/EnumTable.vue'
import { Minus } from '@element-plus/icons-vue'
import treeTable from './treeTable.vue'
import { typeList, unitList, readWriteList } from './data'
const dialog: DialogState = reactive({
	visible: false,
	data: {
		label: '',
		prop: '',
		readWrite: true,

		dataType: {
			type: 'string',
			length: 100,
		},
		description: '',
		operable: [''],
	},
})

const dataType = computed(() => dialog.data.dataType.type)

watch(
	() => dataType.value,
	(type) => {
		switch (type) {
			case 'string':
				dialog.data.dataType = {
					type,
					length: 100,
				}
				break
			case 'int':
			case 'float':
			case 'double':
				dialog.data.dataType = {
					type,
					min: undefined,
					max: undefined,
					step: 0.1,
					unit: '',
				}
				break
			case 'enum':
				dialog.data.dataType = {
					type,
					elements: [],
				}
				break
			case 'boolean':
				dialog.data.dataType = {
					type,
					default_value: true,
					elements: [
						{ label: '是', value: true },
						{ label: '否', value: false },
					],
				}
				break
		}
	}
)
</script>
<style lang="scss" scoped>
.required-text {
	color: #f56c6c;
}
</style>
