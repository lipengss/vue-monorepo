import numeral from "numeral";

function formatNum(num: string | number, format:string = '0.00'):string {
    return numeral(num).format(format);
}

function convertToPercentages(arr: number[]):number[] {
    if (!arr.length) return []; // 如果数组为空，返回空数组
    // 找到数组中的最大值
    const max = Math.max(...arr);
    // 如果最大值为0，则所有值都是0，避免除以0的情况
    if (max === 0) return arr.map(() => 0);
    // 将数组中的其他值转换为百分比
    return arr.map((num) => Math.floor(numeral(num).divide(max).multiply(100).value() || 0));
}

export {
    formatNum,
    convertToPercentages
}