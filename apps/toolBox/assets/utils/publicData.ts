import numeral from 'numeral';

const OFF_WORK = 'OFF_WORK'; // 下班时间卡片的配置字段
const GLOBAL_SETTING = 'GLOBAL_SETTING'; // 全局设置

const aspectRatios = [
	{
		label: '1:1',
		value: 1,
	},
	{
		label: '4:3',
		value: divide(4, 3),
	},
	{
		label: '16:9',
		value: divide(16, 9),
	},
	{
		label: '16:10',
		value: divide(16, 10),
	},
	{
		label: '21:9',
		value: divide(21, 9),
	},
	{
		label: '32:9',
		value: divide(32, 9),
	},
];

const timeStepList = [
	{ label: '一分钟', value: 60000 },
	{ label: '五分钟', value: 300000 },
	{ label: '十分钟', value: 600000 },
	{ label: '半小时', value: 1800000 },
	{ label: '一小时', value: 3600000 },
];

const pictureNotions = '图片不会上传到服务器转换，而是在浏览器中执行。';

const fontList = ['rocks-serif', 'SAIBA-45'];

const tagList = [
	{ label: '浏览器', value: 'browser' },
	{ label: 'AI', value: 'ai' },
	{ label: '热门', value: 'hot' },
	{ label: '应用', value: 'appliance' },
	{ label: '新闻', value: 'news' },
	{ label: '影音', value: 'video' },
	{ label: '科技', value: 'science' },
	{ label: '图片', value: 'picture' },
	{ label: '效率', value: 'efficiency' },
	{ label: '学习', value: 'learning' },
	{ label: '游戏', value: 'game' },
	{ label: '购物', value: 'shopping' },
	{ label: '社交', value: 'socialize' },
	{ label: '阅读', value: 'read' },
	{ label: '出行', value: 'travel' },
	{ label: '金融', value: 'finance' },
	{ label: '其他', value: 'other' },
];

/**
 * 将num1除以num2并返回结果
 * @param {number} num1 - 被除数
 * @param {number} num2 - 除数
 * @returns {number} - 除法结果
 */
function divide(num1: number, num2: number): number {
	if (num2 === 0) {
		throw new Error('Cannot divide by zero');
	}
	return numeral(num1).divide(num2).format('0.1');
}

const appTypeList: Array<RouteItem> = [
	{
		name: '主页',
		path: '/',
		type: '/',
		meta: {
			rank: 0,
			icon: 'menu-home',
		},
	},
	{
		name: '程序员',
		path: '/developer',
		type: 'developer',
		meta: {
			rank: 0,
			icon: 'menu-editor',
		},
	},
	{
		name: '设计师',
		path: '/designer',
		type: 'designer',
		meta: {
			rank: 0,
			icon: 'menu-designer',
		},
	},
	{
		name: '产品',
		path: '/product',
		type: 'product',
		meta: {
			rank: 0,
			icon: 'menu-product',
		},
	},
	{
		name: '工具',
		path: '/tools',
		type: 'onlineTool',
		meta: {
			rank: 0,
			icon: 'menu-tools',
		},
	},
	{
		name: '娱乐',
		path: '/amusement',
		type: 'amusement',
		meta: {
			rank: 0,
			icon: 'menu-amusement',
		},
	},
];



// 预定颜色
const predefineColors = ['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585'];

export { aspectRatios, pictureNotions, predefineColors, OFF_WORK, GLOBAL_SETTING, timeStepList, fontList, tagList, appTypeList };
