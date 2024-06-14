<template>
	<avue-crud :data="data" :option="option">
		<!-- <template #cascader="{ dic, row }"> </template> -->
	</avue-crud>
</template>
<script>
let baseUrl = 'https://cli.avuejs.com/api/area'
export default {
	data() {
		return {
			data: [
				{
					province: '110000',
					cascader: [0, 1],
				},
				{
					province: '130000',
					cascader: [0, 2],
				},
			],
			option: {
				column: [
					{
						label: '本地字典',
						prop: 'cascader',
						type: 'cascader',
						props: {
							label: 'name',
						},
						dicData: [
							{
								name: '一级',
								value: 0,
								children: [
									{
										name: '一级1',
										value: 1,
									},
									{
										name: '一级2',
										value: 2,
									},
								],
							},
						],
						slot: true,
					},
					// {
					// 	label: '网络字典',
					// 	prop: 'province',
					// 	type: 'select',
					// 	props: {
					// 		label: 'name',
					// 		value: 'code',
					// 	},
					// 	dicUrl: `${baseUrl}/getProvince`,
					// 	slot: true,
					// },
				],
			},
		}
	},
}
</script>
