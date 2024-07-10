type typeList = 'int' | 'float' | 'double' | 'string' | 'boolean' | 'enum'

interface EnumItem {
	text: string
	value: string | number | boolean
}

interface DataType {
	type: typeList
	default_value: string
	min?: number
	max?: number
	step?: number
	unit?: string
	elements?: EnumItem[]
}

interface FieldItem {
	name: string
	prop: string
	dataType: DataType
}

interface DialogState {
	visible: boolean
	data: FieldItem
}
