<template>
	<div class="wrapper"></div>
</template>
<script setup lang="ts">
import { Application, Container, Graphics, Assets, Sprite, Rectangle } from 'pixi.js'
import { onMounted } from 'vue'

const app = new Application()

async function init() {
	const wrapper = document.querySelector('.wrapper')
	if (!wrapper) return
	const { clientWidth, clientHeight } = wrapper
	await app.init({
		width: clientWidth,
		height: clientHeight,
		antialias: true,
		backgroundColor: 0xe4e0e1,
	})
	wrapper.appendChild(app.canvas)

	await Assets.load([{ src: new URL('./tileset.png', import.meta.url).href, name: 'tileset' }])

	texture()
}

function texture() {
	const tileset = Sprite.from(new URL('./tileset.png', import.meta.url).href)

	const rect = new Rectangle(0, 0, 32, 32)

	const texture = app.renderer.generateTexture({
		target: tileset,
		frame: rect,
	})

	const ux = Sprite.from(texture)

	app.stage.addChild(tileset)
}

function drwarLine() {
	// const container = new Container()
	// const graphics = new Graphics().moveTo(0, 0).lineTo(100, 100).lineTo(200, 100).lineTo(300, 200).stroke({ color: 0xff0000, width: 2 })
	// app.stage.addChild(graphics)

	const container = new Container()
	const grid = new Graphics()
	for (let i = 0; i < 10; i++) {
		grid.moveTo(i * 10, 0).lineTo(i * 10, 100)
		grid.moveTo(0, i * 10).lineTo(100, i * 10)
	}
	grid.stroke({ color: 0xffffff, pixelLine: true })
	container.addChild(grid)
	app.stage.addChild(container)
}

onMounted(() => {
	init()
})
</script>
<style lang="scss" scoped>
.wrapper-scrroll {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
