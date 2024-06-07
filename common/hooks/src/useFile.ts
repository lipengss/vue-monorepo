import { saveAs } from 'file-saver';

export function useFile() {
    function exportFile(content: Object) {
        const json = JSON.stringify(content, undefined, 4);
        const blob = new Blob([json], { type: 'json/plain;charset=utf-8' });
        saveAs(blob, `${Date.now()}.txt`);
    }
    return {
        exportFile
    }
}

