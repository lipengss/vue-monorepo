<template>
	<div id="container" class="container"></div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { Application, Loader, Assets, Texture, DisplacementFilter, Sprite, Container, Text } from 'pixi.js'

const app = new Application()

const pictureSrc = new URL('./picture8.jpg', import.meta.url).href
const fluterSrc = new URL('./fluter.jpg', import.meta.url).href

const containerState = reactive({
	clientWidth: 0,
	clientHeight: 0,
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
	createPicture()
	cteateText()
	createFluter()
}

async function assetLoad() {
	await Assets.load([
		{ name: 'pictureSrc', src: pictureSrc },
		{ name: 'fluterSrc', src: fluterSrc },
	])
}

function createPicture() {
	const container = new Container()

	const { clientWidth } = containerState
	const picture = Sprite.from(pictureSrc)

	container.addChild(picture)
	container.scale.set(1.1)
	container.position.x = (clientWidth - container.width) / 2
	app.stage.addChild(container)
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

function createFluter() {
	const fluter = Sprite.from(fluterSrc)
	const display = new DisplacementFilter(fluter)
	console.log(display)
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
