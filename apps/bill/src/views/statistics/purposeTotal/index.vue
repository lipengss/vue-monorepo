<template>
	<van-nav-bar left-text="返回" left-arrow @click-left="router.back()" :title="dayjs(date).format('M月') + '续卡'" />
	<div class="container mb10">
		<div class="text">{{ dayjs(date).format('M月') }}{{ query.title }}{{ query.expenses === 'income' ? '共收入' : '共支出' }}</div>
		<div class="total"><small>￥</small>{{ formatNum(total) }}</div>
	</div>
	<van-cell
		v-for="item in allOrderList"
		:value="'￥' + formatNum(item.price)"
		:label="item.remarks"
		center
		:to="{
			path: '/details',
			query: { id: item.id },
		}"
	>
		<template #icon>
			<div class="icon-purpose" :style="{ '--color': EXPENSES.get(item.expenses)?.color }">
				<svg-icon :name="_PURPOSE.get(item.purpose)?.icon || ''" />
			</div>
		</template>
		<template #title>
			{{ _PURPOSE.get(item.purpose)?.label }}
		</template>
	</van-cell>
</template>
<script setup lang="ts">
import { computed, ref, onActivated } from 'vue';
import { storeToRefs } from 'pinia';
import { useBillStore } from '@/stores/bill';
import { useRoute, useRouter, type LocationQuery } from 'vue-router';
import { flatten, dayjs, formatNum } from '@common/utils';
import { _PURPOSE, EXPENSES } from '@/assets/data';

const route = useRoute();
const router = useRouter();

const { billList } = storeToRefs(useBillStore());

const total = ref(0);
const date = ref('');

function initData() {
	if (typeof route.query.total === 'string') {
		total.value = parseFloat(route.query.total);
	}
	if (typeof route.query.date === 'string') {
		date.value = route.query.date;
	}
}

const query = computed<LocationQuery>(() => route.query);

// 过滤日期相同的数据 并返回当前类型的消费订单
const allOrderList = computed(() =>
	flatten(
		billList.value.filter((n) => {
			return dayjs(date.value).isSame(n.date, 'month');
		})
	).filter((n) => n.expenses === query.value.expenses && n.purpose === query.value.key)
);

onActivated(() => {
	initData();
});
</script>
<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 30px 0 20px;
	.text {
		color: var(--van-gray-6);
		line-height: 40px;
	}
	.total {
		font-size: 40px;
	}
}
</style>
