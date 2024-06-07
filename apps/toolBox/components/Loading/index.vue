<template>
	<div v-if="!loading" class="loading">
		<div class="loader" />
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const loading = ref(false);

onMounted(() => {
	setTimeout(() => {
		loading.value = true;
	}, 1000);
});
</script>
<style lang="scss" scoped>
.loading {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: url(../../assets/wallpaper/picture11.jpg);
	background-position: center;
	&::before {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(10px);
	}
	.loader {
		width: 50px;
		aspect-ratio: 1.154;
		position: relative;
		background: conic-gradient(from 120deg at 50% 64%, #0000, var(--el-color-primary) 1deg 120deg, #0000 121deg);
		animation: l27-0 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
	}
	.loader:before,
	.loader:after {
		content: '';
		position: absolute;
		inset: 0;
		background: inherit;
		transform-origin: 50% 66%;
		animation: l27-1 1.5s infinite;
	}
	.loader:after {
		--s: -1;
	}
	@keyframes l27-0 {
		0%,
		30% {
			transform: rotate(0);
		}
		70% {
			transform: rotate(120deg);
		}
		70.01%,
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes l27-1 {
		0% {
			transform: rotate(calc(var(--s, 1) * 120deg)) translate(0);
		}
		30%,
		70% {
			transform: rotate(calc(var(--s, 1) * 120deg)) translate(calc(var(--s, 1) * -5px), 10px);
		}
		100% {
			transform: rotate(calc(var(--s, 1) * 120deg)) translate(0);
		}
	}
}
</style>
