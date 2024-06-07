<template>
	<div id="container" class="container"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function init() {
	const container = document.querySelector('#container')

	// 创建场景
	const scene = new THREE.Scene()

	// 创建相机
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
	camera.position.set(0, 0, 10)
	scene.add(camera)

	// 添加物体
	const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
	const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 })
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
	cube.position.set(0, 0, 0)
	scene.add(cube)

	// 环境光
	const light = new THREE.AmbientLight(0x404040) // soft white light
	scene.add(light)
	// 平行光
	const directionalLight = new THREE.DirectionalLight(0xffffff)
	directionalLight.position.set(0.5, 0.5, 1)
	scene.add(directionalLight)

	// 创建渲染器
	const renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setSize(window.innerWidth, window.innerHeight)
	container?.appendChild(renderer.domElement)
	renderer.render(scene, camera)

	// 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
	const axesHelper = new THREE.AxesHelper(5)
	scene.add(axesHelper)

	window.addEventListener('resize', () => {
		controls.update()
		renderer.setSize(window.innerWidth, window.innerHeight)
	})

	// 控制器 相当于卫星围绕地球一样观察
	const controls = new OrbitControls(camera, renderer.domElement)
	animate()
	function animate(time?: number | undefined) {
		if (typeof time === 'number') {
			let t = (time / 1000) % 5
			console.log(t)
			cube.position.x = t * 1
		}
		// cube.position.x += 0.1
		// if (cube.position.x > 5) {
		// 	cube.position.x = 0
		// }
		requestAnimationFrame(animate)
		controls.update()
		renderer.render(scene, camera)
	}
}

onMounted(() => {
	init()
})
</script>
<style lang="scss" scoped>
.container {
	width: 100vw;
	height: 100vh;
}
</style>
