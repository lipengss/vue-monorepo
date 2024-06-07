<template>
	<van-nav-bar left-text="返回" title="详情" left-arrow @click-left="router.back()" />
	<div class="container">
		<div class="content">
			<div class="icon-line">
				<div class="icon-purpose" style="--color: #1989fa">
					<svg-icon :name="_PURPOSE.get(currentBill.purpose)?.icon || ''" />
				</div>
				{{ _PURPOSE.get(currentBill.purpose)?.label }}
			</div>
			<div class="line-price">
				{{ formatNum(currentBill.price) }}
			</div>
			<div class="line">
				<div class="title">类型</div>
				<div class="value">
					<van-tag :type="EXPENSES.get(currentBill.expenses)?.type">{{ EXPENSES.get(currentBill.expenses)?.label }}</van-tag>
				</div>
			</div>
			<div class="line">
				<div class="title">经过人</div>
				<div class="value">
					{{ currentBill.staff }}
				</div>
			</div>
			<div class="line">
				<div class="title">记录时间</div>
				<div class="value">
					{{ currentBill.date }}
				</div>
			</div>
			<div class="line">
				<div class="title">备注</div>
				<div class="value">
					{{ currentBill.remarks || '无' }}
				</div>
			</div>
			<div class="line btns">
				<van-button type="danger" icon="delete-o" block plain round class="btn1" @click="billStore.deleteBillOrder(currentBill.id, true)">
					删除
				</van-button>
				<van-button type="primary" icon="edit" block plain round @click="formRef.onEditOrder(currentBill)">编辑</van-button>
			</div>
		</div>
	</div>
	<formData ref="formRef" @pull="setData" />
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated } from 'vue';
import { EXPENSES, _PURPOSE } from '@/assets/data';
import { useBillStore } from '@/stores/bill';
import { useRouter, useRoute } from 'vue-router';
import { formatNum } from '@/utils/tools';
import formData from '../formData.vue';
import { cloneDeep } from 'lodash-es';
const billStore = useBillStore();
const router = useRouter();

const route = useRoute();
const formRef = ref();
const currentBill = ref({});

function setData() {
	const { id }: LocationQuery = route.query;
	const curItem = billStore.billList.filter((n) => n.id === id);
	if (curItem.length) {
		currentBill.value = cloneDeep(curItem[0]);
	}
}

onActivated(() => {
	setData();
});
</script>

<style scoped lang="scss">
.container {
	padding: 10px;
	.content {
		padding: 30px 16px 0 16px;
		border-radius: 10px;
		background-color: var(--van-white);
		.icon-line {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 20px;
		}
		.line-price {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.line {
			display: flex;
			align-items: center;
			line-height: 30px;
			font-size: 14px;
			.title {
				min-width: 90px;
				color: var(--van-cell-label-color);
			}
			.btn1 {
				margin-right: 20px;
			}
		}
		.btns {
			margin-top: 20px;
			padding-bottom: 20px;
		}
	}
}
</style>
