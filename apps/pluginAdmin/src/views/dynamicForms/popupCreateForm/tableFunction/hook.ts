import { nanoid } from 'nanoid'
import { Ifunction } from '@/types/IModel'

export function useTableEvent(datas: Ifunction[]) {
	function onPushRow() {
		datas.push(TempData())
	}
	function onAdd(row: Ifunction) {
		const index = datas.findIndex((item) => item.id === row.id)
		if (index !== -1) {
			datas.splice(index + 1, 0, TempData())
		}
	}
	function onDelete(row: Ifunction) {
		const index = datas.findIndex((item) => item.id === row.id)
		if (index !== -1) {
			datas.splice(index, 1)
		}
	}

	return [onPushRow, onAdd, onDelete]
}

export function TempData(): Ifunction {
	const id = nanoid()
	return {
		name: '',
		type: '',
		icon: '',
		fun_type: 'submitForm',
		id: id,
	}
}
