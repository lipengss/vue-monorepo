<template>
	<div class="container">
		<!--  @mousemove="onmousemove" -->
		<div class="wrapper" ref="wrapperRef">
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
			<div class="box"></div>
		</div>
		<div class="wrapper-text">
			<div>{{ state.clinetWidth }} * {{ state.clinetHeight }}</div>
			<div>X:{{ state.clientX }} Y:{{ state.clientY }}</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

const wrapperRef = ref();

const state = reactive({
	show: false,
	tipData: {
		name: '',
	},
	clinetWidth: 0,
	clinetHeight: 0,
	clientX: 0,
	clientY: 0,
});

function onmousemove(event: any) {
	const { clientX, clientY, target } = event;
	state.clientX = clientX;
	state.clientY = clientY;
	const toolTip = document.getElementById('tooltip');
	if (!toolTip) return;
	setLine();
	if (target.getAttribute('class') === 'box') {
		const { name } = target.dataset;
		state.tipData.name = name;
		toolTip.style.display = 'block';
		setTimeout(() => {
			const { offsetWidth: toolTipWidth, offsetHeight: toolTipHeight } = toolTip;
			toolTip.style.left = `${clientX}px`;
			toolTip.style.top = `${clientY}px`;
			const distanceX = state.clinetWidth - clientX;
			if (distanceX < toolTipWidth) {
				toolTip.style.left = `${clientX - toolTipWidth}px`;
			}
			const distanceY = state.clinetHeight - clientY;
			if (distanceY < toolTipHeight) {
				toolTip.style.top = `${clientY - toolTipHeight}px`;
			}
		});
	} else {
		toolTip.style.display = 'none';
	}
}

function setLine() {
	const xLine = document.getElementById('x-line');
	const yLine = document.getElementById('y-line');
	if (xLine && yLine) {
		const { clientX, clientY } = state;
		xLine.style.width = `${clientX}px`;
		xLine.style.top = `${clientY}px`;
		yLine.style.left = `${clientX}px`;
		yLine.style.height = `${clientY}px`;
	}
}

function init() {
	const { innerWidth, innerHeight } = window;
	state.clinetWidth = innerWidth - 20;
	state.clinetHeight = innerHeight - 20;

	const boxList = document.querySelectorAll('.box');
	boxList.forEach((box, index) => {
		box.setAttribute('data-name', `${index + 1}号房间`);
	});

	window.addEventListener('mousemove', (event: Event) => {
		onmousemove(event);
	});
}

onMounted(() => {
	init();
});
</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	padding: 100px;
	position: relative;
	box-sizing: border-box;
	position: relative;
	background-color: pink;
	.wrapper {
		width: 100%;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
		padding: 20px;
		display: grid;
		grid-template-columns: repeat(auto-fill, 60px);
		grid-template-rows: repeat(auto-fill, 60px);
		grid-auto-flow: dense;
		grid-gap: 20px;
		background-color: antiquewhite;
		.box {
			height: 60px;
			background-color: skyblue;
			cursor: pointer;
		}
	}
	.wrapper-text {
		width: 200px;
		padding: 4px 10px;
		border-radius: 4px;
		border: 1px solid yellow;
		position: absolute;
		left: calc(50% - 100px);
		top: 40px;
		background-color: #fff;
	}
}
</style>
