<template>
	<div>
		<button @click="show = !show">动画</button>
		<transition name="fade" enter-active-class="animated animate__backInDown" leave-active-class="animated backOutDown">
			<div v-if="show">hello world</div>
		</transition>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import 'animate.css'

const show = ref(false)
</script>
<style lang="scss" scoped></style>
