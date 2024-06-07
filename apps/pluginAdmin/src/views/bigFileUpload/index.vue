<template>
	<div>
		<el-upload
			class="upload-demo"
			v-model:file-list="fileList"
			accept="image/png,image/jpeg"
			drag
			action="#"
			:limit="1"
			list-type="text"
			:http-request="httpRequest"
			multiple
		>
			<el-icon class="el-icon--upload"><upload-filled /></el-icon>
			<div class="el-upload__text">拖拽文件到这里或者<em>点击上传</em></div>
			<template #tip>
				<div class="el-upload__tip">文件大小需小于500kb</div>
			</template>
		</el-upload>
		<el-progress :percentage="setup" />
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, UploadRequestOptions, ElUpload, ElProgress, ElIcon } from 'element-plus'
import { uploadFile } from '@/api/common'

const fileList = ref([])

const CHUNK_SIZE = 64 * 1024

let uploadSize = 0

const setup = ref(0)

async function httpRequest(options: UploadRequestOptions) {
	const { file } = options
	const { name, type, size } = file
	const fileName = new Date().getTime() + '_' + name
	while (uploadSize < size) {
		const fielChunk = file.slice(uploadSize, uploadSize + CHUNK_SIZE)
		const formData = createFormData({ name, type, size, fileName, uploadSize, fielChunk })
		try {
			const uploadResult = await uploadFile(formData)
		} catch (err: Error) {
			ElMessage.error(err.message)
			return
		}
		uploadSize += fielChunk.size
		setup.value = (uploadSize / size) * 100
	}
}

function createFormData({ name, type, size, fileName, uploadSize, fielChunk }: any) {
	const fd = new FormData()
	fd.append('name', name)
	fd.append('type', type)
	fd.append('size', size)
	fd.append('filename', fileName)
	fd.append('uploadSize', uploadSize)
	fd.append('file', fielChunk)

	return fd
}
</script>
<style lang="scss" scoped></style>
