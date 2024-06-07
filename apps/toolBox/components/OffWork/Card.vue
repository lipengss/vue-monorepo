<template>
	<div class="off-work" @click="emits('showDialog')">
		<div class="title">下班还有</div>
		<ClientOnly>
			<div class="time">{{ state.displayText }}</div>
		</ClientOnly>
		<div class="card" v-if="props.settings.showItem">
			<div class="card-item" v-if="props.settings.showItem.includes('payDay')">
				<div class="card-item-title">发薪</div>
				<div class="card-item-content">{{ payDay }}</div>
				<div class="day">天</div>
			</div>
			<div class="card-item" v-if="props.settings.showItem.includes('fromFriday')">
				<div class="card-item-title">周五</div>
				<div class="card-item-content">{{ fromFriday }}</div>
				<div class="day">天</div>
			</div>
			<div class="card-item" v-if="props.settings.showItem.includes('nextFestival')">
				<div class="card-item-title">{{ holidays.name }}</div>
				<div class="card-item-content">{{ holidays.diff }}</div>
				<div class="day">天</div>
			</div>
			<div class="card-item" v-if="props.settings.showItem.includes('income')">
				<div class="card-item-title">今天赚了</div>
				<div class="card-item-content">{{ state.currentSalary }}</div>
				<div class="day">￥</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { useDateFormat } from '~/hooks/useDateFormat';
const { dayjs, weekFormat } = useDateFormat();
const { $Solar, $HolidayUtil } = useNuxtApp();

interface Props {
	settings: {
		showItem: Array<string>;
		payday: number;
		workHours: [string, string];
		income: number;
		color: string;
		bgColor: string;
		workday: string[];
	};
}

const props = withDefaults(defineProps<Props>(), {});

const state = reactive({
	displayText: '00:00:00',
	currentSalary: 0,
});

// 节日安排
const holidays = computed(() => {
	const date = dayjs();
	const result: Array<HolidayItem> = [];
	$HolidayUtil.getHolidays(date.year()).forEach((holiday) => {
		const exists = result.some((a) => {
			return a.name == holiday.getName();
		});
		if (!exists) {
			const now = $Solar.fromDate(dayjs(holiday.getDay()).toDate());
			const target = $Solar.fromDate(dayjs(date).toDate());
			result.push({ name: holiday.getName(), date: holiday.getDay(), diff: now.subtract(target) });
		}
	});

	return result.filter((item) => item.diff > 0)[0] || { name: '', date: '', diff: 0 };
});

const emits = defineEmits(['showDialog']);

const fromFriday = computed(() => {
	const week = dayjs().weekday();
	if (5 >= week) {
		return 5 - week;
	} else {
		return 0;
	}
});

const startTime = computed(() => {
	const [h, m, s] = props.settings.workHours[0].split(':');
	const startTime = dayjs().hour(parseInt(h)).minute(parseInt(m)).second(parseInt(s));
	return startTime;
});

const targetTime = computed(() => {
	const [h, m, s] = props.settings.workHours[1].split(':');
	const targetTime = dayjs().hour(parseInt(h)).minute(parseInt(m)).second(parseInt(s));
	return targetTime;
});

// 发薪日
const payDay = computed(() => {
	const now = dayjs().format('YYYY-MM-DD');
	const day = parseInt(dayjs().format('D'));
	if (day > props.settings.payday) {
		const nextMonth = dayjs().add(1, 'month');
		const payDay = dayjs(nextMonth).set('date', props.settings.payday).format('YYYY-MM-DD');
		return dayjs(payDay).diff(now, 'day');
	} else {
		const payDay = dayjs().set('date', props.settings.payday).format('YYYY-MM-DD');
		return dayjs(payDay).diff(now, 'day');
	}
});
// 下班倒计时
const updateDisplayText = () => {
	const now = dayjs();
	if (now.isAfter(targetTime.value)) {
		state.displayText = '休 息 时 间 啦';
	} else {
		const diff = dayjs(targetTime.value).diff(now);
		const duration = dayjs.duration(diff).format('HH:mm:ss');
		state.displayText = duration;
	}
};
function calculateSalary() {
	const currentTime = dayjs();
	if (currentTime.isBetween(startTime.value, targetTime.value)) {
		const totalSeconds = dayjs(targetTime.value).diff(dayjs(startTime.value), 'second');
		const currentSeconds = currentTime.diff(dayjs(startTime.value), 'second');
		const increnmentRate = currentSeconds / totalSeconds;
		state.currentSalary = parseFloat((props.settings.income * increnmentRate).toFixed(1));
	} else {
		state.currentSalary = 0;
	}
}

function isWork() {
	const week = weekFormat[dayjs().weekday()];
	const { workday } = props.settings;
	if (workday && workday.includes(week)) {
		// 更新倒计时
		updateDisplayText();
		setInterval(updateDisplayText, 1000);
	} else {
		state.displayText = '休 息 时 间 啦';
	}
}

onMounted(() => {
	isWork();
	calculateSalary();
	setInterval(calculateSalary, 1000);
});

watch(
	() => props.settings.workday,
	() => {
		isWork();
	},
	{
		deep: true,
	}
);
</script>
<style lang="scss" scoped>
.off-work {
	width: 100%;
	height: 100%;
	padding: 8px 10px 10px 10px;
	box-sizing: border-box;
	background-color: v-bind('props.settings.bgColor');
	background-image: url('~/assets/img/boy.svg');
	background-repeat: no-repeat;
	background-size: 130px;
	background-position: 95% center;
	color: v-bind('props.settings.color');
	.time {
		font-size: 28px;
		font-weight: bold;
	}
	.card {
		display: flex;
		.card-item {
			padding: 4px 10px;
			background-color: rgba(255, 255, 255, 0.1);
			text-align: center;
			border-radius: 8px;
			&:not(:last-child) {
				margin-right: 6px;
			}
			line-height: 20px;
			.card-item-title {
				font-size: 12px;
			}
			.card-item-content {
				font-size: 14px;
				font-weight: bold;
			}
			.day {
				font-size: 12px;
			}
		}
	}
}
</style>
