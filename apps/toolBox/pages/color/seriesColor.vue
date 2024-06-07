<template>
	<el-form inline :model="state" ref="formRef">
		<el-form-item prop="color">
			<el-color-picker v-model="state.color" />
		</el-form-item>
		<el-form-item prop="theme">
			<el-radio-group v-model="state.theme">
				<el-radio-button label="dark">深色系</el-radio-button>
				<el-radio-button label="light">亮色系</el-radio-button>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="范围" prop="start">
			<el-input-number :min="0" :max="1" :step="0.1" controls-position="right" v-model="state.start" />
		</el-form-item>
		<el-form-item prop="end">
			<el-input-number :min="0" :max="1" :step="0.1" controls-position="right" v-model="state.end" />
		</el-form-item>
		<el-form-item label="等份" prop="divisions">
			<el-input-number :min="10" :max="100" v-model="state.divisions" />
		</el-form-item>
		<el-form-item>
			<el-button type="warning" plain @click="formRef.resetFields()" :icon="Refresh">重置</el-button>
		</el-form-item>
	</el-form>
	<div class="color-panel">
		<div class="primary-color">{{ state.color }}</div>
		<div class="series-color">
			<div class="color-item" v-for="color in seriesList" :key="color" :style="`background-color:${color}`">
				{{ color }}
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { Refresh } from '@element-plus/icons-vue';
import { useColorFormat } from '~/hooks/useColorFormat';
import numeral from 'numeral';

const formRef = ref();
const state: ColorSeriesState = reactive({
	color: '#409eff',
	theme: 'light',
	start: 0,
	end: 1,
	divisions: 10,
});

const { getDarkColor, getLightColor } = useColorFormat();

const seriesList = computed(() => {
	const { color } = state;
	if (color === null) return [];
	return generateIncrementalValues(state.start, state.end, state.divisions).map((item) => {
		if (state.theme === 'dark') {
			return getDarkColor(color, item);
		} else {
			return getLightColor(color, item);
		}
	});
});

function generateIncrementalValues(start: number, end: number, divisions: number) {
	let step = numeral(numeral(end).subtract(start).value()).divide(divisions).value();
	return Array.from({ length: divisions }).map((item, index) => {
		return numeral(numeral(start).add(index)).multiply(step).value();
	});
}
</script>
<style class="scss" scoped>
.color-panel {
	border-radius: 10px;
	overflow: hidden;
	.primary-color {
		background-color: v-bind('state.color');
	}
	.series-color {
		display: flex;
		flex-wrap: wrap;
		.color-item {
			flex: 1;
		}
	}
	.primary-color,
	.series-color .color-item {
		height: 46px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		color: #fff;
		text-shadow: 1px 1px 1px #000;
	}
}
</style>
