<template>
	<splitpanes class="default-theme video-container">
		<pane class="video-setting" :min-size="34">
			<el-form label-position="top">
				<el-form-item prop="title">
					<el-radio-group v-model="optionForm.show" size="large">
						<el-radio-button label="cover">封面</el-radio-button>
						<el-radio-button label="main">主界面</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="歌曲名称" prop="title">
					<el-space>
						<el-input v-model="optionForm.title.text" placeholder="歌曲名称" />
						<el-slider style="width: 200px; margin: 0 16px" v-model="optionForm.title.size" show-stops :min="12" :max="100" :step="1" />
						<el-input-number v-model="optionForm.title.size" :min="12" :max="100" />
						<svg-icon name="fontSize" title="字体大小" />
					</el-space>
				</el-form-item>
				<el-form-item label="歌手" prop="singer">
					<el-input style="width: 200px" v-model="optionForm.singer" placeholder="歌手" />
				</el-form-item>
				<el-form-item label="副标题" prop="vice_title">
					<el-space>
						<el-input style="width: 300px" v-model="optionForm.vice_title.text" placeholder="副标题" />
						<el-switch v-model="optionForm.vice_title.show" />
					</el-space>
				</el-form-item>
				<el-card v-if="optionForm.show === 'cover'" header="背景">
					<el-form-item label="显示风格" prop="show_style">
						<el-select v-model="optionForm.cover.show_style" placeholder="选择风格">
							<el-option value="style1" label="风格1" />
						</el-select>
					</el-form-item>
					<el-form-item label="封面背景" prop="background_path">
						<el-upload class="upload-demo" drag :http-request="httpRequest" :show-file-list="false">
							<el-icon class="el-icon--upload"><upload-filled /></el-icon>
							<div class="el-upload__text">将图片拖拽到这里 或者 <em>点击上传</em></div>
							<template #tip>
								<div class="el-upload__tip">jpg/png</div>
							</template>
						</el-upload>
					</el-form-item>
					<el-form-item label="高斯模糊" prop="bg_path">
						<el-space>
							<el-slider style="width: 160px; margin-right: 16px" v-model="optionForm.cover.blur" :min="0" :max="10" :step="1" />
							<el-input-number v-model="optionForm.cover.blur" :min="0" :max="10" />
						</el-space>
					</el-form-item>
				</el-card>
			</el-form>
		</pane>
		<pane class="video-window" :min-size="34">
			<video-window />
		</pane>
	</splitpanes>
</template>
<script setup lang="ts">
import { reactive, provide } from 'vue'
import {
	ElForm,
	ElFormItem,
	ElUpload,
	ElSpace,
	ElSlider,
	ElInputNumber,
	ElIcon,
	ElSelect,
	ElOption,
	ElCard,
	ElRadioGroup,
	ElRadioButton,
	ElInput,
	ElSwitch,
	UploadRequestOptions,
} from 'element-plus'
import videoWindow from './video-window/video-window.vue'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const optionForm: IOptions = reactive({
	show: IShowType.cover,
	title: {
		text: 'Flowers',
		size: 68,
	},
	singer: 'Miley Cyrus',
	vice_title: {
		text: 'Yeah I Can Love Me Better',
		show: true,
	},
	cover: {
		show_style: IStyle.style1,
		background_path: '',
		blur: 0,
		rotate: 0,
	},
})

provide('optionForm', optionForm)

// 图片上传
function httpRequest(options: UploadRequestOptions) {
	const file = options.file
	const render = new FileReader()
	render.readAsDataURL(file)
	render.onload = (e) => {
		const base64 = e.target && e.target.result
		optionForm.cover.background_path = typeof base64 === 'string' ? base64 : ''
	}
}
</script>
<style lang="scss" scoped>
.video-container {
	height: calc(100vh - 104px);
	.upload-demo {
		width: 100%;
	}
}
</style>
