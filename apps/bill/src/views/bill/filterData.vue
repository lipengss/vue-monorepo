<template>
	<van-sticky>
		<van-dropdown-menu ref="menuRef">
			<van-dropdown-item v-model="filter.expenses" :options="expensesList" />
			<van-dropdown-item :title="title" ref="purposeRef">
				<div class="box">
					<GridItem :options="purposeList" v-model:value="filter.purpose" active-color="#1989fa" @change="onChange" />
				</div>
			</van-dropdown-item>
		</van-dropdown-menu>
	</van-sticky>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useBillStore } from '@/stores/bill';
import GridItem from '@/components/GridItem/index.vue';
import { _PURPOSE, EXPENSES, formatMap } from '@/assets/data';

const { filter } = storeToRefs(useBillStore());

const title = ref('全部用途');
const purposeRef = ref();
const expensesList = computed(() => {
	const arr = formatMap(EXPENSES);
	return [{ text: '全部收支', value: 'all' }, ...arr];
});

const purposeList = [{ text: '全部用途', value: 'all' }, ...formatMap(_PURPOSE)];

function onChange(val: string) {
	const item = purposeList.find((n) => n.value === val);
	if (!item) return;
	title.value = item.text;
	purposeRef.value.toggle();
}
</script>

<style scoped lang="scss">
.box {
	padding: 16px;
}
</style>
