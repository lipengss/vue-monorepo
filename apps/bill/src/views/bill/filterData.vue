<template>
	<van-sticky>
		<div class="banner">
			<div class="flex-bl-bt mb10">
				<DatePicker v-model:value="filter.month" show-format="YYYY年MM月" bg-color="transparent" color="#fff" />
				<van-space>
					<van-tag type="primary" size="large" @click="dataSourceRef.operation('copy')">复制</van-tag>
					<van-tag type="success" size="large" @click="dataSourceRef.operation('load')">粘贴</van-tag>
					<van-tag type="warning" size="large" @click="dataSourceRef.operation('export')">导出</van-tag>
				</van-space>
			</div>
			<div class="banner-bot">
				<div class="balance">
					<div class="title">结余</div>
					<div class="value">￥{{ balance(filter.month) }}</div>
				</div>
				<div class="details">
					<div class="line">
						<div class="title">总收入</div>
						<div class="value">+ {{ incomeTotal(filter.month) }}</div>
					</div>
					<div class="line">
						<div class="title">总支出</div>
						<div class="value">- {{ payTotal(filter.month) }}</div>
					</div>
					<div class="line">
						<div class="title">总手续费</div>
						<div class="value">- {{ serviceFeeTotal(filter.month) }}</div>
					</div>
				</div>
			</div>
			<van-space>
				<CheckBoxTag
					:options="formatMap(EXPENSES)"
					v-model:value="filter.expenses"
					bg-color="transparent"
					color="#fff"
					active-color="rgba(255,255,255,.2)"
				/>
			</van-space>
		</div>
	</van-sticky>
	<dataSource ref="dataSourceRef" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useBillStore } from '@/stores/bill';
import { useBill } from '@/hooks/useBill';
import dataSource from './dataSource.vue';
import { EXPENSES, formatMap } from '@/assets/data';

const { filter } = storeToRefs(useBillStore());
const { incomeTotal, payTotal, serviceFeeTotal, balance } = useBill();

const dataSourceRef = ref();
</script>

<style scoped lang="scss">
.box {
	padding: 16px;
}
.banner {
	padding: 10px;
	background-image: url('../../assets/banner.svg');
	background-size: cover;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.banner-bot {
		display: grid;
		grid-template-columns: 1fr 140px;
		align-items: center;
		color: #fff;
		.details {
			.line {
				display: grid;
				line-height: 22px;
				font-size: 14px;
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
