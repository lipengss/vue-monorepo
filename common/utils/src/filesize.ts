import { filesize, type FileSizeReturnArray } from 'filesize';

function getBytes(jsonData: any): number {
	try {
		const jsonString = JSON.stringify(jsonData);
		const blob = new Blob([jsonString], { type: 'application/json' });
		return blob.size;
	} catch (e) {
		return 0;
	}
}

export { getBytes, filesize };
