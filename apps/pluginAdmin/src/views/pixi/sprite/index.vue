<template>
	<div class="container">
		<!-- <svg width="100%" height="100%" viewBox="-20 0 557 190" id="svg">
			<circle cx="100" cy="100" r="3" />
			<circle cx="300" cy="20" r="3" />
			<path
				id="path"
				d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
			/>
			<g id="rect">
				<rect width="85" height="30" fill="dodgerblue" />
				<text x="10" y="19" font-size="14">SVG &lt;rect&gt;</text>
			</g>
		</svg> -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			id="svg"
			width="1920"
			height="1080"
			viewBox="0 0 1920 1080"
			fill="none"
		>
			<path
				id="path"
				stroke="rgba(128, 128, 128, 1)"
				stroke-width="4"
				d="M58 101.5C58 101.5 279.206 195.54 344.5 345.5C409.794 495.46 221.236 628.817 326.5 754C431.764 879.183 581.833 892.498 706 803C830.167 713.502 724.97 659.891 752 568C779.03 476.109 743.357 475.233 814.5 411C885.643 346.767 909.834 334.322 1045 345.5C1180.17 356.678 1222.55 430.158 1351.5 490.5C1480.45 550.842 1543.46 695.648 1674.5 640C1805.54 584.352 1719.73 501.705 1754 411C1788.27 320.295 1839.5 202 1839.5 202"
			></path>
			<g id="rect">
				<rect width="85" height="30" fill="dodgerblue" />
				<text x="10" y="19" font-size="14" fill="#fff">SVG &lt;rect&gt;</text>
			</g>
		</svg>
	</div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import init from './init'
import useGsap from './initGsap'

const { initGsap, play, resume, restart, pause } = useGsap()

onMounted(() => {
	initGsap()
})
</script>
<style>
.container {
	width: 100%;
	height: 100%;
	background-color: #000;
	svg {
		overflow: visible;
		height: 100%;

		/* Fix Safari rendering bug */
		transform: translateZ(0);
	}

	path {
		stroke-width: 2;
		stroke: gray;
	}
}
.box {
	width: 100px;
	height: 100px;
	border-radius: 4px;
	background-color: var(--color);
}
</style>
