<template>
	<van-dialog v-model:show="showDialog" title="粘贴文本" show-cancel-button @confirm="onConfirm">
		<van-field v-model="billData" rows="2" :autosize="{ maxHeight: 200, minHeight: 200 }" type="textarea" placeholder="录入账单数据" />
	</van-dialog>
</template>
<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import { showToast } from 'vant';
import { isEqual } from '@common/utils/src';
import { useClipboard } from '@common/hooks';
import { storeToRefs } from 'pinia';
import { useBillStore } from '@/stores/bill';
import { exportBillDocx } from './exportBillDocx';

const { addBill } = useBillStore();
const { billList, defaultBillItemData } = storeToRefs(useBillStore());

const { copy } = useClipboard();

const showDialog = ref(false);
const billData = ref();

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
function operation(method: string) {
	switch (method) {
		case 'copy':
			onCopy();
			break;
		case 'load':
			showDialog.value = true;
			break;
		default:
			exportBillDocx();
	}
}

defineExpose({
	operation,
});
</script>
<style scoped lang="scss"></style>
