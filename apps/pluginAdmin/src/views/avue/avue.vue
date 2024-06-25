<template>
	<avue-crud :data="data" :option="option" v-model="formData" @row-save="onRowSave" @row-update="onRowUpdate">
		<!-- <template #mode="{ row, index }">
			{{ formatData(row, 'name') }}
		</template>
		<template #mode-form="{ type, disabled }">
			<el-select v-model="formData.mode" @change="onChange">
				<el-option v-for="mode in modeList" :label="mode.name" :value="mode.id" />
			</el-select>
		</template> -->
	</avue-crud>
</template>
<script>
let baseUrl = 'https://cli.avuejs.com/api/area'
export default {
	data() {
		return {
			formData: {},
			data: [
				{
					mode: 0,
					year: 2022,
				},
				{
					mode: 1,
					year: 2023,
				},
			],
			modeList: [
				{
					name: 'model1',
					year: 2022,
					id: 0,
				},
				{
					name: 'model2',
					year: 2023,
					id: 1,
				},
				{
					name: 'model3',
					year: 2024,
					id: 2,
				},
				{
					name: 'model4',
					year: 2025,
					id: 3,
				},
				{
					name: 'model5',
					year: 2026,
					id: 4,
				},
			],
			option: {
				stripe: true,
				border: true,
				showOverflowTooltip: true,
				addBtnText: '添加设备',
				viewBtn: true,
				searchIndex: 3,
				searchIcon: true,
				searchMenuSpan: 6,
				searchMenuPosition: 'center',
				menuFixed: 'right',
				column: [
					{
						label: '设备ID',
						prop: 'device_id',
						type: 'input',
						editDisplay: false,
						search: true,
					},
					{
						label: '设备名称',
						prop: 'device_name',
						type: 'input',
						fixed: 'left',
						search: true,
					},
					{
						label: '设备型号',
						prop: 'device_mode',
						type: 'input',
					},
					{
						label: '设备版本',
						prop: 'device_version',
						type: 'input',
					},
					{
						label: '生产厂家',
						prop: 'factory',
						type: 'input',
					},
					{
						label: '生产日期',
						prop: 'date',
						type: 'year',
					},
					{
						label: '出厂编号',
						prop: 'factory_code',
						type: 'input',
					},
					{
						label: '接线方式',
						prop: 'method',
						type: 'select',
						dicData: [
							{
								label: '单项',
								value: 0,
							},
							{
								label: '三相三线',
								value: 1,
							},
							{
								label: '三相四线',
								value: 2,
							},
						],
					},
				],
			},
		}
	},
	methods: {
		onChange(id) {
			const item = this.modeList.find((n) => n.id === id)
			this.formData.year = item.year
		},
		formatData(row, key) {
			const item = this.modeList.find((n) => n.id === row.mode)
			return item[key]
		},
		onRowSave(row, done, loading) {
			console.log(row)
			loading()
		},
		onRowUpdate(row, done, loading) {
			console.log(row)
			loading()
		},
	},
}
</script>
<style>
.avue-form__group--flex {
	align-items: baseline;
}
</style>
