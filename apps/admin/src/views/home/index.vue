<template>
	<div class="grid-box">
		<div class="box">
			<arc />
		</div>
		<div class="box">
			<odometer />
		</div>
		<div class="box">
			<grid />
		</div>
		<div class="box">
			<Algorithms />
		</div>
		<div class="box"></div>
		<div class="box"></div>
		<div class="box"></div>
	</div>
</template>

<script lang="ts" setup>
import arc from './component/arc.vue'
import odometer from './component/odometer.vue'
import grid from './component/grid.vue'
import Algorithms from './component/Algorithms.vue'
</script>

<style lang="scss">
.grid-box {
	display: grid;
	grid-template-columns: repeat(auto-fill, 300px);
	grid-gap: 16px;
	.box {
		border: 1px solid #eee;
	}
}
</style>
