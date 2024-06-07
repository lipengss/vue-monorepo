<template>
	<div>
		<div class="circle" @click="onTranslateX" @mouseover="onTranslateX"></div>
	</div>
</template>
<script setup lang="ts">
import anime from 'animejs/lib/anime.es.js'

const onTranslateX = () => {
	anime({
		targets: '.circle',
		translateX: ['10px', '0'],
	})
}
</script>
<style lang="scss" scoped>
.circle {
	width: 30px;
	height: 30px;
	background-color: red;
	border-radius: 30px;
}
</style>
