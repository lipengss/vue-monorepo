<template>
	<Vue3Odometer class="o-text" theme="digital" :value="number" />
	<button @click="update">update number</button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Vue3Odometer from 'vue3-odometer'
import 'odometer/themes/odometer-theme-digital.css'

const number = ref(100)

function update() {
	number.value = Math.floor(Math.random() * 1000)
}
</script>
