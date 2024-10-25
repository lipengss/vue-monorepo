import { Ref } from 'vue'
import { nanoid } from 'nanoid'
import { ENUM_TYPE } from '@/utils/common'

export function useInputEvent() {
	function onTypeChange(type: any, row: Idata): void {
		row.defaultValue = type === 'object' ? {} : ''
	}

	function onRequiredChange(value: any, row: Idata): void {
		const msg: string = ['select', 'checkbox'].includes(row.type) ? '请选择' : '请输入' + row.label
		if (value) {
			row.rules = { message: msg, required: value }
		} else {
			delete row.rules
		}
	}
	return [onTypeChange, onRequiredChange]
}

export function useTableTree(datas: Idata[], delOrAdd: Ref<string>) {
	// 添加相邻
	function onAddRow(command: string, row: Idata) {
		//添加相邻
		if (command === 'adjoin') {
			delOrAdd.value = 'add'
			const temp = TempData()
			temp.parent = `${row.parent}|${temp.id}`
			const parents = row.parent.split('|')
			if (parents.length === 1) {
				const index = datas.findIndex((n) => n.id === row.id)
				datas.splice(index + 1, 0, temp)
			} else {
				const popId = parents.pop()
				popId && deepPush(parents, popId, datas)
			}
		} else {
			const temp = TempData()
			temp.parent = `${row.parent}|${temp.id}`
			if (row.children && Array.isArray(row.children)) {
				row.children.push(temp)
			} else {
				row.children = []
				row.children.push(temp)
			}
		}
	}
	// 追加顶层
	function onPushRow() {
		const temp = TempData()
		temp.parent = temp.id
		datas.push(temp)
	}
	// 删除
	function onDeleteRow(row: Idata) {
		delOrAdd.value = 'delete'
		const parents = row.parent.split('|')
		if (parents.length === 1) {
			const index = datas.findIndex((item) => item.id === parents[0])
			if (index !== -1) datas.splice(index, 1)
		} else {
			const popId = parents.pop()
			popId && deepDelete(parents, popId, datas)
		}
	}
	return [onAddRow, onPushRow, onDeleteRow]
	// tool
	function deepDelete(parents: string[], popId: string, datas: Idata[]) {
		parents.forEach((id) => {
			const cur = datas.find((item) => item.id === id)
			if (cur && Array.isArray(cur.children)) {
				const index = cur.children.findIndex((item) => item.id === popId)
				if (index !== -1) {
					cur.children.splice(index, 1)
				} else {
					parents.unshift()
					deepDelete(parents, popId, cur.children)
				}
			}
		})
	}
	function deepPush(parents: string[], popId: string, datas: Idata[]) {
		parents.forEach((id) => {
			const cur = datas.find((item) => item.id === id)
			if (cur && Array.isArray(cur.children)) {
				const index = cur.children.findIndex((item) => item.id === popId)
				if (index !== -1) {
					const temp = TempData()
					temp.parent = `${cur.parent}|${temp.id}`
					cur.children.splice(index + 1, 0, temp)
				} else {
					parents.unshift()
					deepPush(parents, popId, cur.children)
				}
			}
		})
	}
}

function TempData(): Idata {
	const id = nanoid()
	return {
		label: '',
		field: '',
		type: ENUM_TYPE.input,
		id: id,
		parent: '',
		show: true,
		expand: {
			clearable: true,
		},
		required: false,
	}
}
