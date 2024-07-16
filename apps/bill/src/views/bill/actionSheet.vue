<template>
	<van-action-sheet v-model:show="show" :actions="exoprtList" cancel-text="取消" close-on-click-action @cancel="onCancel" />
	<van-dialog v-model:show="showDialog" title="粘贴文本" show-cancel-button @confirm="onConfirm">
		<van-field v-model="billData" rows="2" :autosize="{ maxHeight: 200, minHeight: 200 }" type="textarea" placeholder="录入账单数据" />
	</van-dialog>
</template>
<script setup lang="ts">
import { ref, defineExpose, withDefaults, defineProps } from 'vue';
import { showToast } from 'vant';
import { isEqual, dayjs, flatten } from '@common/utils/src';
import { useClipboard, useFile, saveAs } from '@common/hooks';
import {
	Document,
	Packer,
	TextRun,
	Paragraph,
	Table,
	TableCell,
	TableRow,
	WidthType,
	HeightRule,
	VerticalAlign,
	AlignmentType,
	PageOrientation,
	convertInchesToTwip,
} from '@common/hooks/node_modules/docx';
import { storeToRefs } from 'pinia';
import { useBillStore } from '@/stores/bill';
import { PURPOSE, EXPENSES, PAY_METHOD } from '@/assets/data';
import { useBill } from '@/hooks/useBill';

const { addBill } = useBillStore();
const { billList, defaultBillItemData, formatBillList, filter } = storeToRefs(useBillStore());
const { incomeTotal, payTotal, serviceFeeTotal, balance } = useBill();

const { copy } = useClipboard();
const { exportFileExcel } = useFile();

const show = ref(false);
const showDialog = ref(false);
const billData = ref();
const type = ref<'export' | 'import'>('export');

const exoprtList = [
	{ name: '复制账单', callback: onCopy },
	{ name: '导入账单', callback: () => (showDialog.value = true) },
	{ name: '导出表格', callback: exportExcel, subname: '只支持在浏览器端下载' },
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

const expenses: any = {
	all: {
		text: '收支明细',
		total: () =>
			`收入共计 ${incomeTotal(filter.value.month)} 元；支出共计 ${payTotal(filter.value.month)} 元；手续费共计 ${serviceFeeTotal(filter.value.month)} 元`,
	},
	pay: {
		text: '支出明细',
		total: () => `支出共计 ${payTotal(filter.value.month)} 元；手续费共计 ${serviceFeeTotal(filter.value.month)} 元`,
	},
	income: {
		text: '收入明细',
		total: () => `收入共计 ${incomeTotal(filter.value.month)} 元；手续费共计 ${serviceFeeTotal(filter.value.month)} 元`,
	},
};

// 导出表格
async function exportExcel() {
	const heads = ['日期', '收支类型', '金额', '支付方式', '手续费', '用途', '备注'];
	function tableCell(value: string) {
		return new TableCell({
			children: [
				new Paragraph({
					children: [
						new TextRun({
							text: value,
							size: 18,
						}),
					],
				}),
			],
			verticalAlign: VerticalAlign.CENTER,
			margins: {
				left: 100,
			},
		});
	}
	const table = new Table({
		rows: [
			new TableRow({
				tableHeader: true,
				children: heads.map((n) => {
					return new TableCell({
						children: [
							new Paragraph({
								children: [
									new TextRun({
										text: n,
										size: 20,
									}),
								],
							}),
						],
						verticalAlign: VerticalAlign.CENTER,
						margins: {
							left: 100,
						},
					});
				}),
				height: {
					value: 340,
					rule: HeightRule.EXACT,
				},
			}),
			...flatten(formatBillList.value.map((n) => n.list)).map((n, index) => {
				return new TableRow({
					children: [
						tableCell(dayjs(n.date).format('YYYY-MM-DD')),
						tableCell(EXPENSES.get(n.expenses)?.label || ''),
						tableCell(`￥${n.price}`),
						tableCell(PAY_METHOD.get(n.payMethod)?.label || ''),
						tableCell(`${n.serviceFee}`),
						tableCell(PURPOSE.get(n.purpose)?.label || ''),
						tableCell(n.remarks),
					],
					height: {
						value: 280,
						rule: HeightRule.EXACT,
					},
				});
			}),
		],
		width: {
			size: 100,
			type: WidthType.PERCENTAGE,
		},
	});

	const doc = new Document({
		sections: [
			{
				children: [
					new Paragraph({
						heading: 'Heading1',
						alignment: AlignmentType.CENTER, // 设置标题居中
						spacing: {
							after: convertInchesToTwip(0.1), // 设置标题下边距为0.2英寸
						},
						children: [
							new TextRun({
								text: `纤指妆容 ${dayjs(filter.value.month).format('YYYY年MM月')} ${expenses[filter.value.expenses].text}`,
								size: 32,
								color: '#333333',
							}),
						],
					}),
					table,
					new Paragraph({
						spacing: {
							before: convertInchesToTwip(0.1),
						},
						children: [
							new TextRun({
								text: `${expenses[filter.value.expenses].total()}`,
								size: 26,
								color: '#333333',
							}),
						],
					}),
				],
				properties: {
					page: {
						size: {
							orientation: PageOrientation.LANDSCAPE, // 纸张方向改为横向
						},
						margin: {
							top: convertInchesToTwip(0.4), // 顶部边距 1 英寸
							right: convertInchesToTwip(0.4), // 右侧边距 1 英寸
							bottom: convertInchesToTwip(0.4), // 底部边距 1 英寸
							left: convertInchesToTwip(0.4), // 左侧边距 1 英寸
						},
					},
				},
			},
		],
	});

	const base64string = await Packer.toBase64String(doc);
	const binaryString = atob(base64string);
	const buffer = new Uint8Array(binaryString.length).map((item, index) => binaryString.charCodeAt(index));
	const blob = new Blob([buffer], { type: 'application/octet-stream' });

	// 使用file-saver保存文件
	saveAs(blob, `纤指妆容 ${dayjs(filter.value.month).format('YYYY年MM月')} ${expenses[filter.value.expenses].text}.doc`);
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
