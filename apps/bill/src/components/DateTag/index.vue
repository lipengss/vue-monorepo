<template>
	<div class="expenses" @click="showPicker = true">{{ dayjs(props.value).format(props.showFormat) }} <van-icon name="arrow-down" /></div>
	<van-popup v-model:show="showPicker" position="bottom" :style="{ height: '40%' }" @open="setDate()">
		<van-date-picker
			v-model="dateValue"
			title="选择日期"
			:min-date="new Date(2020, 0, 1)"
			:max-date="new Date()"
			:columnsType="props.columnsType"
			@confirm="onComfirm"
			@cancel="showPicker = false"
		/>
	</van-popup>
</template>
<script setup lang="ts">
import { withDefaults, defineProps, ref, defineEmits, watch } from 'vue';
import type { DatePickerColumnType } from 'vant';
import { dayjs } from '@common/utils';

interface Props {
	value: string; // 值
	bgColor?: string; // 背景颜色
	color?: string; // 文字颜色
	showFormat?: string;
	valueFormat?: string;
	columnsType?: DatePickerColumnType[];
}
const props = withDefaults(defineProps<Props>(), {
	value: '',
	bgColor: '#f7f8fa',
	color: '#969799',
	showFormat: 'MM月DD日',
	valueFormat: 'YYYY-MM-DD',
	columnsType: () => ['year', 'month', 'day'],
});

const showPicker = ref(false);

const emits = defineEmits(['update:value']);

function onComfirm(date: any) {
	emits('update:value', date.selectedValues.join('-'));
	showPicker.value = false;
}

const dateValue = ref<string[]>([]);

function setDate() {
	dateValue.value = dayjs(props.value).format(props.value).split('-');
}

watch(() => props.value, setDate, {
	immediate: true,
});
</script>
<style lang="scss" scoped>
.expenses {
	padding: 4px 16px;
	border-radius: 4px;
	background-color: v-bind('props.bgColor');
	color: v-bind('props.color');
}
</style>
