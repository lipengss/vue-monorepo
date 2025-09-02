<template>
	<template v-for="item in props.inputDatas">
		<el-form-item v-if="isShow(item, 'input')" :prop="item.field" :rules="item.rules">
			<template #label>
				{{ item.label }}
				<small v-if="item.required" class="small">（必填）</small>
			</template>
			<el-input v-model="data[item.field]" :prefix-icon="item.expand.prefix" :placeholder="`请输入${item.label}`"
				v-bind="item.expand" />
		</el-form-item>
		<el-form-item v-else-if="isShow(item, 'select')" :prop="item.field" :rules="item.rules">
			<template #label>
				{{ item.label }}
				<small v-if="item.required" class="small">（必填）</small>
			</template>
			<el-select v-model="data[item.field]" :placeholder="`请选择${item.label}`" v-bind="item.expand">
				<el-option v-for="sel in item.options" :key="sel.value" :value="sel.value" :label="sel.label" />
			</el-select>
		</el-form-item>
		<el-form-item v-else-if="isShow(item, 'radio')" :prop="item.field" :rules="item.rules">
			<template #label>
				{{ item.label }}
				<small v-if="item.required" class="small">（必填）</small>
			</template>
			<el-radio-group v-model="data[item.field]" v-bind="item.expand" @change="onRadio($event, item.field)">
				<el-radio v-for="radio in item.options" :key="radio.value" :label="radio.value">{{ radio.label
				}}</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item v-else-if="isShow(item, 'checkbox')" :prop="item.field" :rules="item.rules">
			<template #label>
				{{ item.label }}
				<small v-if="item.required" class="small">（必填）</small>
			</template>
			<el-checkbox-group v-model="data[item.field]" v-bind="item.expand">
				<el-checkbox v-for="check in item.options" :key="check.value" :label="check.value">{{ check.label
				}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item v-else-if="isShow(item, 'switch')" :prop="item.field" :rules="item.rules">
			<template #label>
				{{ item.label }}
				<small v-if="item.required" class="small">（必填）</small>
			</template>
			<el-switch v-model="data[item.field]" v-bind="item.expand" />
		</el-form-item>
		<el-form-item v-else-if="isShow(item, 'datePicker')" :prop="item.field" :rules="item.rules">
			<template #label>
				{{ item.label }}
				<small v-if="item.required" class="small">（必填）</small>
			</template>
			<el-date-picker v-model="data[item.field]" type="date" :placeholder="`请选择${item.label}`"
				v-bind="item.expand" />
		</el-form-item>
		<el-card v-else-if="isShow(item, 'object')" :header="item.label" class="mb18">
			<form-item :input-datas="item.children" :data="props.data[item.field]" />
		</el-card>
	</template>
</template>
<script setup lang="ts">
import { withDefaults, defineProps, inject } from 'vue'
import { Idata } from "@/types/IModel.d"
import { onChangeEvent } from './hook'
import {
	ElSwitch,
	ElFormItem,
	ElDatePicker,
	ElCheckboxGroup,
	ElCheckbox,
	ElCard,
	ElSelect,
	ElOption,
	ElInput,
	ElRadioGroup,
	ElRadio,
} from 'element-plus'

interface Props {
	inputDatas: Idata[]
	data: any
}
const props = withDefaults(defineProps<Props>(), {
	inputDatas: Array,
	data: {},
})

const events: any = inject('events')
function isShow(item: Idata, type: string) {
	return item.type === type && item.show
}

const { onRadio } = onChangeEvent(events, props.inputDatas, props.data)
</script>
<style lang="scss" scoped>
.small {
	color: #f56c6c;
}
</style>
