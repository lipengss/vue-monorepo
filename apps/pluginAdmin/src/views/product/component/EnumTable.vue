<template>
	<el-table border :data="props.elements" class="mb10 draggable" row-key="id">
		<el-table-column label="枚举文本" prop="label" align="center">
			<template #default="{ row }">
				<el-input v-model="row.text" placeholder="输入枚举文本" />
			</template>
		</el-table-column>
		<el-table-column label="枚举值" prop="value" align="center">
			<template #default="{ row }">
				<el-input v-model="row.value" placeholder="输入枚举值" />
			</template>
		</el-table-column>
		<el-table-column label="操作" align="center" width="100">
			<template #default="{ row, index }">
				<el-button circle :icon="Rank" size="small" type="primary" />
				<el-button circle :icon="Close" size="small" type="danger" @click="onDelete(index)" />
			</template>
		</el-table-column>
	</el-table>
	<el-button size="small" class="w100" @click="onPush"> 添 加 选 项 </el-button>
</template>
<script setup lang="ts">
import { defineProps, withDefaults, reactive, onMounted } from 'vue'
import { default as Sortable, SortableEvent } from 'sortablejs'
import { nanoid } from 'nanoid'
import { Close, Rank } from '@element-plus/icons-vue'

interface Props {
	elements: { label: string; value: string; id: string }[]
}

const props = withDefaults(defineProps<Props>(), {})

function onPush() {
	props.elements.push({
		label: '',
		value: '',
		id: nanoid(),
	})
}

// 行拖拽
const rowDrag = function () {
	// 要拖拽元素的父容器
	const tbody = document.querySelector('.draggable .el-table__body-wrapper tbody')
	if (!tbody) return
	Sortable.create(tbody as HTMLElement, {
		//  可被拖拽的子元素
		draggable: '.draggable .el-table__row',
		onEnd(event: SortableEvent) {
			if (event.oldIndex !== undefined && event.newIndex !== undefined) {
				const currRow = props.elements.splice(event.oldIndex, 1)[0]
				props.elements.splice(event.newIndex, 0, currRow)
			}
		},
	})
}

function onDelete(index: number) {
	props.elements.splice(index, 1)
}

onMounted(() => {
	rowDrag()
})

//
// const state = reactive({
//   dataList: []
// })
</script>

<style scoped lang="scss"></style>
