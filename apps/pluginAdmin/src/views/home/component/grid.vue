<template>
	<div class="grid-demo">
		<div class="item">1</div>
		<div class="item">2</div>
		<div class="item">3</div>
		<div class="item">4</div>
		<div class="item">5</div>
		<div class="item">6</div>
		<div class="item">7</div>
		<div class="item">8</div>
		<div class="item">9</div>
	</div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.grid-demo {
	height: 100%;
	display: grid;
	grid-gap: 10px;
	grid-template-areas: 'a b c' 'd e f' 'g h i';
	.item {
		display: grid;
		text-align: center;
		align-items: center;
		border: 1px solid pink;
	}
}
</style>
