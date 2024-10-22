<template>
	<div id="webGl" class="webGl"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import Three from './three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import Stats from 'three/examples/jsm/libs/stats.module'

let gui, mixer: any, actions: any, clock: any, stats: any

let previousAction, activeAction: any, face

const api: any = { state: 'Walking' }

let three: any = null

onMounted(() => {
	three = new Three({
		el: '#webGl',
		camera: {
			fov: 45,
			near: 0.25,
			far: 100,
		},
	})
	// createBox(three.scene)
	setLight()
	forkTruck()
	// animate(three.renderer, three.scene, three.camera)
})

function setLight() {
	// 可视点光源
	const light = new THREE.PointLight(0xffffff, 1)
	light.position.set(120, 100, 100)
	three.scene.add(light)
	// 环境光
	const amlight = new THREE.AmbientLight(0x404040)
	three.scene.add(amlight)
}

function forkTruck() {
	const loader = new GLTFLoader()
	loader.setPath('/src/assets/model/').load(
		'RobotExpressive.glb',
		(gltf) => {
			const model = gltf.scene
			three.scene.add(model)
			createGUI(model, gltf.animations)
		},
		undefined,
		(err) => {
			console.log(err)
		}
	)
}

clock = new THREE.Clock()

// 创建动画动作
function createGUI(model: any, animations: any) {
	const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing']
	const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']
	gui = new GUI()
	// 用于场景中特定对象的动画的播放器
	// mixer = new THREE.AnimationMixer(model)
	three.setAnimationMixer(model)
	actions = {}
	for (let i = 0; i < animations.length; i++) {
		const clip = animations[i]
		const action = three.mixer.clipAction(clip)
		actions[clip.name] = action
		if (emotes.includes(clip.name) || states.includes(clip.name)) {
			action.clampWhenFinished = true
			action.loop = THREE.LoopOnce
		}
	}
	// states
	const statesFolder = gui.addFolder('States')
	const clipCtrl = statesFolder.add(api, 'state').options(states)
	clipCtrl.onChange(() => {
		fadeToAction(api.state, 0.5)
	})
	statesFolder.open()
	// emotes
	const emoteFolder = gui.addFolder('Emotes')
	function createEmoteCallback(name: any) {
		api[name] = () => {
			fadeToAction(name, 0.2)
			three.mixer.addEventListener('finished', restoreState)
		}
		emoteFolder.add(api, name)
	}
	function restoreState() {
		three.mixer.removeEventListener('finished', restoreState)
		fadeToAction(api.state, 0.2)
	}
	for (let i = 0; i < emotes.length; i++) {
		createEmoteCallback(emotes[i])
	}
	emoteFolder.open()

	// expressions
	face = model.getObjectByName('Head_4')

	const expressions = Object.keys(face.morphTargetDictionary)
	const expressionFolder = gui.addFolder('Expressions')

	for (let i = 0; i < expressions.length; i++) {
		expressionFolder.add(face.morphTargetInfluences, i, 0, 1, 0.01).name(expressions[i])
	}

	activeAction = actions['Walking']
	activeAction.play()

	expressionFolder.open()
}

function fadeToAction(name: any, duration: any) {
	previousAction = activeAction
	activeAction = actions[name]

	if (previousAction !== activeAction) {
		previousAction.fadeOut(duration)
	}

	activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play()
}
stats = new Stats()

// function animate(renderer, scene, camera) {
// 	const dt = clock.getDelta()

// 	if (mixer) mixer.update(dt)

// 	requestAnimationFrame(animate)

// 	renderer.render(scene, camera)

// 	stats.update()
// }
</script>
<style lang="scss" scoped>
.webGl {
	height: 800px;
	border: 2px solid red;
	border-radius: 6px;
}
</style>
