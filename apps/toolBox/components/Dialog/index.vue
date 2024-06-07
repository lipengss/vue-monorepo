<template>
	<el-dialog v-model="state.visible" :show-close="false" width="900px" append-to-body :fullscreen="state.fullscreen" draggable>
		<template #header>
			<div class="flex-end">
				<el-button :icon="FullScreen" circle size="small" @click="state.fullscreen = !state.fullscreen" />
				<el-button :icon="CloseBold" circle size="small" @click="emits('update:visible', false)" />
			</div>
		</template>
		<slot />
	</el-dialog>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '~/stores/settings';
import { CloseBold, FullScreen } from '@element-plus/icons-vue';

const { setting } = storeToRefs(useSettingsStore());

interface Props {
	visible: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

const state = reactive({
	visible: false,
	fullscreen: false,
});

const picture = computed(() => setting.value.bg.picture);

const emits = defineEmits(['update:visible']);

watch(
	() => props.visible,
	(visible: boolean) => {
		state.visible = visible;
	},
	{
		immediate: true,
	}
);
</script>
<style lang="scss" scoped>
:deep .el-dialog {
	background-image: v-bind('picture.values');
}
</style>
