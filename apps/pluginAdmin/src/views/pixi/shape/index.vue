<template>
	<div class="container"></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { Application, Graphics } from 'pixi.js'

const app = new Application()

class Shape {
	clientWidth: number
	clientHeight: number
	constructor() {
		this.clientWidth = 0
		this.clientHeight = 0
		this.init()
	}
	async init() {
		const container: HTMLElement | null = document.querySelector('.container')
		if (!container) return
		const { clientWidth, clientHeight } = container
		this.clientWidth = clientWidth
		this.clientHeight = clientHeight
		await app.init({
			width: clientWidth,
			height: clientHeight,
			resizeTo: container,
			antialias: true,
			backgroundColor: 0xe4e0e1,
		})
		container.appendChild(app.canvas)
		this.graphics()
	}
	graphics() {
		const gr = new Graphics()
		// 画一个正方形， 50,50为左上角坐标， 100,100为宽高
		gr.rect(50, 50, 100, 100)
		gr.fill(0xde3249)
		gr.stroke({ width: 4, color: 0xffffff })

		gr.moveTo(200, 50)
		gr.lineTo(400, 50)
		gr.lineTo(250, 100)
		gr.lineTo(200, 50)
		gr.fill(0xff3300)
		gr.stroke({ width: 4, color: 0xffd900 })

		console.log(app)
		gr.moveTo(300, 300).bezierCurveTo(300, 300, 450, -300, 600, 300).fill(0xc1c0c2)

		gr.moveTo(0, this.clientHeight)
			.bezierCurveTo(0, this.clientHeight, this.clientWidth / 2, 0, this.clientWidth, this.clientHeight)
			.fill(0xff0000)

		app.stage.addChild(gr)
	}
}

onMounted(() => {
	new Shape()
})
</script>
