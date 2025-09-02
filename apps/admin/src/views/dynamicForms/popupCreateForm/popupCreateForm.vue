<template>
	<el-drawer v-model="stateData.visible" size="80%" :title="stateData.title">
		<el-form ref="formRef" :model="stateData.formState" :show-message="false">
			<el-form-item label="表单布局">
				<el-radio-group v-model="stateData.formState.attrs.labelPosition">
					<el-radio-button label="left">left</el-radio-button>
					<el-radio-button label="right">right</el-radio-button>
					<el-radio-button label="top">top</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-tabs v-model="stateData.tabActive">
				<el-tab-pane name="input" label="表单">
					<tableInput :datas="stateData.formState.inputDatas" />
				</el-tab-pane>
				<el-tab-pane name="function" label="功能">
					<tableFunction :datas="stateData.formState.functions" />
				</el-tab-pane>
				<el-tab-pane name="event" label="事件">
					<tableEvent :inputs="stateData.formState.inputDatas" :datas="stateData.formState.events" />
				</el-tab-pane>
			</el-tabs>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="stateData.visible = false">取消</el-button>
				<el-button type="primary" @click="onSave(formRef)"> 保存 </el-button>
			</span>
		</template>
	</el-drawer>
	<el-button-group class="mb18">
		<el-button icon="Edit" type="primary" @click="editor">编辑表单</el-button>
		<el-button icon="Download" type="danger" @click="downLoad">下载表单JSON</el-button>
	</el-button-group>
</template>
<script setup lang="ts">
import { reactive, ref, defineAsyncComponent, defineEmits } from 'vue'
import { IstateData, ENUM_TYPE } from "@/types/IModel.d"
import { FormInstance, ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'
import { ElDrawer, ElForm, ElFormItem, ElRadioGroup, ElRadioButton, ElTabs, ElTabPane, ElButton, ElButtonGroup } from 'element-plus'

const tableInput = defineAsyncComponent(() => import('./tableInput/tableInput.vue'))
const tableFunction = defineAsyncComponent(() => import('./tableFunction/tableFunction.vue'))
const tableEvent = defineAsyncComponent(() => import('./tableEvent/tableEvent.vue'))

const formRef = ref()
const stateData = reactive<IstateData>({
	visible: false,
	title: '表单编辑',
	tabActive: 'input',
	formState: {
		attrs: {
			labelPosition: 'top',
		},
		// inputDatas: [],
		inputDatas: [
			{
				label: '实时推送',
				field: 'real_time_push',
				type: ENUM_TYPE.switch,
				id: 'j8PJZMna7_50vQh6k4W9P',
				parent: 'j8PJZMna7_50vQh6k4W9P',
				show: true,
				expand: { clearable: true },
				required: false,
				defaultValue: '',
			},
			{
				label: '起始时间',
				field: 'now_time',
				type: ENUM_TYPE.radio,
				id: 'TGDwgBgX-sPBDRmULKTu7',
				parent: 'TGDwgBgX-sPBDRmULKTu7',
				show: true,
				expand: { clearable: true },
				required: false,
				defaultValue: 'now_time',
				options: [
					{ label: '当前时间', value: 'now_time' },
					{ label: '自定义时间', value: 'custom_time' },
				],
			},
			{
				label: '自定义面板',
				field: 'time_panel',
				type: ENUM_TYPE.object,
				id: 'AIc-M2Hf9d0iTMid6pKPr',
				parent: 'AIc-M2Hf9d0iTMid6pKPr',
				show: false,
				expand: { clearable: true },
				required: false,
				defaultValue: {},
				children: [
					{
						label: '自定义时间',
						field: 'custom_time',
						type: ENUM_TYPE.input,
						id: 'v56ByIXR-F6bkIxc9wtRp',
						parent: 'AIc-M2Hf9d0iTMid6pKPr|v56ByIXR-F6bkIxc9wtRp',
						show: true,
						expand: { clearable: true },
						required: false,
					},
					{
						label: '方法名称',
						field: 'method_name',
						type: ENUM_TYPE.input,
						id: 'CQKjmzrHyvGdjhSuk9HOZ',
						parent: 'AIc-M2Hf9d0iTMid6pKPr|CQKjmzrHyvGdjhSuk9HOZ',
						show: true,
						expand: { clearable: true },
						required: false,
					},
				],
			},
			{
				label: '数据来源',
				field: 'source_type',
				type: ENUM_TYPE.radio,
				id: 'SK9hmOFKwEUDciGzYH6cr',
				parent: 'SK9hmOFKwEUDciGzYH6cr',
				show: true,
				expand: { clearable: true },
				required: false,
				defaultValue: 'model_info',
				options: [
					{ label: '模型信息', value: 'model_info' },
					{ label: '数据表信息', value: 'database_info' },
				],
			},
			{
				label: '模型信息',
				field: 'model_info',
				type: ENUM_TYPE.object,
				id: 'Lz_E9EPujmupbRXolI_bV',
				parent: 'SK9hmOFKwEUDciGzYH6cr|Lz_E9EPujmupbRXolI_bV',
				show: true,
				expand: { clearable: true },
				required: false,
				defaultValue: {},
				children: [
					{
						label: '模型',
						field: 'name',
						type: ENUM_TYPE.input,
						id: 'EvAWBqjoNANDXQOGnNDQ8',
						parent: 'SK9hmOFKwEUDciGzYH6cr|Lz_E9EPujmupbRXolI_bV|EvAWBqjoNANDXQOGnNDQ8',
						show: true,
						expand: { clearable: true },
						required: false,
					},
					{
						label: '版本',
						field: 'version',
						type: ENUM_TYPE.input,
						id: '2hFgMZzTxA9HV_QsBxvBz',
						parent: 'SK9hmOFKwEUDciGzYH6cr|Lz_E9EPujmupbRXolI_bV|2hFgMZzTxA9HV_QsBxvBz',
						show: true,
						expand: { clearable: true },
						required: false,
					},
					{
						label: '属性块',
						field: 'block',
						type: ENUM_TYPE.input,
						id: 'ZXwbPIsMD7krBOPXDEvRe',
						parent: 'SK9hmOFKwEUDciGzYH6cr|Lz_E9EPujmupbRXolI_bV|ZXwbPIsMD7krBOPXDEvRe',
						show: true,
						expand: { clearable: true },
						required: false,
					},
					{
						label: '字段',
						field: 'field',
						type: ENUM_TYPE.input,
						id: '-rv6mFIrNwdRyz_67HFgH',
						parent: 'SK9hmOFKwEUDciGzYH6cr|Lz_E9EPujmupbRXolI_bV|-rv6mFIrNwdRyz_67HFgH',
						show: true,
						expand: { clearable: true },
						required: false,
					},
				],
			},
			{
				label: '数据表信息',
				field: 'database_info',
				type: ENUM_TYPE.object,
				id: '9cJTZq23XJuIIOA06gs9_',
				parent: 'SK9hmOFKwEUDciGzYH6cr|9cJTZq23XJuIIOA06gs9_',
				show: false,
				expand: { clearable: true },
				required: false,
				defaultValue: {},
				children: [
					{
						label: '数据库',
						field: 'database',
						type: ENUM_TYPE.input,
						id: 'qo6-X_wuNqTOae_2SNzot',
						parent: 'SK9hmOFKwEUDciGzYH6cr|9cJTZq23XJuIIOA06gs9_|qo6-X_wuNqTOae_2SNzot',
						show: true,
						expand: { clearable: true },
						required: false,
					},
					{
						label: '表名',
						field: 'table',
						type: ENUM_TYPE.input,
						id: 'KlgEMYpBMT8ZrWOaL5lqH',
						parent: 'SK9hmOFKwEUDciGzYH6cr|9cJTZq23XJuIIOA06gs9_|KlgEMYpBMT8ZrWOaL5lqH',
						show: true,
						expand: { clearable: true },
						required: false,
					},
					{
						label: '字段名',
						field: 'field',
						type: ENUM_TYPE.input,
						id: 'cQsdlws1FxISr4tiPeO9-',
						parent: 'SK9hmOFKwEUDciGzYH6cr|9cJTZq23XJuIIOA06gs9_|cQsdlws1FxISr4tiPeO9-',
						show: true,
						expand: { clearable: true },
						required: false,
					},
				],
			},
		],
		functions: [
			{ name: '表单提交', type: 'success', icon: 'Plus', fun_type: 'submitForm', id: 'vR6oBGfpmy6hiIIFHgWSu' },
			{ name: '表单重置', type: 'default', icon: 'Refresh', fun_type: 'resetForm', id: 'bqb4KZdh_rnCcLVrLX0eh' },
		],
		events: [
			{
				name: '数据来源',
				relation: {
					from: ['source_type'],
					to: [
						['model_info', 'name'],
						['model_info', 'version'],
						['model_info', 'block'],
						['model_info', 'field'],
						['database_info', 'database'],
						['database_info', 'table'],
						['database_info', 'field'],
					],
				},
				action: 'isShow',
				id: 'DbXlkECIFfJj-aPckO7rK',
			},
		],
	},
})

const emits = defineEmits(['handleConfirm'])

function editor() {
	stateData.title = '表单编辑'
	stateData.visible = true
}
function downLoad() {
	const json = JSON.stringify(stateData.formState, undefined, 4)
	var blob = new Blob([json], { type: 'json/plain;charset=utf-8' })
	saveAs(blob, `表单数据${Date.now()}.json`)
}

function onSave(formRef: FormInstance | undefined) {
	if (!formRef) return
	console.log(JSON.stringify(stateData.formState))
	formRef.validate((valid, fields) => {
		if (valid) {
			emits('handleConfirm', stateData.formState)
			stateData.visible = false
		} else {
			if (fields) ElMessage.error(Object.values(fields)[0][0].message)
		}
	})
}
</script>
<style lang="scss" scoped>
:deep .cell {
	.el-form-item {
		margin-bottom: 0;

		.el-form-item__content {
			justify-content: center;
		}
	}
}
</style>
