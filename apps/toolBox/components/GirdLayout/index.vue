<template>
	<div class="container-grid">
		<slot />
	</div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '~/stores/settings';
const { setting } = storeToRefs(useSettingsStore());

const screenWidth = computed(() => setting.value.app.sceenWidth + setting.value.app.unit);
const appSize = computed(() => setting.value.app.size + 'px');
const columnGap = computed(() => {
	const { async, gap, columnGap } = setting.value.app;
	return (async ? gap : columnGap) + 'px';
});
const rowGap = computed(() => {
	const { async, gap, rowGap } = setting.value.app;
	return (async ? gap : rowGap) + 'px';
});
</script>

<style lang="scss" scoped>
.container-grid {
	width: v-bind(screenWidth);
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(auto-fill, v-bind(appSize));
	grid-template-rows: repeat(auto-fill, v-bind(appSize));
	grid-auto-flow: dense;
	column-gap: v-bind(columnGap);
	row-gap: v-bind(rowGap);
	margin: 0 auto;
	box-sizing: border-box;
	padding: 20px;
	padding-bottom: 60px;
}
</style>
