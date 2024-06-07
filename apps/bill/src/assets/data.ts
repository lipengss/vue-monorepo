const EXPENSES = new Map([
	['income', { label: '收入', type: 'primary', color: '#1989fa' }],
	['pay', { label: '支出', type: 'warning', color: '#ff976a' }],
]);

const PAY_METHOD = new Map([
	['WeChat', { label: '微信', icon: 'wechat' }],
	['bankCard', { label: '银行卡', icon: 'bankCard' }],
	['Alipay', { label: '支付宝', icon: 'alipay' }],
	['cash', { label: '现金', icon: 'cash' }],
]);

const PURPOSE = ['其它', '续卡', '柴米油盐', '工资', '美甲产品', '睫毛产品', '美容产品'];

const _PURPOSE = new Map([
	['other', { label: '其他', icon: 'other' }],
	['deposit', { label: '续卡', icon: 'deposit' }],
	['catering', { label: '餐饮', icon: 'catering' }],
	['wages', { label: '工资', icon: 'wages' }],
	['manicure', { label: '美甲', icon: 'manicure' }],
	['eyelash', { label: '睫毛', icon: 'eyelash' }],
	['beauty', { label: '美容', icon: 'beauty' }],
]);

const STAFF = ['娇娇', '大乐', '莎莎', '海燕', '奎奎', '小姨'];

function formatMap(map: Map<string, any>): { label: string; value: string }[] {
	return Array.from(map).map((item) => {
		return {
			label: typeof item[1] === 'object' ? item[1].label : item[1],
			value: item[0],
		};
	});
}

export { EXPENSES, PAY_METHOD, STAFF, PURPOSE, _PURPOSE, formatMap };
