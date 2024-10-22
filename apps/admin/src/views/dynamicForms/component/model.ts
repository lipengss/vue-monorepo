import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
interface PayLoad {
	page_id: string
	asset_id?: string
	session_id?: string
	data?: any
}
enum comType {
	table = 'table_ui',
	card = 'card_ui',
	map = 'map_ui',
	chartLine = 'chartLine_ui',
}

// 模型
export interface Model {
	report_id: string
	report_title: string
	report_type: comType
	index_list: Index_list[]
	response: Response
}

// 结构体
interface Index_list {
	index_id: string
	index_name: string
	data_unit: string
	ui: {}
}

// 数据体
interface Response {
	data_type: string
	report_id: string
	data: {
		[key: string]: any
	}
}

const models = reactive({})

export class Models {
	private models: {
		[key: string]: Model
	}
	constructor() {
		this.models = {}
	}
	// 获取模型并改造成key:value
	async requestModel(params: PayLoad) {
		try {
			const { code, data, message } = await fetch(params.page_id).then((res) => res.json())
			if (code !== 0) return ElMessage.error(message)
			data.blocks.forEach((item: any) => {
				this.models[item.report_id] = item
			})
		} catch (err) {
			ElMessage.error('模型加载失败！')
		}
	}
	getModel(report_id: string) {
		return this.models[report_id] || {}
	}
	getListIndex(report_id: string): Index_list[] {
		return this.models[report_id].index_list || []
	}
}
