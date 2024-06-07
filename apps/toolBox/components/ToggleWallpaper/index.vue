<template>
	<div class="wallpaper">
		<el-icon :size="30" title="切换壁纸" id="global-switch" @click="changeWallpaper">
			<svg-icon name="wide" />
		</el-icon>
	</div>
</template>
<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings';
const { changeWallpaper } = useSettingsStore();
</script>
<style lang="scss" scoped>
.wallpaper {
	height: 50px;
	position: fixed;
	top: 0;
	right: 10%;
	z-index: 200;
	&::before {
		content: '';
		width: 1px;
		height: 40px;
		position: absolute;
		background-color: #ffa750;
	}
	.el-icon {
		position: absolute;
		bottom: 0;
		left: -15px;
		cursor: pointer;
		animation: rotate 1.6s linear infinite;
		&:hover {
			animation-play-state: paused;
		}
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
}
</style>
