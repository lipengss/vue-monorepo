<template>
	<filterData />
	<van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" v-if="billStore.billList.length">
		<div v-for="item in billStore.formatBillList" :key="item.date" class="card">
			<div class="line">
				<div class="date">{{ dayjs(item.date).format('MM月DD日') }} {{ getDayOfWeek(item.date) }}</div>
				<div class="price">
					<div class="text">入</div>
					<div class="num num1">{{ formatNum(item.totalIncome) }}</div>
					<div class="text">出</div>
					<div class="num num1">{{ formatNum(item.totalPay) }}</div>
					<div class="text">费</div>
					<div class="num">{{ formatNum(item.totalServiceFee) }}</div>
				</div>
			</div>
			<OrderItem v-for="bill in item.list" :bill="bill" />
		</div>
	</van-list>
	<van-empty v-else description="掌握财务，从记账开始。">
		<van-button round block type="primary" class="bottom-button" @click="formRef.onAddOrder()"> 点 亮 财 富 之 旅 </van-button>
	</van-empty>
	<formData ref="formRef" />
	<van-floating-bubble axis="xy" icon="records-o" magnetic="x" v-model:offset="offset" @click="formRef.onAddOrder()" />
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { dayjs, formatNum, getDayOfWeek } from '@common/utils/src';
import formData from './formData.vue';
import filterData from './filterData.vue';
import { useBillStore } from '@/stores/bill';
import OrderItem from '@/components/OrderItem/index.vue';

const billStore = useBillStore();

const formRef = ref();

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
			font-size: 14px;
			font-weight: bold;
		}
		.price {
			display: flex;
			align-items: center;
			.text {
				font-size: 10px;
				padding: 2px 3px;
				border-radius: 2px;
				margin-right: 4px;
				background-color: var(--van-active-color);
				color: var(--van-text-color-2);
			}
			.num {
				font-size: 12px;
			}
			.num1 {
				margin-right: 10px;
			}
		}
	}
	.van-cell {
		padding: 10px 0;
		:deep .van-cell__label {
			font-size: 12px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
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
