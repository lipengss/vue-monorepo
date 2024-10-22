import { Ref, ComputedRef } from 'vue'
import { Idata, Ievent } from '@/types/IModel'
import { cloneDeep } from 'lodash'
import type { FormInstance } from 'element-plus'

export function useFormEvent(formRef: Ref<FormInstance | undefined>) {
	function onBtnFunction(fun_type: string) {
		switch (fun_type) {
			case 'submitForm':
				submitData()
				break
			case 'resetForm':
				resetForm()
				break
			default:
				break
		}
	}
	return [onBtnFunction]
	function submitData() {
		if (!formRef.value) return
		formRef.value.validate((valid: boolean) => {
			if (!valid) return
		})
	}
	function resetForm() {
		if (!formRef.value) return
		formRef.value.resetFields()
	}
}

export function useWatchFun() {
	function setDeepVal(inputDatas: Idata[], data: any) {
		inputDatas.forEach((item) => {
			if (Object.prototype.hasOwnProperty.call(item, 'defaultValue')) {
				if (typeof item.defaultValue === 'object') {
					data[item.field] = cloneDeep(item.defaultValue)
				} else if (['string', 'number', 'boolean'].includes(typeof item.defaultValue)) {
					data[item.field] = item.defaultValue
				}
			}
			if (item.children && Array.isArray(item.children)) {
				setDeepVal(item.children, data[item.field])
			}
		})
	}
	return {
		setDeepVal,
	}
}

export function onChangeEvent(events: ComputedRef<Ievent[] | undefined>, inputDatas: Idata[], data: any) {
	function onRadio(val: string, field: string) {
		if (events.value === undefined && !Array.isArray(events.value)) return
		events.value.forEach((event: Ievent) => {
			if (event.relation.from[0] === field) {
				const actions = useActions()
				actions[event.action] && actions[event.action](event)
			}
		})
		// console.log('radio', val)
		// console.log(events.value)
	}

	return {
		onRadio,
	}
	function useActions(): { isShow: Function; disabled: Function; [key: string]: Function } {
		function isShow(event: Ievent) {
			const state = {}
			const from = data[event.relation.from[0]]
			// event.relation.to.forEach((group) => {
			// 	console.log(group)
			// 	group.forEach(field => {

			// 	});
			// })
			console.log(event)
		}
		function disabled() {
			console.log('我被执行了：disabled')
		}
		return { isShow, disabled }
	}
}
