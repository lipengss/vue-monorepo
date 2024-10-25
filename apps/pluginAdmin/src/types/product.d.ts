type typeList = 'int' | 'float' | 'double' | 'string' | 'boolean' | 'enum'

interface EnumItem {
	text: string
	value: string | number | boolean
}

interface DataType {
	type: typeList
	default_value?: string | boolean
	min?: number
	max?: number
	step?: number
	unit?: string
	length?: number
	elements?: EnumItem[]
}

interface FieldItem {
	label: string
	prop: string
	dataType: DataType
}

interface DialogState {
	visible: boolean
	data: FieldItem
}
