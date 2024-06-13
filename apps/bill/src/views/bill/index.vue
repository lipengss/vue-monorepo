<template>
	<van-sticky>
		<van-nav-bar title="明细" placeholder right-text="拷贝" @click-right="actionSheetRef.open()">
			<template #right>
				<van-icon name="list-switch" size="24" />
			</template>
		</van-nav-bar>
		<filterData />
	</van-sticky>
	<van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" v-if="billStore.billList.length">
		<div v-for="item in billStore.formatBillList" :key="item.date" class="card">
			<div class="line">
				<div class="date">{{ dayjs(item.date).format('MM月DD日') }}</div>
				<div class="price">
					<div class="text">出</div>
					<div class="num num1">{{ formatNum(item.totalPay) }}</div>
					<div class="text">入</div>
					<div class="num">{{ formatNum(item.totalIncome) }}</div>
				</div>
			</div>
			<van-swipe-cell v-for="bill in item.list">
				<van-cell
					center
					title-class="single-line-ellipsis"
					title-style="flex:2;"
					:label="bill.remarks"
					:value="formatNum(bill.price)"
					:to="{
						path: '/details',
						query: { id: bill.id },
					}"
					size="large"
				>
					<template #icon>
						<div class="icon-purpose" style="--color: #1989fa">
							<svg-icon :name="_PURPOSE.get(bill.purpose)?.icon || ''" />
						</div>
					</template>
					<template #title>
						<div class="cell-title">
							<van-tag round :type="EXPENSES.get(bill.expenses)?.type">{{ EXPENSES.get(bill.expenses)?.label }}</van-tag>
						</div>
					</template>
				</van-cell>
				<template #right>
					<!--					<van-button square text="修改分类" type="primary" class="delete-button" />-->
					<van-button square text="删除" type="danger" class="delete-button" @click="billStore.deleteBillOrder(bill.id)" />
				</template>
			</van-swipe-cell>
		</div>
	</van-list>
	<van-empty v-else description="掌握财务，从记账开始。">
		<van-button round block type="primary" class="bottom-button" @click="formRef.onAddOrder()"> 点 亮 财 富 之 旅 </van-button>
	</van-empty>
	<formData ref="formRef" />
	<actionSheet ref="actionSheetRef" />
	<van-floating-bubble axis="xy" icon="records-o" magnetic="x" v-model:offset="offset" @click="formRef.onAddOrder()" />
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { dayjs, formatNum } from '@common/utils/src';
import { _PURPOSE, EXPENSES } from '@/assets/data';
import formData from './formData.vue';
import filterData from './filterData.vue';
import actionSheet from './actionSheet.vue';
import { useBillStore } from '@/stores/bill';

const billStore = useBillStore();

const formRef = ref();
const actionSheetRef = ref();

const state = reactive({
	loading: false,
	finished: true,
});
window.innerWidth;
const offset = computed(() => {
	return {
		x: window.innerWidth - (50 + 10),
		y: window.innerHeight - (50 + 60),
	};
});

billStore.init();
</script>
<style scoped lang="scss">
.van-list {
	padding: 10px;
}
.card {
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 6px;
	background-color: var(--van-white);
	.line {
		display: flex;
		justify-content: space-between;
		padding-top: 10px;
		padding-bottom: 10px;
		.date {
			font-weight: bold;
		}
		.price {
			display: flex;
			align-items: center;
			.text {
				font-size: 10px;
				padding: 2px 3px;
				border-radius: 3px;
				margin-right: 6px;
				background-color: var(--van-active-color);
				color: var(--van-text-color-2);
			}
			.num1 {
				margin-right: 20px;
			}
		}
	}
	.van-cell {
		padding: 10px 0;
	}
	.cell-title {
		display: flex;
		align-items: center;
		.van-tag {
			margin-left: 6px;
		}
	}
}
.goods-card {
	margin: 0;
	background-color: #fff;
}

.delete-button {
	height: 100%;
	margin-left: 1px;
}
</style>
