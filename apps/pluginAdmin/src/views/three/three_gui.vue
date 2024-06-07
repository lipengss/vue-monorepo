<template>
	<div id="container" class="container"></div>
</template>
<script setup lang="ts">
import { onMounted, render } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'

function init() {
	const container = document.querySelector('#container')

	// 创建场景
	const scene = new THREE.Scene()

	// 创建相机
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
	camera.position.set(0, 0, 10)
	scene.add(camera)

	// 创建图形化
	const gui = new dat.GUI()

	// 添加物体
	const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
	const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 })
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
	cube.position.set(0, 0, 0)
	scene.add(cube)

	// 修改位置
	gui
		.add(cube.position, 'x')
		.min(0)
		.max(5)
		.step(0.1)
		.name('X轴')
		.onChange((val: number) => {
			console.log('修改时监听', val)
		})
		.onFinishChange((val: number) => {
			console.log('修改结束触发', val)
		})

	const params = {
		color: '#ffff00',
		move: () => {
			gsap.to(cube.position, { x: 5, repeat: -1, duration: 5, ease: 'power.inOut', yoyo: true })
		},
	}
	// 修改颜色
	gui.addColor(params, 'color').onChange((color: string) => {
		cube.material.color.set(color)
	})
	// 复选框
	gui.add(cube, 'visible').name('显示/隐藏')
	// 方法
	gui.add(params, 'move').name('立方体运动')

	// 设置文件夹
	const folder = gui.addFolder('设置更多')
	folder.add(cube.material, 'wireframe')

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
		// 更新摄像头
		camera.aspect = window.innerWidth / window.innerHeight
		// 更新摄像机的投影矩阵
		camera.updateProjectionMatrix()
		// 更新渲染器
		renderer.setSize(window.innerWidth, window.innerHeight)
		// 设置渲染器的像素比
		renderer.setPixelRatio(window.devicePixelRatio)
	})

	// 控制器 相当于卫星围绕地球一样观察
	const controls = new OrbitControls(camera, renderer.domElement)
	// 阻尼感
	controls.enableDamping = true

	animate()
	function animate() {
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
