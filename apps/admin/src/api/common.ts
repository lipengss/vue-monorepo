import request from './request'

export function uploadFile(data: any) {
	return request({
		url: '/upload_video',
		method: 'post',
		baseURL: '/upload',
		data,
	})
}
