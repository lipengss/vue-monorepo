<template>
	<div id="container" class="container"></div>
</template>
<script lang="ts" setup>
import { gsap } from 'gsap'
import { Application, Assets, Container, Graphics, Sprite, Text } from 'pixi.js'
import { onMounted } from 'vue'
const images: any = {
	btn: new URL('./images/btn.png', import.meta.url).href,
	btn_circle: new URL('./images/btn_circle.png', import.meta.url).href,
	brake_bike: new URL('./images/brake_bike.png', import.meta.url).href,
	brake_handlerbar: new URL('./images/brake_handlerbar.png', import.meta.url).href,
	brake_lever: new URL('./images/brake_lever.png', import.meta.url).href,
}

class AnimateBanner {
	container: any
	app: Application
	constructor(el: String) {
		this.app = new Application()
		this.container = document.querySelector(`#${el}`)
		this.init()
	}
	async init() {
		if (!this.container) return
		await this.app.init({
			width: this.container.clientWidth,
			height: this.container.clientHeight,
			resizeTo: window,
			antialias: true,
			backgroundColor: 0xe4e0e1,
		})
		this.container.appendChild(this.app.canvas)
		window.addEventListener('resize', this.app.resize)
		this.show()
	}
	async show() {
		const { start, pause } = this.createParticles()
		const { brake_lever, brakeContainer } = await this.createPicture()
		const { btn } = this.createBtn()
		btn.on('mousedown', () => {
			gsap.to(brake_lever, { duration: 0.6, rotation: (Math.PI / 180) * -30 })
			gsap.to(brakeContainer, { duration: 1, x: brakeContainer.x, y: brakeContainer.y + 20, ease: 'elastic.out' })
			pause()
		})
		btn.on('mouseup', () => {
			gsap.to(brake_lever, { duration: 0.6, rotation: 0 })
			gsap.to(brakeContainer, { duration: 1, x: brakeContainer.x, y: brakeContainer.y - 20 })
			start()
		})
	}
	createBtn() {
		const container = new Container()
		container.x = 400
		container.y = 300

		const btn = this.createCircle(40, '#D6C0B3')
		const ring = this.createCircle(50, 'transparent')
		const ring2 = this.createCircle(38, 'transparent')
		btn.cursor = 'pointer'
		btn.interactive = true

		ring.stroke({ width: 2, color: '#AB886D' })

		ring2.stroke({ width: 2, color: '#AB886D' })
		gsap.to(ring2.scale, { duration: 0.8, x: 1.6, y: 1.6, repeat: -1 })
		gsap.to(ring2, { duration: 0.8, alpha: 0, repeat: -1 })

		const text = new Text({
			text: '按钮',
			style: {
				fontSize: 20,
				fill: '#fff',
				letterSpacing: 4,
			},
		})
		text.x = (container.width - text.width) / 2
		text.y = (container.height - text.height) / 2

		container.addChild(ring2)
		container.addChild(ring)
		container.addChild(btn)
		container.addChild(text)
		this.app.stage.addChild(container)

		return { btn }
	}

	createCircle(radius: number, color: string | number) {
		const gr = new Graphics()
		gr.circle(0, 0, radius)
		gr.fill(color)
		return gr
	}
	createRect(width: number, height: number, color: string) {
		const gr = new Graphics()
		gr.rect(0, 0, width, height)
		gr.fill(color)
		return gr
	}
	async createPicture() {
		const container = new Container()

		await Assets.load(Object.entries(images).map(([name, src]) => ({ name, src })))

		const brake_bike = Sprite.from(images.brake_bike)
		const brake_handlerbar = Sprite.from(images.brake_handlerbar)
		const brake_lever = Sprite.from(images.brake_lever)

		brake_lever.pivot.set(455, 455)
		brake_lever.x = 722
		brake_lever.y = 900

		container.addChild(brake_bike)
		container.addChild(brake_lever)
		container.addChild(brake_handlerbar)

		container.scale = 0.4
		container.x = this.container.clientWidth - container.width
		container.y = this.container.clientHeight - container.height
		this.app.stage.addChild(container)

		return {
			brakeContainer: container,
			brake_lever,
		}
	}
	createParticles() {
		const container = new Container()
		container.pivot.set(this.container.clientWidth / 2, this.container.clientHeight / 2)
		container.x = this.container.clientWidth / 2
		container.y = this.container.clientHeight / 2
		container.rotation = (30 * Math.PI) / 180
		const colors = [0x262a56, 0xb8621b, 0x818181, 0x000000]
		const particles = Array.from({ length: 20 }).map(() => {
			const point = this.createCircle(6, colors[Math.floor(Math.random() * colors.length)])
			const pItem = {
				sx: Math.random() * this.container.clientWidth,
				sy: Math.random() * this.container.clientHeight,
				point,
			}
			point.x = pItem.sx
			point.y = pItem.sy
			container.addChild(point)
			return pItem
		})
		this.app.stage.addChild(container)

		let speed = 0
		const loop = () => {
			speed += 0.5
			speed = Math.min(speed, 20)
			particles.forEach((pItem) => {
				pItem.point.y += speed
				if (speed >= 20) {
					pItem.point.scale.x = 0.05
					pItem.point.scale.y = 20
					// gsap.to(pItem.point.scale, { duration: 0.1, x: 0.02, y: 20 })
				}
				if (pItem.point.y > this.container.clientHeight) {
					pItem.point.y = 0
				}
			})
		}
		function start() {
			speed = 0
			gsap.ticker.add(loop)
		}
		function pause() {
			gsap.ticker.remove(loop)
			particles.forEach((pItem) => {
				gsap.to(pItem.point.scale, { duration: 0.1, x: 1, y: 1 })
				gsap.to(pItem.point, { duration: 1, x: pItem.sx, y: pItem.sy, ease: 'elastic.out' })
			})
		}
		start()
		return {
			start,
			pause,
		}
	}
}

onMounted(() => {
	const animateBanner = new AnimateBanner('container')
})
</script>
<style>
.container {
	width: 100%;
	height: 100%;
}
</style>
