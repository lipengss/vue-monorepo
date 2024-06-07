<template>
	<el-space wrap>
		<el-color-picker :model-value="state.colorPickerValue" color-format="rgb" @change="onColorPickerChange" />
		<el-input v-model="state.rgbValue" placeholder="输入如: 255,182,193" @change="onRgbaToHex">
			<template #prepend>RGB</template>
		</el-input>
		<el-button type="primary" :color="state.hexValue" @click="onRgbaToHex(state.rgbValue)">
			<el-icon><svg-icon name="arrow-right" /></el-icon>
		</el-button>
		<el-input v-model="state.hexValue" maxlength="7" readonly clearable>
			<template #prepend>HEX</template>
			<template #append>
				<el-button @click="onCopy(`${state.hexValue} 复制成功!`)">复制</el-button>
			</template>
		</el-input>
		<el-button type="danger" :icon="Delete" plain @click="onClear">清空</el-button>
	</el-space>
</template>
<script setup lang="ts">
import { reactive, toRef } from 'vue';
import { Right, Delete } from '@element-plus/icons-vue';
import { useColorFormat } from '~/hooks/useColorFormat';
import { useCopy } from '~/hooks/useCopy';
const { rgbToHex } = useColorFormat();

const state = reactive({
	hexValue: '',
	rgbValue: '',
	colorPickerValue: '',
});

const { onCopy } = useCopy(toRef(state, 'rgbValue'));

function onRgbaToHex(val: string) {
	if (!val) return;
	let strArr = val.split(',');
	const color1 = parseInt(strArr[0]);
	const color2 = parseInt(strArr[1]);
	const color3 = parseInt(strArr[2]);
	state.rgbValue = `${color1},${color2},${color3}`;
	state.colorPickerValue = `rgb(${state.rgbValue})`;
	const hexColor = rgbToHex(color1, color2, color3);
	state.hexValue = hexColor;
}

function onClear() {
	state.hexValue = '';
	state.rgbValue = '';
	state.colorPickerValue = '';
}

let regex = /\((.+?)\)/g;

function onColorPickerChange(color: string) {
	let colorstr = color.match(regex);
	if (colorstr && colorstr.length) {
		let str = colorstr[0];
		str = str.substring(1, str.length - 1);
		onRgbaToHex(str);
	}
}
</script>
