<template>
	<svg class="svg-icon" aria-hidden="true">
		<use :xlink:href="symbolId" :fill="color" />
	</svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'SvgIcon',
	props: {
		prefix: {
			type: String,
			default: 'icon',
		},
		name: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: 'currentColor',
		},
	},
	setup(props) {
		const symbolId = computed(() => `#${props.prefix}-${props.name}`);
		return { symbolId };
	},
});
</script>
<style scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.2em;
	overflow: hidden;
}
</style>
