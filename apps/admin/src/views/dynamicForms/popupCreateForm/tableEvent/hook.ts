import { nanoid } from 'nanoid'
import { Ievent } from '@/types/IMode'

export function useTableEvent(datas: Ievent[]) {
	function onPushRow() {
		datas.push(TempData())
	}
	function onAdd(row: Ievent) {
		const index = datas.findIndex((item) => item.id === row.id)
		if (index !== -1) {
			datas.splice(index + 1, 0, TempData())
		}
	}
	function onDelete(row: Ievent) {
		const index = datas.findIndex((item) => item.id === row.id)
		if (index !== -1) {
			datas.splice(index, 1)
		}
	}

	return [onPushRow, onAdd, onDelete]
}

export function TempData(): Ievent {
	const id = nanoid()
	return {
		name: '',
		relation: {
			from: '',
			to: [],
		},
		action: '',
		id: id,
	}
}
