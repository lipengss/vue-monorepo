<template>
	<el-tooltip effect="light" :content="app.meta.description" placement="top" :show-after="500">
		<div class="appliaction">
			<div class="icon-wrap" :style="{ backgroundColor: app.meta.bgColor }" @click="onclick">
				<div v-if="app.meta.type === 'img'" class="favicon" :width="app.meta.size" :height="app.meta.size">
					<img :src="app.meta.value" width="70%" height="70%" />
				</div>
				<el-icon v-else-if="app.meta.type === 'icon' && app.meta.value" :size="app.meta.size || 40">
					<svg-icon :name="app.meta.value" :color="app.meta.color"></svg-icon>
				</el-icon>
				<div v-else class="icon-text" :style="{ width: app.meta.size + 'px', height: app.meta.size + 'px' }">{{ app.meta.value }}</div>
			</div>
		</div>
	</el-tooltip>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '~/stores/settings';

const { setting } = storeToRefs(useSettingsStore());
const { setGlobalSetting } = useSettingsStore();

interface Props {
	app: RouteItem;
}

const props = withDefaults(defineProps<Props>(), {});

const size = computed(() => props.app.meta.size + 'px');

function onclick() {
	window.open(props.app.path);
	const { name } = props.app;
	if (!name) return;
	if (Object.prototype.hasOwnProperty.call(setting.value.hotWebRanks, name)) {
		setting.value.hotWebRanks[name]++;
	} else {
		setting.value.hotWebRanks[name] = 1;
	}
	setGlobalSetting();
}
</script>
<style lang="scss" scoped>
.appliaction {
	width: 100%;
	height: 100%;
	cursor: pointer;
	.icon-wrap {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		.icon-text {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			font-size: 1.5em;
			line-height: 26px;
			font-weight: bold;
			color: v-bind('props.app.meta.color');
		}
		.favicon {
			width: v-bind(size);
			height: v-bind(size);
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;
		}
	}
}
</style>
