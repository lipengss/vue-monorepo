<template>
	<div :class="`app-size-${props.size}`" class="app-wrapper" @contextmenu.stop="contextmenu">
		<div class="app-box">
			<slot />
		</div>
		<div v-if="setting.app.showTitle" class="name singe-line">{{ props.name }}</div>
	</div>
</template>
<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '~/stores/settings';
import mitt from '~/assets/utils/mitt';

interface Props {
	size: '1x1' | '1x2' | '2x2' | '5x2';
	name?: string;
	disabledContextmenu?: boolean;
	color?: string;
}
const props = withDefaults(defineProps<Props>(), {
	size: '1x1',
	disabledContextmenu: false,
});

const { setting } = storeToRefs(useSettingsStore());
const appSize = computed(() => `${setting.value.app.size}px`);
const columnGap = computed(() => {
	const { async, gap, columnGap } = setting.value.app;
	return (async ? gap : columnGap) + 'px';
});

const columnPosition = computed(() => -columnGap.value);

function contextmenu(event: Event) {
	event.preventDefault();
	if (props.disabledContextmenu) return;
	mitt.emit('contextmenuApp', { event: event, name: props.name });
}

const color = computed(() => props.color || '#fff');

const rowGap = computed(() => {
	const { async, gap, rowGap } = setting.value.app;
	return (async ? gap : rowGap) + 'px';
});

const radius = computed(() => setting.value.app.radius + 'px');
const opacity = computed(() => setting.value.app.opacity);
</script>
<style lang="scss" scoped>
$width: v-bind(appSize);
$height: v-bind(appSize);
$columnGap: v-bind(columnGap);
$rowGap: v-bind(rowGap);
.app-wrapper {
	position: relative;
	opacity: v-bind(opacity);
	.name {
		width: 100%;
		height: v-bind(columnGap);
		line-height: 24px;
		position: absolute;
		bottom: v-bind(columnPosition);
		font-size: 12px;
		text-align: center;
		color: v-bind(color);
	}
}
.app-box {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: v-bind(radius);
	overflow: hidden;
}
.app-size-1x1 {
	width: $width;
	height: $width;
}
.app-size-1x2 {
	width: $width;
	height: calc(($height * 2) + $rowGap);
	grid-column: span 1;
	grid-row: span 2;
}
.app-size-2x2 {
	width: calc(($width * 2) + $columnGap);
	height: calc(($height * 2) + $rowGap);
	grid-column: span 2;
	grid-row: span 2;
}
.app-size-5x2 {
	width: calc(($width * 5) + (4 * $columnGap));
	height: calc(($width * 2) + $rowGap);
	grid-column: span 5;
	grid-row: span 2;
}
</style>
