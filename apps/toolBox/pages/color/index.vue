<template>
	<div class="container">
		<TwoColumnLayout :anchor-points="anchorPoints">
			<template v-for="item in anchorPoints" :key="item.id">
				<el-card :header="`# ${item.name}`" :id="item.id">
					<component :is="item.component" />
				</el-card>
				<el-divider>分割线</el-divider>
			</template>
		</TwoColumnLayout>
	</div>
</template>
<script setup lang="ts">
import hexTorgb from './hexTorgb.vue';
import rgbTohex from './rgbTohex.vue';
import seriesColor from './seriesColor.vue';

definePageMeta({
	title: '颜色处理',
	rank: 300,
	icon: 'menu-color',
});

const anchorPoints = [
	{
		name: 'HEX转RGB',
		id: 'hexToRgb',
		component: hexTorgb,
	},
	{
		name: 'RGB转HEX',
		id: 'rgbTohex',
		component: rgbTohex,
	},
	{
		name: '生成系列色',
		id: 'seriesColor',
		component: seriesColor,
	},
];
</script>
