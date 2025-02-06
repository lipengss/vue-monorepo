<template>
	<div class="cesium-container" id="cesiumContainer"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
	Cartesian3,
	Cartesian2,
	Ion,
	Terrain,
	Viewer,
	Math as CesiumMath,
	Color,
	IonImageryProvider,
	VerticalOrigin,
	CzmlDataSource,
	CircleEmitter,
	CircleGeometry,
	DataSource,
} from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { data } from './data.json'

async function init() {
	Ion.defaultAccessToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYzhhNzgzNS0zMjMwLTQwYTMtYjE2Ni0xZjg3OTJiZjAzOWEiLCJpZCI6MjY2MjM2LCJpYXQiOjE3MzU4MDM3MDd9.JhVrUhExn9HL17SLl0GLbJDZAVxZ5Geu3wD98bMslDo'

	const viewer = new Viewer('cesiumContainer', {
		terrain: Terrain.fromWorldTerrain(),
		infoBox: false,
		baseLayerPicker: true,
		imageryProviderViewModels: [],
	})
	const middle = getMiddle(data)
	console.log(middle)
	const [first] = middle
	viewer.camera.setView({
		destination: Cartesian3.fromDegrees(first.tower_longitude, first.tower_latitude, 1000),
	})
	createElements(viewer)
}

function createElements(viewer: Viewer) {
	const dataSourcePromise = CzmlDataSource.load(datsSource())
	viewer.dataSources.add(dataSourcePromise)
	// viewer.entities.add({
	// 	position: Cartesian3.fromDegrees(116.373798, 39.932863, 0),
	// 	point: {
	// 		pixelSize: 10,
	// 		color: Color.RED,
	// 		outlineColor: Color.WHITE,
	// 		outlineWidth: 3,
	// 		disableDepthTestDistance: Number.POSITIVE_INFINITY,
	// 	},
	// 	label: {
	// 		text: 'Hello World',
	// 		verticalOrigin: VerticalOrigin.BOTTOM,
	// 		pixelOffset: new Cartesian3(0, -15),
	// 		disableDepthTestDistance: Number.POSITIVE_INFINITY,
	// 	},
	// })
}

function datsSource() {
	const czml = [
		{
			id: 'document',
			name: 'CZML Point',
			version: '1.0',
		},
		{
			id: 'point 1',
			name: 'point',
			position: {
				cartographicDegrees: [116.419791, 39.924896, 0],
			},
			point: {
				color: {
					rgba: [255, 255, 255, 255],
				},
				outlineColor: {
					rgba: [255, 0, 0, 255],
				},
				outlineWidth: 4,
				pixelSize: 20,
				disableDepthTestDistance: Number.POSITIVE_INFINITY,
			},
			label: {
				text: 'Hello World',
				verticalOrigin: VerticalOrigin.BOTTOM,
				pixelOffset: new Cartesian3(0, -15),
				disableDepthTestDistance: Number.POSITIVE_INFINITY,
			},
		},
		{
			id: 'redLine',
			name: 'Red line clamped to terain',
			polyline: {
				positions: {
					cartographicDegrees: [116.218571, 39.931535, 0, 116.550872, 39.916927, 0],
				},
				material: {
					solidColor: {
						color: {
							rgba: [255, 0, 0, 255],
						},
					},
				},
				width: 5,
				clampToGround: true,
			},
		},
	]

	const towers = data.map((n) => {
		return {
			id: `tower_${n.entry_id}`,
			name: n.entry_name,
			position: {
				cartographicDegrees: [n.tower_longitude, n.tower_latitude, 0],
			},
			// point: {
			// 	color: {
			// 		rgba: [255, 255, 255, 255],
			// 	},
			// 	outlineColor: {
			// 		rgba: [255, 0, 0, 255],
			// 	},
			// 	outlineWidth: 2,
			// 	pixelSize: 12,
			// 	disableDepthTestDistance: Number.POSITIVE_INFINITY,
			// },
			label: {
				text: n.entry_name,
				font: '12px sans-serif',
				verticalOrigin: VerticalOrigin.BOTTOM,
				pixelOffset: new Cartesian2(0, -9), // Adjusted offset to separate text and point
				disableDepthTestDistance: Number.POSITIVE_INFINITY,
				showBackground: true,
				backgroundColor: new Color(173, 216, 230, 1),
				backgroundPadding: new Cartesian2(10, 10),
			},
		}
	})

	const line = data.map((n, index, arr) => {
		const nextTower = index + 1 < arr.length ? arr[index + 1] : arr[arr.length - 1]
		return {
			id: `line_${n.entry_id}`,
			name: n.entry_name,
			polyline: {
				positions: {
					cartographicDegrees: [n.tower_longitude, n.tower_latitude, 0, nextTower.tower_longitude, nextTower.tower_latitude, 0],
				},
				material: {
					solidColor: {
						color: {
							rgba: [255, 0, 0, 255],
						},
					},
				},
				width: 2,
				clampToGround: true,
			},
		}
	})
	return [
		{
			id: 'document',
			name: 'CZML Point',
			version: '1.0',
		},
		...towers,
		...line,
	]
}

function getMiddle(array: Array<any>) {
	const length = array.length
	if (length % 2 === 1) {
		return array[Math.floor(length / 2)]
	} else {
		return array.slice(length / 2 - 1, length / 2 + 1)
	}
}

onMounted(() => {
	init()
})
</script>
<style lang="scss" scoped>
.cesium-container {
	width: 100%;
	height: 100%;
}
</style>
