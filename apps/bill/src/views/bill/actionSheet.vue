<template>
	<van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" close-on-click-action @cancel="onCancel" />
	<van-dialog v-model:show="showDialog" title="粘贴文本" show-cancel-button @confirm="onConfirm">
		<van-field v-model="billData" rows="2" :autosize="{ maxHeight: 200, minHeight: 200 }" type="textarea" placeholder="录入账单数据" />
	</van-dialog>
</template>
<script setup lang="ts">
import { ref, defineExpose, computed } from 'vue';

import { showToast } from 'vant';
import { isEqual } from '@common/utils/src';
import { useClipboard, useFile } from "@common/hooks";
import { storeToRefs } from 'pinia';
import { useBillStore } from '@/stores/bill';

const { addBill } = useBillStore();
const { billList, defaultBillItemData } = storeToRefs(useBillStore());

const { copy } = useClipboard()
const { exportFile  } = useFile()

const show = ref(false);
const showDialog = ref(false);
const billData = ref();
const type = ref<'export' | 'import'>('export');

const exoprtList = [
	{ name: '拷贝账单', subname: '推荐', color: '#1989fa', callback: onCopy },
	{ name: '下载账单', subname: '须在浏览器下载', callback: () => exportFile(billList.value) },
];
const importList = [
	{
		name: '粘贴账单',
		callback: () => {
			showDialog.value = true;
		},
	},
	{ name: '上传账单' },
];

const actions = computed(() => {
	return type.value === 'export' ? exoprtList : importList;
});

// 拷贝
function onCopy() {
  const content = JSON.stringify(billList.value, undefined, 4);
  copy(content)
	// showToast('已将内容拷贝到粘贴板！');
}

function onConfirm() {
	try {
		const json = JSON.parse(billData.value);
		// 判断是否是数组
		if (Array.isArray(json)) {
			for (const item of json) {
				const index = billList.value.findIndex((n) => n.id === item.id);
				if (index !== -1) {
					billList.value.splice(index, 1, item);
					// await showConfirmDialog({
					// 	title: '标题',
					// 	message: '监测到有重复的数据是否要替换',
					// })
					// 	.then(() => {
					// 		billList.value.splice(index, 1, item);
					// 	})
					// 	.catch(() => {
					// 		// on cancel
					// 	});
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
