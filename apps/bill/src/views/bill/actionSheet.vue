<template>
	<van-action-sheet v-model:show="show" :actions="exoprtList" cancel-text="取消" close-on-click-action @cancel="onCancel" />
	<van-dialog v-model:show="showDialog" title="粘贴文本" show-cancel-button @confirm="onConfirm">
		<van-field v-model="billData" rows="2" :autosize="{ maxHeight: 200, minHeight: 200 }" type="textarea" placeholder="录入账单数据" />
	</van-dialog>
</template>
<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import { showToast } from 'vant';
import { isEqual, dayjs, flatten } from '@common/utils/src';
import { useClipboard, useFile } from '@common/hooks';
import { storeToRefs } from 'pinia';
import { useBillStore } from '@/stores/bill';
import { _PURPOSE, EXPENSES } from '@/assets/data';
const { addBill } = useBillStore();
const { billList, defaultBillItemData, formatBillList } = storeToRefs(useBillStore());

const { copy } = useClipboard();
const { exportFileExcel } = useFile();

const show = ref(false);
const showDialog = ref(false);
const billData = ref();
const type = ref<'export' | 'import'>('export');

const exoprtList = [
	{ name: '拷贝账单', callback: onCopy },
	{ name: '粘贴账单', callback: () => (showDialog.value = true) },
	{ name: '导出表格', callback: exportExcel },
];

// 拷贝
function onCopy() {
	const content = JSON.stringify(billList.value, undefined, 4);
	copy(content);
	showToast('已将账单拷贝到粘贴板！');
}
// 粘贴
function onConfirm() {
	try {
		const json = JSON.parse(billData.value);
		// 判断是否是数组
		if (Array.isArray(json)) {
			for (const item of json) {
				const index = billList.value.findIndex((n) => n.id === item.id);
				if (index !== -1) {
					billList.value.splice(index, 1, item);
				} else {
					addBill(item);
				}
			}
		}
		// 判断是否是对象
		if (Object.prototype.toString.call(json) === '[object Object]') {
			if (isEqual(Object.keys(json), Object.keys(defaultBillItemData.value))) {
				addBill(json);
			}
		}
	} catch (err) {
		showToast('导入的数据格式有误');
	}
}

// 导出表格
function exportExcel() {
	const heads = ['日期', '经过人', '收支', '金额', '用途', '备注'];
	const list = flatten(formatBillList.value.map((n) => n.list)).map((n) => {
		return [
			dayjs(n.date).format('YYYY-MM-DD'),
			n.staff,
			EXPENSES.get(n.expenses)?.label,
			parseFloat(n.price),
			_PURPOSE.get(n.purpose)?.label,
			n.remarks,
		];
	});
	const data = [heads, ...list];

	exportFileExcel(data);
}

function open(t: 'export' | 'import') {
	type.value = t;
	show.value = true;
}

function onCancel() {
	show.value = false;
}

defineExpose({
	open,
});
</script>
<style scoped lang="scss"></style>
