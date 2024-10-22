import numeral from 'numeral';

function formatNum(num: string | number, format: string = '0.00'): string {
	return numeral(num).format(format);
}

function convertToPercentages(arr: number[]): number[] {
	if (!arr.length) return []; // 如果数组为空，返回空数组
	// 找到数组中的最大值
	const max = arr.reduce((pre, cur) => pre + cur, 0);
	// 将数组中的其他值转换为百分比
	return arr.map((num) => Math.floor(numeral(num).divide(max).multiply(100).value() || 0));
}

function multiply(num: number | string, rate: number): string | number {
	if (!num) return 0;
	const b = numeral(rate).divide(100).value();
	return numeral(num).multiply(b).format('0.00');
}

function add(num1: number | string, num2: number | string): string {
	return numeral(num1).add(num2).format('0.00');
}

function subtract(num1: number | string, num2: number | string): string {
	return numeral(num1).subtract(num2).format('0.00');
}

export { formatNum, multiply, add, subtract, convertToPercentages, numeral };
