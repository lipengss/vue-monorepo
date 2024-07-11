<template>
	<div class="banner">
		<div class="flex-bl-bt mb10">
			<DateTag v-model:value="day" show-format="YYYY年MM月" bg-color="transparent" color="#fff" style="padding-left: 6px" />
			<van-icon name="list-switch" color="#fff" size="20" @click="actionSheetRef.open()" />
		</div>
		<div class="banner-bot">
			<div class="balance">
				<div class="title">结余</div>
				<div class="value">￥{{ balance(day) }}</div>
			</div>
			<div class="details">
				<div class="line">
					<div class="title">总收入</div>
					<div class="value">￥{{ incomeTotal(day) }}</div>
				</div>
				<div class="line">
					<div class="title">总支出</div>
					<div class="value">￥{{ payTotal(day) }}</div>
				</div>
				<div class="line">
					<div class="title">总手续费</div>
					<div class="value">￥{{ serviceFeeTotal(day) }}</div>
				</div>
			</div>
		</div>
	</div>
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
	<actionSheet ref="actionSheetRef" />
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useBillStore } from '@/stores/bill';
import { dayjs } from '@common/utils/src';
import { useBill } from '@/hooks/useBill';
import actionSheet from './actionSheet.vue';
import GridItem from '@/components/GridItem/index.vue';
import { _PURPOSE, EXPENSES, formatMap } from '@/assets/data';

const { filter } = storeToRefs(useBillStore());
const { incomeTotal, payTotal, serviceFeeTotal, balance } = useBill();

const day = ref(dayjs().format('YYYY-MM'));
const actionSheetRef = ref();
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
.banner {
	padding: 10px 20px 20px 14px;
	background-color: #1989fa;
	.banner-bot {
		display: grid;
		grid-template-columns: 1fr 140px;
		align-items: center;
		color: #fff;
		.details {
			.line {
				display: grid;
				line-height: 22px;
				font-size: 12px;
				grid-template-columns: 60px 80px;
				.value {
					text-align: right;
				}
			}
		}
		.balance {
			flex: 2;
			.title {
				font-size: 14px;
				padding-left: 8px;
			}
			.value {
				font-size: 30px;
			}
		}
	}
}
</style>
