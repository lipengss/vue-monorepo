<template>
	<el-config-provider :locale="locale">
		<div class="nuxt-container" id="nuxt-container">
			<NuxtLayout> <NuxtPage /></NuxtLayout>
			<Loading />
			<ToggleWallpaper />
		</div>
		<div id="tooltip" class="tooltip">
			<div class="name"></div>
		</div>
		<div id="x-line" class="x-line"></div>
		<div id="y-line" class="y-line"></div>
	</el-config-provider>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '~/stores/settings';
const { initGlobalSetting } = useSettingsStore();
const { setting } = storeToRefs(useSettingsStore());

const bgOpacity = computed(() => `rgba(0,0,0,${setting.value.bg.opacity})`);
const bgBlur = computed(() => `blur(${setting.value.bg.blur}px)`);
const menuWidth = computed(() => setting.value.menuBar.width + 'px');

onMounted(() => {
  initGlobalSetting();
});

useSeoMeta({
	title: '前端工具网站',
	description: '图片转base64、图片压缩',
	keywords: '图片转base64、图片压缩、图片处理、在线工具、工具集合',
});
const locale = ref(zhCn);
</script>
<style lang="scss" scoped>
.nuxt-container {
	width: 100%;
	height: 100%;
	padding-left: v-bind(menuWidth);
	box-sizing: border-box;
	&:before,
	&:before {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	&::before {
		background-color: v-bind(bgOpacity);
	}
	&::before {
		backdrop-filter: v-bind(bgBlur);
	}
}
.x-line,
.y-line {
	width: 1px;
	height: 1px;
	position: fixed;
	left: 0;
	top: 0;
	background-color: blue;
}
.tooltip {
	width: 200px;
	height: 240px;
	position: fixed;
	transform: translate(20px, 20px);
	z-index: 100;
	border-radius: 4px;
	border: 1px solid #ccc;
	background-color: #fff;
	.name {
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		line-height: 40px;
		background-color: aliceblue;
	}
}
</style>
