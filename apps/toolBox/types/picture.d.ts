interface PictureState {
	file: {
		name: string;
		size: number;
		list: UploadUserFile[];
	};
	textarea: string | ArrayBuffrt | null;
	radio: 'base64' | 'binary';
}

interface CropState {
	file: {
		name: string;
		size: number;
		imageSrc: string;
	};
	cropper: {
		aspectRatio: number; // 纵横比
		rotateStep: 10; // 旋转角度步长
		url: string;
		urlList: string[];
		circle: boolean;
	};
	loadingCrop: boolean;
	loadingDown: boolean;
}
