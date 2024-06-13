<template>
	<div class="expenses" @click="showPicker = true">{{ dayjs(props.value).format(props.showFormat) }} <van-icon name="arrow-down" /></div>
  <van-calendar v-model:show="showPicker" type="single" :show-confirm="false" :default-date="dayjs(props.value).toDate()" :min-date="new Date(2022,1,1)" @confirm="onConfirm" />
</template>
<script setup lang="ts">
import { withDefaults, defineProps, ref, defineEmits, watch } from 'vue';
import { dayjs } from '@common/utils/src';

interface Props {
	value: string; // 值
	bgColor?: string; // 背景颜色
	color?: string; // 文字颜色
	showFormat?: string;
}
const props = withDefaults(defineProps<Props>(), {
	value: '',
	bgColor: '#f7f8fa',
	color: '#969799',
	showFormat: 'MM月DD日',
});
const showPicker = ref(false);

const emits = defineEmits(['update:value']);

function onConfirm(value: Date) {
  showPicker.value = false;
  console.log('x', dayjs(props.value).format())
  const date = dayjs(value).hour(dayjs().hour()).minute(dayjs().minute()).second(dayjs().second()).format('YYYY-MM-DD HH:mm:ss');
  emits('update:value', date);
  // date.value = formatDate(value);
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
