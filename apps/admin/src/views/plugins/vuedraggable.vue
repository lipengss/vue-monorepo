<template>
	<draggable :list="myArray" v-bind="options" item-key="id" group="people">
		<template #item="{ element }">
			<div class="item">
				<!-- <menu-outlined class="handle" /> -->
				{{ element.name }}
			</div>
		</template>
	</draggable>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import draggable from 'vuedraggable'
// import { MenuOutlined } from "@ant-design/icons-vue"
const myArray = reactive([
	{ name: '张三', id: 1 },
	{ name: '李四', id: 2 },
	{ name: '王五', id: 3 },
	{ name: '张思', id: 4 },
])

const options = {
	animation: 200,
	// handle: ".handle",
}
</script>
<style lang="scss" scoped>
.item {
	height: 40px;
	line-height: 40px;
	padding-left: 10px;
	background-color: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.125);
	color: #333;
	// cursor: move;
	.handle {
		cursor: move;
		padding: 6px;
	}
}
</style>
