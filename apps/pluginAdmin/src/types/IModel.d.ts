declare enum ENUM_TYPE {
	input = 'input',
	numberInput = 'numberInput',
	select = 'select',
	radio = 'radio',
	checkbox = 'checkbox',
	switch = 'switch',
	datePicker = 'datePicker',
	dateTimePicker = 'dateTimePicker',
	object = 'object',
}

declare enum DATE_TYPE {
	year = 'year',
	month = 'month',
	week = 'week',
	dates = 'dates',
	daterange = 'daterange',
}

interface Ioption {
	value: string
	label: string
	id?: string
}

interface IRules {
	required: boolean
	message: string
}

interface Idata {
	label: string
	field: string
	type: string
	id: string
	required: boolean
	parent: string
	show: boolean
	expand: {
		[key: string]: any
	}
	rules?: IRules | IRules[]
	defaultValue?: any // 表单默认值
	options?: Ioption[] // type 为select radio checkbox是设置的字段
	children?: Idata[]
}

interface Ifunction {
	name: string
	type: 'success' | 'default' | 'primary' | 'warning'
	fun_type: string
	icon?: any
	id: string
}

interface Ievent {
	name: string
	relation: {
		from: string[]
		to: [string, string][]
	}
	action: string
	id: string
}

interface IformState {
	attrs: {
		[key: string]: any
	}
	inputDatas: Idata[]
	functions: Ifunction[]
	events: Ievent[]
}

interface IstateData {
	visible: boolean
	title: string
	tabActive: string
	formState: IformState
}
