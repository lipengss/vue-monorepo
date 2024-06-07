import * as THREE from 'three'
import { merge } from 'lodash'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

interface Opt {
	el: string
	camera: {
		fov: number
		near: number
		far: number
		position: {
			x: number
			y: number
			z: number
		}
	}
}

const defaultOption = {
	el: '',
	camera: {
		fov: 45,
		near: 1,
		far: 3000,
		position: {
			x: 299,
			y: 233,
			z: 185,
		},
	},
}

class Three {
	option: Opt
	scene: any // 场景
	controls: any // 轨道控制器
	camera: any // 相机
	renderer: any // 渲染器
	domContainer: HTMLElement | null
	mixer: any
	clock: any
	stats: any
	container: {
		width: number
		height: number
	}
	constructor(option: any) {
		this.option = merge(defaultOption, option)

		this.domContainer = null
		this.scene = null
		this.controls = null
		this.camera = null
		this.renderer = null
		this.mixer = null
		this.clock = null
		this.container = {
			width: 0,
			height: 0,
		}
		this.stats = new Stats()
		this.init()
		this.setClock()
	}
	init() {
		// (1) 设置容器和场景
		this.setScene()
		// (2) 设置相机
		this.setCamera()
		// (2) 渲染器
		this.setRenderer()
		// 轨道控制器
		this.setControls()
		this.renderLoop()
		// 坐标轴
		this.setAxes()
	}
	setScene() {
		this.domContainer = document.querySelector(this.option.el) as HTMLElement
		const { clientWidth, clientHeight } = this.domContainer
		this.container.width = clientWidth
		this.container.height = clientHeight
		this.scene = new THREE.Scene()
	}
	setCamera() {
		this.camera = new THREE.PerspectiveCamera()
		// 摄像机视锥体垂直视野角度
		this.camera.fov = this.camera.fov || 45
		// 摄像机视锥体长宽比
		this.camera.aspect = this.container.width / this.container.height
		// 摄像机视锥体近端面
		this.camera.near = this.camera.near || 1
		// 摄像机视锥体远端面
		this.camera.far = this.camera.far || 3000
		this.camera.position.set(299, 233, 185)
		this.camera.lookAt(0, 0, 0)
		this.scene.add(this.camera)
	}
	setControls() {
		this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		this.controls.enableDamping = true
	}
	setAxes() {
		const axesHelper = new THREE.AxesHelper(100)
		this.scene.add(axesHelper)
	}
	setRenderer() {
		if (!this.domContainer) return
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
		})
		this.renderer.setSize(this.container.width, this.container.height)
		this.domContainer.appendChild(this.renderer.domElement)
	}
	renderLoop() {
		this.controls.update()
		const dt = this.clock?.getDelta()
		if (this.mixer) this.mixer.update(dt)
		requestAnimationFrame(this.renderLoop.bind(this))
		this.renderer.render(this.scene, this.camera)
		this.stats.update()
	}
	setClock() {
		this.clock = new THREE.Clock()
	}
	setAnimationMixer(model: any) {
		this.mixer = new THREE.AnimationMixer(model)
	}
}
export default Three
