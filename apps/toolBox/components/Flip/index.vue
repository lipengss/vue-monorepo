<template>
	<div ref="tickRef" class="tick">
		<div data-repeat="true" aria-hidden="true">
			<span data-view="flip"></span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, defineProps, withDefaults } from 'vue';

interface Props {
	value: number;
}

const props = withDefaults(defineProps<Props>(), {
	value: 0,
});

const { $Tick } = useNuxtApp();

const tickRef = ref();

onMounted(() => {
	$Tick.DOM.create(tickRef.value, {
		time: props.value,
	});
});
</script>
<style lang="scss" scoped>
:deep .tick-credits {
	display: none;
}
</style>
