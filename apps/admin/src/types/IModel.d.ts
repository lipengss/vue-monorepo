export enum ENUM_TYPE {
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

export enum DATE_TYPE {
	year = 'year',
	month = 'month',
	week = 'week',
	dates = 'dates',
	daterange = 'daterange',
}

export interface Ioption {
	value: string
	label: string
	id?: string
}

interface Rules {
	required: boolean
	message: string
}

export interface Idata {
	label: string
	field: string
	type: ENUM_TYPE
	id: string
	required: boolean
	parent: string
	show: boolean
	expand: {
		[key: string]: any
	}
	rules?: Rules | Rules[]
	defaultValue?: any // 表单默认值
	options?: Ioption[] // type 为select radio checkbox是设置的字段
	children?: Idata[]
}

export interface Ifunction {
	name: string
	type: string
	fun_type: string
	icon?: string
	id: string
}

export interface Ievent {
	name: string
	relation: {
		from: string
		to: string[]
	}
	action: string
	id: string
}

export interface IformState {
	attrs: {
		[key: string]: any
	}
	inputDatas: Idata[]
	functions: Ifunction[]
	events: Ievent[]
}

export interface IstateData {
	visible: boolean
	title: string
	tabActive: string
	formState: IformState
}
