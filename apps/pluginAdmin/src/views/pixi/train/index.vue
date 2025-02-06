<template>
	<div class="wrapper"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { Application, Graphics, Container } from 'pixi.js'
import { gsap } from 'gsap'
import { moom } from './material'
import { random } from 'nanoid'

class Train {
	app: Application
	constructor() {
		this.app = new Application()
		this.init()
	}
	async init() {
		const wrapper: HTMLElement | null = document.querySelector('.wrapper')
		if (!wrapper) return
		const { clientWidth, clientHeight } = wrapper

		await this.app.init({
			width: clientWidth,
			height: clientHeight,
			antialias: true,
			resizeTo: wrapper,
			backgroundColor: '#021f4b',
		})
		wrapper.appendChild(this.app.canvas)
		this.addStars()
		this.addMoom()
		this.addMountain()
		this.addTrees()
		this.addGround()
	}

	addStars() {
		const starCount = 30
		const stars = []
		for (let index = 0; index < starCount; index++) {
			const gr = new Graphics()
			const x = ((index * 0.78695 + Math.random()) * this.app.screen.width) % this.app.screen.width
			const y = ((index * 0.9382 + Math.random()) * this.app.screen.height) % this.app.screen.height
			const radius = 5 + Math.random() * 4
			const rotation = Math.random() * Math.PI * 2
			gr.star(x, y, 5, radius, 0, rotation).fill({ color: 0xffdf00, alpha: radius / 5 })
			stars.push(gr)
			this.app.stage.addChild(gr)
		}
		stars.forEach((star) => {
			function twinkle() {
				gsap.to(star, {
					alpha: Math.random(),
					duration: Math.random() * 2 + 1,
					ease: 'sine.inOut',
					onComplete: twinkle,
				})
			}
			twinkle()
		})
	}
	addMoom() {
		const gr = new Graphics().svg(moom)
		gr.x = this.app.screen.width - this.app.screen.width / 6
		gr.y = this.app.screen.height / 8
		this.app.stage.addChild(gr)
	}
	addMountain() {
		const { width } = this.app.screen
		const group1 = this.createMountainGroup()
		const group2 = this.createMountainGroup()
		group2.x = width
		this.app.stage.addChild(group1, group2)

		this.app.ticker.add((time) => {
			const dx = time.deltaTime * 0.5
			group1.x -= dx
			group2.x -= dx
			if (group1.x <= -width) {
				group1.x += width * 2
			}
			if (group2.x <= -width) {
				group2.x += width * 2
			}
		})
	}
	createMountainGroup() {
		const gr = new Graphics()

		const { width, height } = this.app.screen
		const widthHalf = width / 2
		const startY = height

		const startXLeft = 0
		const startXMiddle = width / 4
		const startRight = width / 2

		const heightLeft = height / 2
		const heightMiddle = (height * 4) / 5
		const heightRight = (height * 2) / 3

		const colorLeft = 0xc1c0c2
		const colorMiddle = 0x7e818f
		const colorRight = 0x8c919f

		console.log(
			'width',
			width,
			'height',
			height,
			'widthHalf',
			widthHalf,
			'startY',
			startY,
			'startXMiddle',
			startXMiddle,
			'startRight',
			startRight,
			'heightLeft',
			heightLeft,
			'heightMiddle',
			heightMiddle,
			'heightRight'
		)
		// draw the middle mountain
		gr.moveTo(startXMiddle, startY)
			.bezierCurveTo(
				startXMiddle + widthHalf / 2,
				startY - heightMiddle,
				startXMiddle + widthHalf / 2,
				startY - heightMiddle,
				startXMiddle + widthHalf,
				startY
			)
			.fill({ color: colorMiddle })
			.moveTo(startXLeft, startY)
			.bezierCurveTo(startXLeft + widthHalf / 2, startY - heightLeft, startXLeft + widthHalf / 2, startY - heightLeft, startXLeft + widthHalf, startY)
			.fill({ color: colorLeft })
			.moveTo(startRight, startY)
			.bezierCurveTo(
				startRight + widthHalf / 2,
				startY - heightRight,
				startRight + widthHalf / 2,
				startY - heightRight,
				startRight + widthHalf,
				startY
			)
			.fill({ color: colorRight })

		return gr
	}
	addTrees() {
		const treeWidth = 200
		const y = this.app.screen.height - 20
		const spacing = 15
		const count = Math.ceil(this.app.screen.width / (treeWidth + spacing)) + 2
		const trees: Graphics[] = []
		for (let index = 0; index < count; index++) {
			const treeHeight = 255 + Math.random() * 50
			const tree = this.createTree(treeWidth, treeHeight)
			tree.x = index * (treeWidth + spacing)
			tree.y = y
			this.app.stage.addChild(tree)
			trees.push(tree)
		}
		this.app.ticker.add((time) => {
			const dx = time.deltaTime * 3
			trees.forEach((tree) => {
				tree.x -= dx
				if (tree.x <= -(treeWidth / 2 + spacing)) {
					tree.x += count * (treeWidth + spacing) + spacing * 3
				}
			})
		})
	}
	createTree(width: number, height: number) {
		const trunkWidth = 30
		const trunkHeight = height / 4
		const trunkColor = 0x563929
		const graphics = new Graphics().rect(-trunkWidth / 2, -trunkHeight, trunkWidth, trunkHeight).fill({ color: trunkColor })

		const crownHeight = height - trunkHeight
		const crownLevels = 3 + Math.floor(Math.random() * 3)
		const crownLevelHeight = crownHeight / crownLevels
		const crownWidthIncrement = width / crownLevels
		const crownColor = 0x264d3d

		for (let index = 0; index < crownLevels; index++) {
			const y = -trunkHeight - crownLevelHeight * index
			const levelWidth = width - crownWidthIncrement * index
			const offset = index < crownLevels - 1 ? crownLevelHeight / 2 : 0
			graphics
				.moveTo(-levelWidth / 2, y)
				.lineTo(0, y - crownLevelHeight - offset)
				.lineTo(levelWidth / 2, y)
				.fill({ color: crownColor })
		}
		return graphics
	}
	addGround() {
		const width = this.app.screen.width
		const groundHeight = 20
		const groundY = this.app.screen.height
		const ground = new Graphics().rect(0, groundY - groundHeight, width, groundHeight).fill({ color: 0xdddddd })
		this.app.stage.addChild(ground)

		const trackHeight = 15
		const plankWidth = 50
		const plankHeight = trackHeight / 2
		const plankGap = 20
		const plankCount = width / (plankWidth + plankGap) + 1
		const plankY = groundY - groundHeight

		const planks: Graphics[] = []

		for (let index = 0; index < plankCount; index++) {
			const plank = new Graphics().rect(0, plankY - plankHeight, plankWidth, plankHeight).fill({ color: 0x241811 })
			plank.x = index * (plankWidth + plankGap)
			this.app.stage.addChild(plank)
			planks.push(plank)
		}

		const railHeight = trackHeight / 2
		const railY = plankY - plankHeight
		const rail = new Graphics().rect(0, railY - railHeight, width, railHeight).fill({ color: 0x5c5c5c })
		this.app.stage.addChild(rail)

		this.app.ticker.add((time) => {
			const dx = time.deltaTime * 6
			planks.forEach((plank) => {
				plank.x -= dx
				if (plank.x <= -(plankWidth + plankGap)) {
					plank.x += plankCount * (plankWidth + plankGap) + plankGap * 1.5
				}
			})
		})
	}
	addTrain() {}
	createTrainHead() {
		const container = new Container()
	}
}

onMounted(() => {
	new Train()
})
</script>
