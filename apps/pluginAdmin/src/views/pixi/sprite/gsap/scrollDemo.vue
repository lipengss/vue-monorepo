<template>
	<div class="container"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

function init() {
	gsap.registerPlugin(ScrollTrigger)
	const canvas: HTMLCanvasElement = document.createElement('canvas')
	const context: CanvasRenderingContext2D | null = canvas.getContext('2d')

	canvas.width = 1158
	canvas.height = 770

	const frameCount = 147
	const currentFrame = (index: number) =>
		`https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`

	const airpods = { frame: 0 }
	const images = Array.from({ length: frameCount }).map((_, i) => {
		const image = new Image()
		image.src = currentFrame(i)
		return image
	})

	gsap.to(airpods, {
		frame: frameCount - 1,
		snap: 'frame',
		case: 'none',
		onUpdate: render,
	})
	ScrollTrigger.create({
		trigger: '.wrapper-scrroll',
		pin: true,
		scrub: true,
	})
	images[0].onload = render

	function render() {
		if (!context) return
		context.clearRect(0, 0, canvas.width, canvas.height)
		context.drawImage(images[airpods.frame], 0, 0)
	}
}

onMounted(() => {
	init()
})
</script>
<style lang="scss">
.container {
	width: 100%;
	height: 5000px;
	background-color: #000;
	canvas {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		max-width: 100%;
		max-height: 100%;
	}
}
</style>
