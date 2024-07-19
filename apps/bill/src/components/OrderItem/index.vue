<template>
	<van-swipe-cell>
		<van-cell
			center
			title-class="single-line-ellipsis"
			title-style="flex:2;"
			:to="{
				path: '/details',
				query: { id: props.bill.id },
			}"
			size="large"
		>
			<template #icon>
				<div class="icon-purpose" :style="`--color: ${EXPENSES.get(bill.expenses)?.color}`">
					<svg-icon :name="PURPOSE.get(bill.purpose)?.icon || ''" />
				</div>
			</template>
			<template #title>
				<van-space>
					{{ PURPOSE.get(bill.purpose)?.label }}
					<van-tag round plain :type="EXPENSES.get(bill.expenses)?.type">
						{{ EXPENSES.get(bill.expenses)?.label }}
					</van-tag>
				</van-space>
			</template>
			<template #label> {{ PAY_METHOD.get(bill.payMethod)?.label }} | {{ bill.remarks || '无备注' }} </template>
			<template #value>
				<div>{{ EXPENSES.get(bill.expenses)?.unit }} {{ formatNum(bill.price) }}</div>
				<div v-if="bill.serviceFee" style="font-size: 12px">- {{ bill.serviceFee }}</div>
			</template>
		</van-cell>
		<template #right>
			<van-button square text="删除" type="danger" class="delete-button" @click="billStore.deleteBillOrder(bill.id)" />
		</template>
	</van-swipe-cell>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';
import { PURPOSE, EXPENSES, PAY_METHOD } from '@/assets/data';
import { formatNum } from '@common/utils/src';
import { useBillStore } from '@/stores/bill';

const billStore = useBillStore();

interface Props {
	bill: IOrder;
}

const props = withDefaults(defineProps<Props>(), {});
</script>
