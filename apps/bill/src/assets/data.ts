import type { DropdownItemOption, TagType } from 'vant';

// 收支类型
const EXPENSES: Map<EXPENSE_TYPE, { label: string; type: TagType; unit: string; color: string }> = new Map([
	['income', { label: '收入', type: 'primary', unit: '+', color: '#1989fa' }],
	['pay', { label: '支出', type: 'warning', unit: '-', color: '#ff976a' }],
]);

// 支付方式
const PAY_METHOD = new Map([
	['cash', { label: '现金', icon: 'cash' }],
	['alipay', { label: '支付宝', icon: 'alipay', rate: 0.38 }],
	['meituan', { label: '美团', icon: 'meituan', rate: 8 }],
	['douyin', { label: '抖音', icon: 'douyin', rate: 0 }],
	['wechat', { label: '微信', icon: 'wechat', rate: 0 }],
]);

// 统计类型
const STATISTICS_TYPE = new Map<'purpose' | 'payMethod', { label: string; field: string }>([
	['purpose', { label: '用途分类', field: 'purpose' }],
	['payMethod', { label: '支付平台', field: 'payMethod' }],
]);

// 用途
const PURPOSE = new Map([
	['other', { label: '其他', icon: 'other' }],
	['deposit', { label: '续卡', icon: 'deposit' }],
	['catering', { label: '餐饮', icon: 'catering' }],
	['wages', { label: '工资', icon: 'wages' }],
	['manicure', { label: '美甲', icon: 'manicure' }],
	['eyelash', { label: '睫毛', icon: 'eyelash' }],
	['beauty', { label: '美容', icon: 'beauty' }],
	['product', { label: '产品', icon: 'product' }],
	['liveExpenses', { label: '生活缴费', icon: 'liveExpenses' }],
]);

// 将 Map类型转为数组
function formatMap(map: Map<string, any>): DropdownItemOption[] {
	return Array.from(map).map((item): DropdownItemOption => {
		return {
			text: typeof item[1] === 'object' ? item[1].label : item[1],
			value: item[0],
		};
	});
}

// 分割数据
function splitArrayIntoChunks<T>(arr: T[], chunkSize = 20) {
	const result = [];
	for (let i = 0; i < arr.length; i += chunkSize) {
		result.push(arr.slice(i, i + chunkSize));
	}
	return result;
}

export { EXPENSES, PAY_METHOD, PURPOSE, STATISTICS_TYPE, formatMap, splitArrayIntoChunks };
