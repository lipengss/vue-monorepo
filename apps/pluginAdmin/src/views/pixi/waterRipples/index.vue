<template>
	<div id="container" class="container"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive, render } from 'vue'
import {
	Application,
	Loader,
	Assets,
	BlurFilter,
	SCALE_MODE,
	Texture,
	DisplacementFilter,
	Sprite,
	Container,
	Text,
	Graphics,
	Rectangle,
} from 'pixi.js'

const app = new Application()

const pictureSrc = new URL('./picture8.jpg', import.meta.url).href
const fluterSrc = new URL('./fluter.jpg', import.meta.url).href

const containerState = reactive({
	clientWidth: 0,
	clientHeight: 0,
	radius: 200,
	blurSize: 20,
})

async function init() {
	const container = document.getElementById('container')
	if (!container) return
	const { clientWidth, clientHeight } = container
	containerState.clientHeight = clientHeight
	containerState.clientWidth = clientWidth
	await app.init({
		width: clientWidth,
		height: clientHeight,
		resizeTo: container,
		antialias: true,
		backgroundColor: 0xe4e0e1,
	})
	container.appendChild(app.canvas)
	window.addEventListener('resize', app.resize)
	await assetLoad()
	const background = createPicture()
	cteateText()
	createFluter(background)
}

async function assetLoad() {
	await Assets.load([
		{ name: 'pictureSrc', src: pictureSrc },
		{ name: 'fluterSrc', src: fluterSrc },
	])
}

function createPicture(): Sprite {
	const container = new Container()

	const { clientWidth } = containerState
	const background = Sprite.from(pictureSrc)
	container.addChild(background)
	container.scale.set(1.1)
	container.position.x = (clientWidth - container.width) / 2
	app.stage.addChild(container)
	return background
}

function cteateText() {
	const { clientWidth, clientHeight } = containerState
	const text = new Text({
		text: 'Breaking Bad',
		style: {
			fontFamily: 'Arial',
			fontSize: 200,
			fill: 'white',
			fontWeight: '900',
			stroke: {
				color: 'black',
				width: 20,
				join: 'round',
			},
			dropShadow: {
				color: 'black',
				blur: 0,
				angle: 45,
				distance: 10,
				alpha: 0.6,
			},
		},
	})
	text.x = (clientWidth - text.width) / 2
	text.y = (clientHeight - text.height) / 2
	text.alpha = 0.9
	app.stage.addChild(text)
}

function createFluter(background: Sprite) {
	const { radius, blurSize } = containerState
	const circle = new Graphics().circle(radius + blurSize, radius + blurSize, radius).fill({ color: 0xff0000 })
	circle.filters = [new BlurFilter({ strengthX: blurSize, strengthY: blurSize })]

	const bounds = new Rectangle(0, 0, 2 * (radius + blurSize), 2 * (radius + blurSize))

	const texture = app.renderer.generateTexture({
		target: circle,
		// style: { scaleMode: 'nearest' },
		resolution: 1,
		frame: bounds,
	})
	const focus = new Sprite(texture)

	app.stage.addChild(focus)
	background.mask = focus
	app.stage.eventMode = 'static'
	app.stage.hitArea = app.screen
	app.stage.on('pointermove', (event) => {
		focus.position.x = event.global.x - focus.width / 2
		focus.position.y = event.global.y - focus.height / 2
	})
	// const fluter = Sprite.from(fluterSrc)
	// const display = new DisplacementFilter(fluter)
	// console.log(display)
}

onMounted(() => {
	init()
})
</script>
<style>
.container {
	width: 100%;
	height: 100%;
}
</style>
