<template>
	<div class="contextmenu" v-if="context.show" :style="{ left: context.clientX + 'px', top: context.clientY + 'px' }">
		<slot />
	</div>
</template>
<script setup lang="ts">
import { reactive, defineExpose } from 'vue';

const context = reactive({
	show: false,
	clientX: 0,
	clientY: 0,
});

function contextmenu(event: any) {
	const { clientX, clientY } = event;
	context.clientX = clientX;
	context.clientY = clientY;
	context.show = true;
}

onMounted(() => {
	window.addEventListener('click', () => {
		context.show = false;
	});
});

defineExpose({
	contextmenu,
});
</script>
<style lang="scss" scoped>
.contextmenu {
	position: fixed;
	z-index: 900;
	border-radius: 6px;
	cursor: pointer;
	padding: 5px 4px;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
	background-color: #0b0b0bcc;
	backdrop-filter: blur(10px);
	:deep .item {
		min-width: 100px;
		line-height: 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4px 6px;
		margin: 4px 0;
		border-radius: 4px;
		color: #fff;
		.el-icon {
			margin-right: 6px;
		}
		span {
			font-size: 12px;
			flex-shrink: 0;
			margin-left: 10px;
		}
		&:hover {
			background-color: #ffffff1a;
			transition: background-color 0.3s ease-in-out;
		}
	}
}
</style>
