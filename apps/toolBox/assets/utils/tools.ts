/**
 * 格式化文件大小
 * @param size 文件大小，单位为字节
 * @returns 格式化后的文件大小
 */
function formatFileSize(size: number): string {
	if (size <= 0) return '0B'; // 确保返回的值是合法的

	const KB = 1024;
	const MB = KB * KB;
	const GB = MB * KB;
	const TB = GB * KB;

	if (size < KB) return `${size}B`;
	if (size < MB) return `${(size / KB).toFixed(2)}KB`;
	if (size < GB) return `${(size / MB).toFixed(2)}MB`;
	if (size < TB) return `${(size / GB).toFixed(2)}GB`;
	return `${(size / TB).toFixed(2)}TB`;
}

/**
 * 将嵌套数组展开为一维数组
 * @param arr 嵌套数组
 * @returns 展开后的一维数组
 */
function flattenArray(arr: any[]): any[] {
	const result: any[] = [];
	function flattenHelper(array: any[]) {
		for (const item of array) {
			result.push(item);
			if (Array.isArray(item.children) && item.children.length > 0) {
				flattenHelper(item.children);
			}
		}
	}
	flattenHelper(arr);
	return result;
}

function getRandomNumber(maxValue: number) {
	return Math.floor(Math.random() * (maxValue + 1));
}

export { formatFileSize, flattenArray, getRandomNumber };
