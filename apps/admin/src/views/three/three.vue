<template>
	<div id="container" class="container"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import {
	MeshLambertMaterial,
	Scene,
	PerspectiveCamera,
	PlaneGeometry,
	BoxGeometry,
	Mesh,
	AmbientLight,
	DirectionalLight,
	PointLight,
	PointLightHelper,
	DirectionalLightHelper,
	WebGLRenderer,
	AxesHelper,
	Vector2,
} from 'three'

function init() {
	const container = document.querySelector('#container')

	// 创建场景
	const scene = new Scene()

	// 创建相机
	const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
	camera.position.set(-30, 45, 35)
	camera.lookAt(scene.position)

	scene.add(camera)

	// 创建一个平面
	const planeGeometry = new PlaneGeometry(100, 100)
	const planeMaterial = new MeshLambertMaterial({
		color: 0xcccccc,
	})
	const plane = new Mesh(planeGeometry, planeMaterial)
	plane.rotation.x = -0.5 * Math.PI
	plane.position.set(15, 0, 0)
	plane.receiveShadow = true
	scene.add(plane)

	// 添加物体
	const cubeGeometry = new BoxGeometry(8, 8, 8)
	const cubeMaterial = new MeshLambertMaterial({ color: 0xffff00 })
	const cube = new Mesh(cubeGeometry, cubeMaterial)
	cube.position.set(4, 4, 4)
	cube.castShadow = true
	scene.add(cube)

	// 创建渲染器
	const renderer = new WebGLRenderer({ antialias: true })
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.shadowMap.enabled = true
	container?.appendChild(renderer.domElement)
	renderer.render(scene, camera)

	gsap.to(cube.rotation, { x: Math.PI, duration: 5, repeat: -1, yoyo: true })

	// 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
	const axesHelper = new AxesHelper(100)
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
	createLight(scene)
	createGUI(cube)
	function animate() {
		requestAnimationFrame(animate)
		controls.update()
		renderer.render(scene, camera)
	}
}
// 创建灯光
function createLight(scene: any) {
	// 环境光
	const light = new AmbientLight(0xaaaaaa) // soft white light
	scene.add(light)
	/* // 点光源
	const potLight = new PointLight()
	potLight.position.set(-30, 30, -25)
	potLight.castShadow = true
	potLight.shadow.mapSize = new Vector2(1024, 1024)
	potLight.shadow.camera.far = 130
	potLight.shadow.camera.near = 40

	scene.add(potLight)

	const lightHelper = new PointLightHelper(potLight, 2)
	scene.add(lightHelper)
 */
	// 平行光
	const directionalLight = new DirectionalLight(0xffffff)
	directionalLight.position.set(100, 20, 30)
	scene.add(directionalLight)

	const directionalLightHelper = new DirectionalLightHelper(directionalLight, 3, 0xc040a2)
	scene.add(directionalLightHelper)
}
// 创建图形化
let gui: any = null
function createGUI(cube: any) {
	if (!gui) {
		gui = new dat.GUI()
	}
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
