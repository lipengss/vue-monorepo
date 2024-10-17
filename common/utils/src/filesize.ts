import { filesize, type FileSizeReturnArray } from 'filesize';

function getBytes(jsonData: Array<IOrder>): number {
	try {
		const jsonString = jsonData.length ? JSON.stringify(jsonData) : '';
		const blob = new Blob([jsonString], { type: 'application/json' });
		return blob.size;
	} catch (e) {
		return 0;
	}
}

export { getBytes, filesize };
