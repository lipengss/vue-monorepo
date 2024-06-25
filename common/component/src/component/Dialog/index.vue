<template>
	<el-dialog
		v-if="props.visible"
		:model-value="props.visible"
		:title="props.title"
		:width="props.width"
		:fullscreen="isFull"
		:close-on-press-escape="false"
		:close-on-click-modal="false"
		:show-close="false"
		draggable
	>
		<template #header>
			<div class="flex-between">
				<span>{{ props.title }}</span>
				<el-icon @click="isFull = !isFull">
					<el-icon color="#666">
						<svg-icon v-if="fullState" :title="fullState?.name" :name="fullState?.icon" />
					</el-icon>
				</el-icon>
			</div>
		</template>
		<slot />
		<template #footer>
			<template v-if="footer === 'default'">
				<el-button type="default" @click="onClose">取消</el-button>
				<el-button type="primary" style="padding: 8px 24px" @click="onSubmit" :loading="btnLoading" :disabled="btnLoading">
					{{ props.confirmText }}
				</el-button>
				<slot name="inster-right-btn" />
			</template>
			<template v-else>
				<slot name="footer" />
			</template>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { ElDialog, ElButton, ElIcon } from '@ui/element-plus';
type Props = {
	title: string;
	width?: string | number;
	confirmText?: string;
	visible: boolean;
	footer?: string;
};
const props = withDefaults(defineProps<Props>(), {
	title: '',
	width: '50%',
	confirmText: '确认',
	visible: false,
	footer: 'default',
});
const isFull = ref(false);
const btnLoading = ref(false);
const fullData = reactive(
	new Map([
		[true, { name: '关全屏', icon: 'off-screen' }],
		[false, { name: '开全屏', icon: 'full-screen' }],
	])
);
const fullState = computed(() => fullData.get(isFull.value));

const emits = defineEmits(['update:visible', 'onSubmit', 'onClose', 'success', 'fail']);

function onSubmit() {
	btnLoading.value = true;
	emits('onSubmit', success, fail);
}

function success() {
	btnLoading.value = false;
	emits('success');
	onClose();
}

function fail() {
	btnLoading.value = false;
	emits('fail');
}

function onClose() {
	emits('onClose');
	btnLoading.value = false;
	emits('update:visible', false);
}
function onStop() {
	btnLoading.value = false;
}

function onOpen() {
	emits('update:visible', true);
}

defineExpose({ onStop, onOpen, onClose, success, fail });
</script>
