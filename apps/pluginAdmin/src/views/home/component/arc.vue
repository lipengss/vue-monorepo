<template>
	<svg width="300" height="300">
		<!-- 
				M30 90 表示：x:30 y:90 （开始点）
				Q115 139 表示： x:115 y: 139 (控制点)
				200 90 表示：x:200 y:90 （结束点）
			 -->
		<path class="tower" d="M30 80 30 180" stroke="#666" stroke-width="6"></path>
		<path class="lines" :d="`M30 90 Q${pos[0].x} ${pos[0].y} 280 90`" fill="none" stroke="#000" stroke-width="2"></path>
		<path class="tower" d="M280 80 280 180" stroke="#666" stroke-width="6"></path>
	</svg>
</template>
<script setup lang="ts">
import { ref } from 'vue'
interface Postion {
	start: [number, number]
	end: [number, number]
	angle: number
}

const pos = ref()

pos.value = getPostion({
	start: [30, 90],
	end: [280, 90],
	angle: 40,
})

function getPostion({ start, end, angle }: Postion) {
	const x1 = start[0]
	const y1 = start[1]
	const x2 = end[0]
	const y2 = end[1]
	const PI = Math.PI
	// 俩点间的x轴夹角弧度
	let xAngle = Math.atan2(y2 - y1, x2 - x1)
	// 转为角度
	xAngle = (360 * xAngle) / (2 * PI)
	// 两点间的长度
	const L = Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1))
	// 计算等腰三角形斜边长度
	const L2 = L / 2 / Math.cos((angle * 2 * PI) / 360)
	// 求第一个顶点坐标，位于下边
	const val1 = { x: 0, y: 0 }
	// 求第二个顶点坐标，位于上边
	const val2 = { x: 0, y: 0 }
	val1['x'] = x1 + Math.round(L2 * Math.cos(((xAngle + angle) * 2 * PI) / 360))
	val1['y'] = y1 + Math.round(L2 * Math.sin(((xAngle + angle) * 2 * PI) / 360))
	val2['x'] = x1 + Math.round(L2 * Math.cos(((xAngle - angle) * 2 * PI) / 360))
	val2['y'] = y1 + Math.round(L2 * Math.sin(((xAngle - angle) * 2 * PI) / 360))
	return [val1, val2]
}
</script>
