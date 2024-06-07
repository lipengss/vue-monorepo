<template>
	<GridItem size="1x1" disabled-contextmenu>
		<el-icon :size="38" color="#409eff" @click="onAdded"> <CirclePlusFilled /></el-icon>
	</GridItem>
	<ClientOnly>
		<Dialog v-model:visible="state.visible" title="添加应用">
			<el-tabs tab-position="left" v-model="state.activeTab">
				<el-tab-pane label="网址导航" name="website">
					<el-tag v-for="tag in tagList" :key="tag.value" :wrap="true">{{ tag.label }}</el-tag>
				</el-tab-pane>
				<el-tab-pane label="自定义图标" name="customIcons">
					<el-form :model="state.customIconForm" label-width="100px">
						<el-form-item label="应用名称" prop="name" :rules="{ required: true, message: '请输入应用名称' }">
							<el-input v-model="state.customIconForm.name" placeholder="应用名称" :prefix-icon="Edit" />
						</el-form-item>
						<el-form-item label="访问地址" prop="path" :rules="{ required: true, message: '请输入访问地址' }">
							<el-input v-model="state.customIconForm.path" placeholder="https://" :prefix-icon="Link">
								<template #append>
									<el-button @click="getWebsiteIcon">获取图标</el-button>
								</template>
							</el-input>
						</el-form-item>
						<el-form-item label="应用分类" prop="type" :rules="{ required: true, message: '请选择应用分类' }">
							<el-select v-model="state.customIconForm.type" multiple placeholder="选择应用分类">
								<el-option v-for="menu in appTypeList.filter((n) => n.type !== '/')" :key="menu.name" :value="menu.type" :label="menu.name" />
							</el-select>
						</el-form-item>
						<el-form-item label="排行" prop="meta.rank">
							<el-input-number v-model="state.customIconForm.meta.rank" />
						</el-form-item>
						<el-form-item label="图标类型">
							<el-space>
								<el-radio-group v-model="state.customIconForm.meta.type" @change="onChangeIconType">
									<el-radio-button label="图标" value="icon" />
									<el-radio-button label="文字" value="text" />
									<el-radio-button label="图片" value="img" />
								</el-radio-group>
								<el-form-item prop="meta.value">
									<el-input v-model="state.customIconForm.meta.value" placeholder="图标值" :prefix-icon="Edit" />
								</el-form-item>
								<el-form-item>
									<ColorPicker v-model:color="state.customIconForm.meta.color" />
								</el-form-item>
							</el-space>
						</el-form-item>
						<el-form-item label="图标背景色">
							<ColorPicker :colorList="predefineColors" v-model:color="state.customIconForm.meta.bgColor" />
						</el-form-item>
						<el-form-item label="标签">
							<el-checkbox-group v-model="state.customIconForm.meta.tag">
								<el-checkbox v-for="tag in tagList" :key="tag.value" :label="tag.label" :value="tag.value" />
							</el-checkbox-group>
						</el-form-item>
						<el-form-item label="图标大小" prop="size">
							<el-slider v-model="state.customIconForm.meta.size" :min="40" :max="100" />
						</el-form-item>
						<el-form-item label="图标布局" prop="layout">
							<el-radio-group v-model="state.customIconForm.meta.layout">
								<el-radio-button label="1x1" value="1x1" />
								<el-radio-button label="2x2" value="2x2" />
								<el-radio-button label="5x2" value="5x2" />
							</el-radio-group>
						</el-form-item>
						<el-form-item label="描述" prop="description">
							<el-input v-model="state.customIconForm.meta.description" type="textarea" placeholder="应用介绍..." />
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSave">复制JSON</el-button>
							<el-button type="default">保存并继续</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</Dialog>
	</ClientOnly>
</template>
<script setup lang="ts">
import { CirclePlusFilled, Link, Edit } from '@element-plus/icons-vue';
import { tagList, predefineColors, appTypeList } from '~/assets/utils/publicData';

import { useCopy } from '~/hooks/useCopy';

const state = reactive({
	visible: false,
	activeTab: 'customIcons',
	customIconForm: {
		name: '',
		path: '',
		type: [],
		meta: {
			rank: 0,
			type: 'icon',
			value: 'app-',
			tag: [],
			size: 60,
			color: '#fff',
			bgColor: '#FF4500',
			layout: '1x1',
			description: '',
		},
	},
});

async function getWebsiteIcon() {
	const { path } = state.customIconForm;
	const img = document.createElement('img');
	img.src = `${path}favicon.ico`;
}

function onChangeIconType(type: string | number | boolean | undefined) {
	switch (type) {
		case 'icon':
			state.customIconForm.meta.value = 'app-';
			break;
		case 'text':
			state.customIconForm.meta.value = 'A';
			break;
		default:
			state.customIconForm.meta.value = 'https://';
			break;
	}
}

function onSave() {
	const str = JSON.stringify(state.customIconForm, null, '\t');
	const { onCopy } = useCopy(toRef(JSON.stringify(state.customIconForm)));
	onCopy();
}

function onAdded() {
	state.visible = true;
}
</script>
<style lang="scss" scoped>
.el-icon {
	width: 100%;
	height: 100%;
	background-color: var(--el-bg-color);
	cursor: pointer;
}
.el-tag {
	margin-right: 10px;
	margin-bottom: 10px;
}
.custom-item {
	border-radius: 8px;
	cursor: pointer;
}
.active {
	border: 1px solid var(--el-color-primary);
}
</style>
