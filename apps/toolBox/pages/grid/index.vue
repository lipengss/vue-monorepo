<template>
	<div class="container">
		<div class="grid">
			<div class="item" v-for="item in list" :key="item.index">
				{{ item.title }}
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const list = computed(() => {
	return Array.from({ length: 40 }).map((item, index) => {
		return {
			index,
			title: `box${index}`,
		};
	});
});
</script>
<style lang="scss" scoped>
.grid {
	display: grid;
	flex-wrap: wrap;
	grid-gap: 10px;
	box-sizing: border-box;
	grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
	grid-auto-rows: 80px;
	.item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--el-color-primary-light-3);
		// &:first-child {
		// 	background-color: red;
		// 	grid-column: 1/5;
		// 	grid-row: 1/ 3;
		// }
		// &:nth-child(2) {
		// 	grid-column: 5/7;
		// 	grid-row: 1/3;
		// }
	}
}
</style>
