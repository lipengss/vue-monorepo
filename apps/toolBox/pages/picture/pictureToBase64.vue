<template>
	<div class="container">
		<TwoColumnLayout>
			<el-alert type="warning" :title="pictureNotions" :closable="false" class="mb10" />
			<el-card header="图片 转 base64">
				<el-tooltip v-if="state.textarea" effect="dark" content="点击放大" placement="bottom">
					<el-image class="preview-image" :src="state.textarea" fit="cover" :preview-src-list="[state.textarea]" />
				</el-tooltip>
				<el-upload v-else :show-file-list="false" drag :http-request="htttpRequest">
					<el-icon class="el-icon--upload"><upload-filled /></el-icon>
					<div class="el-upload__text">拖住到这里 或 <em>点击上传照片</em></div>
				</el-upload>
				<div class="flex-between pt10 pb10">
					<el-space>
						<el-input v-model="state.file.name" readonly placeholder="文件名" />
						<el-tag v-if="state.file.size" type="primary" round>{{ formatFileSize(state.file.size) }}</el-tag>
					</el-space>
					<el-space>
						<el-button :icon="Delete" type="danger" @click="onClearAll">清空所有</el-button>
					</el-space>
				</div>
				<el-input
					v-model="state.textarea"
					:rows="10"
					:autosize="{ minRows: 10, maxRows: 10 }"
					resize="none"
					placeholder="转换后的base64字符串"
					type="textarea"
				/>
				<div class="flex-end pt10 pb10">
					<el-radio-group v-model="state.radio" class="mr10">
						<el-radio label="base64">base64</el-radio>
					</el-radio-group>
					<el-button type="primary" :icon="DocumentCopy" @click="onCopy">复制字符串</el-button>
				</div>
			</el-card>
		</TwoColumnLayout>
	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { UploadFilled, Delete, DocumentCopy } from '@element-plus/icons-vue';
import { type UploadRequestOptions } from 'element-plus';
import { formatFileSize } from '~/assets/utils/tools';
import { useCopy } from '~/hooks/useCopy';
import { pictureNotions } from '~/assets/utils/publicData';

definePageMeta({
	title: '图片转base64',
	rank: 280,
});

const state: PictureState = reactive({
	file: {
		name: '',
		size: 0,
		list: [],
	},
	textarea: '',
	radio: 'base64',
});

const { onCopy } = useCopy(toRef(state, 'textarea'));

function htttpRequest(options: UploadRequestOptions): XMLHttpRequest | Promise<unknown> {
	const { name, size } = options.file;
	state.file.name = name;
	state.file.size = size;
	const reader = new FileReader();
	reader.readAsDataURL(options.file);
	reader.onload = (event) => {
		if (event.target === null) return;
		state.textarea = event.target.result;
		state.file.list = [state.textarea];
	};
	return Promise.resolve(true);
}

function onClearAll() {
	state.textarea = '';
	state.file.name = '';
	state.file.size = 0;
	state.file.list = [];
}
</script>
<style lang="scss" scoped>
.preview-image {
	width: 100%;
	height: 184px;
	border-radius: 6px;
	display: block;
}
</style>
