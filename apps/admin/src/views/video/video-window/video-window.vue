<template>
	<div class="video-window">video-window</div>
</template>
<style lang="scss" scoped>
.video-window {
	padding: 40px;
	box-sizing: border-box;
	background-color: #eee;
	padding-top: 40px;
	overflow-y: auto;
	.box {
		width: 720px;
		height: 1280px;
		transform: scale(0.6);
		transform-origin: center;
		background-color: red;
	}
}
</style>
