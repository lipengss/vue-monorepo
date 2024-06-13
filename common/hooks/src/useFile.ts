import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { dayjs } from '@common/utils/src';

export function useFile() {
	function exportFileTxt(content: Object) {
		const json = JSON.stringify(content, undefined, 4);
		const blob = new Blob([json], { type: 'json/plain;charset=utf-8' });
		saveAs(blob, `${Date.now()}.txt`);
	}
	function exportFileExcel(data: any[]) {
		// 将数据转换为工作表
		const worksheet = XLSX.utils.aoa_to_sheet(data);
		// 定义货币格式样式
		const currencyFormat = '￥#,##0.00';
		const leftAlignStyle = { alignment: { horizontal: 'left' } };

		// 遍历数据范围，并设置第二列（价格列）的单元格格式
		const range = XLSX.utils.decode_range(worksheet['!ref'] || '');
		for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) {
			const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: 3 });
			if (!worksheet[cellAddress]) continue; // 跳过空单元格
			worksheet[cellAddress].z = currencyFormat;
			worksheet[cellAddress].s = leftAlignStyle;
		}
		// 设置列宽（单位是字符宽度）
		worksheet['!cols'] = [{ wch: 15 }, { wch: 6 }, { wch: 5 }, { wch: 10 }, { wch: 5 }, { wch: 30 }];
		// 创建一个新的工作簿
		const workbook = XLSX.utils.book_new();
		// 将工作表添加到工作簿
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
		// 将工作簿导出为二进制数据
		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

		// 创建一个Blob对象表示Excel文件的内容
		const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

		// 使用file-saver保存文件
		saveAs(blob, `${dayjs().format('YYYY年MM月DD日 HH时mm分ss秒')}.xlsx`);
	}
	return {
		exportFileTxt,
		exportFileExcel,
	};
}
