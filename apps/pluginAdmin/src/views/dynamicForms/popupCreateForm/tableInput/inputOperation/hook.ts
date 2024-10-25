import { computed } from 'vue'

export interface IState {
	visible: boolean
	data: Idata
}

// 枚举表格处理
export function useEnumTable(state: IState) {
	function onPush() {
		const data = state.data
		!data.options && (data.options = [])
		data.options.push({ label: '', value: '' })
	}
	function onAdd(index: number) {
		const data = state.data
		!data.options && (data.options = [])
		data.options.splice(index + 1, 0, { label: '', value: '' })
	}
	function onDelete(index: number) {
		state.data.expand.options.splice(index, 1)
	}

	function handleCurrentChange(curOption: Ioption | undefined) {
		if (curOption) {
			state.data.defaultValue = curOption.value
		} else {
			state.data.defaultValue = ''
			delete state.data.defaultValue
		}
	}

	return [onPush, onAdd, onDelete, handleCurrentChange]
}

// 不同表单类型显示对应的配置
export function useComputed(state: IState) {
	function customIncludes(group: string[] | string = []) {
		if (typeof group === 'string') {
			return group === state.data.type
		} else {
			return group.includes(state.data.type)
		}
	}
	return [customIncludes]
}

// 导出方法
export function useExpose(state: IState) {
	function operation(data: Idata) {
		state.visible = true
		state.data = data
	}
	return { operation }
}
