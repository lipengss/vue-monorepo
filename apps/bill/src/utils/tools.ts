import numeral from 'numeral';

function formatNum(num: string | number) {
	return numeral(num).format('0.00');
}

function convertToPercentages(arr: number[]) {
	if (arr.length === 0) return []; // 如果数组为空，返回空数组

	// 找到数组中的最大值
	const max = Math.max(...arr);

	// 如果最大值为0，则所有值都是0，避免除以0的情况
	if (max === 0) return arr.map(() => 0);

	// 将数组中的其他值转换为百分比

	return arr.map((num) => Math.floor(numeral(num).divide(max).multiply(100).value() || 0));
}

// console.log(numeral(35).round());

export { formatNum, convertToPercentages };
