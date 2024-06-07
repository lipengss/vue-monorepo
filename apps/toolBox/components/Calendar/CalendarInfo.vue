<template>
	<el-row>
		<el-col :xs="24" :md="17" :xl="17">
			<el-calendar v-model="state.date" ref="calendar">
				<template #header="{ date }">
					<el-space :wrap="false">
						<el-button-group>
							<el-button @click="selectDate('prev-year')" :icon="DArrowLeft" />
							<el-button @click="selectDate('prev-month')" :icon="ArrowLeft" />
						</el-button-group>
						<el-date-picker v-model="state.date" type="month" :clearable="false" placeholder="日期" style="width: 120px" />
						<el-button-group>
							<el-button @click="selectDate('next-month')" :icon="ArrowRight" />
							<el-button @click="selectDate('next-year')" :icon="DArrowRight" />
						</el-button-group>
						<el-button v-if="!isToday(state.date)" type="primary" circle @click="selectDate('today')">今</el-button>
						<el-select style="width: 120px" placeholder="节日安排" v-model="state.holiday">
							<el-option v-for="item in holidays" :key="item.date" :label="item.name" :value="item.date" />
						</el-select>
					</el-space>
				</template>
				<template #date-cell="{ data: { date } }">
					<div class="date" :class="formatHoliday(date).cls">
						<div class="day">{{ format(date, 'DD') }}</div>
						<div class="lunar-day singe-line" :class="formatLunar(date).lightColor" :title="formatLunar(date).text">{{ formatLunar(date).text }}</div>
						<div class="holiday" v-if="formatHoliday(date).text !== ''">
							{{ formatHoliday(date).text }}
						</div>
					</div>
				</template>
			</el-calendar>
		</el-col>
		<el-col :xs="24" :md="7" :xl="7">
			<div class="date-info">
				<div class="day-info">
					<div class="date">{{ format(state.date, 'YYYY年MM月DD日') }}</div>
					<div class="day">
						{{ format(state.date, 'D') }}
					</div>
					<div>{{ state.yearGanZhi }}（{{ state.yearShengXiao }}）年</div>
					<div class="lunar">{{ lunarDate.month }}月 {{ lunarDate.day }}</div>
					<div class="week">本年第{{ dayOfYear(state.date) }}天 第{{ week(state.date) }}周</div>
				</div>
				<ul class="more-info">
					<li class="item">
						<div class="tag" style="--color: #f56c6c">生肖</div>
						<div>{{ state.yearShengXiao }}</div>
					</li>
					<li class="item">
						<div class="tag" style="--color: #eb7dac">星座</div>
						<div>{{ state.xingZuo }}座</div>
					</li>
					<li class="item" v-if="state.festivals !== ''">
						<div class="tag" style="--color: #409eff">节日</div>
						<div>{{ state.festivals }}</div>
					</li>
					<li class="item">
						<div class="tag" style="--color: #67c23a">宜</div>
						<div>{{ state.yi }}</div>
					</li>
					<li class="item">
						<div class="tag" style="--color: #f56c6c">忌</div>
						<div>{{ state.ji }}</div>
					</li>
				</ul>
				<ul class="more-holidays">
					<li v-for="item in holidays.filter((item) => item.diff > 0)" :key="item.name" class="item">
						<span class="text">距离 {{ item.name }} 还有</span>
						<span class="days">
							<span>{{ item.diff }}</span> <span>天</span>
						</span>
					</li>
				</ul>
			</div>
		</el-col>
	</el-row>
</template>
<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import { reactive, onMounted, watch } from 'vue';
import { DArrowLeft, ArrowLeft, ArrowRight, DArrowRight } from '@element-plus/icons-vue';
import type { CalendarDateType, CalendarInstance } from 'element-plus';
import { useDateFormat } from '~/hooks/useDateFormat';

const { dayjs, format, isToday, dayOfYear, week } = useDateFormat();
const { $Solar, $HolidayUtil } = useNuxtApp();

const calendar = ref<CalendarInstance>();

const state: StateCalendar = reactive({
	date: new Date(),
	year: 0,
	month: 0,
	day: 0,
	holiday: '', // 节日
	yearGanZhi: '', // 八字
	yearShengXiao: '', // 生肖
	xingZuo: '', // 星座
	festivals: '', // 节日
	yi: '', // 好运
	ji: '', // 禁止
});

const selectDate = (val: CalendarDateType) => {
	if (!calendar.value) return;
	calendar.value.selectDate(val);
};

// 农历的月和日
const lunarDate = computed(() => {
	const lunar = $Solar.fromDate(state.date).getLunar();
	return {
		month: lunar.getMonthInChinese(),
		day: lunar.getDayInChinese(),
	};
});

// 节日安排
const holidays = computed(() => {
	const result: Array<HolidayItem> = [];
	$HolidayUtil.getHolidays(state.year).forEach((holiday) => {
		const exists = result.some((a) => {
			return a.name == holiday.getName();
		});
		if (!exists) {
			const now = $Solar.fromDate(dayjs(holiday.getDay()).toDate());
			const target = $Solar.fromDate(dayjs(state.date).toDate());
			result.push({ name: holiday.getName(), date: holiday.getDay(), diff: now.subtract(target) });
		}
	});
	return result;
});

// 获取农历
function formatLunar(date: Date) {
	const _date = dayjs(date);
	const holiday = $HolidayUtil.getHoliday(_date.year(), _date.month() + 1, _date.date());
	const solar = $Solar.fromDate(date);
	const lunar = solar.getLunar();
	let text = lunar.getDayInChinese();
	let lightColor = '';
	let otherFestivals = lunar.getOtherFestivals();
	if (otherFestivals.length > 0) {
		text = otherFestivals[0];
		lightColor = 'lightColor';
	}
	let festivals = solar.getFestivals();
	if (festivals.length > 0) {
		text = festivals[0];
		lightColor = 'lightColor';
	}
	if (_date.format('YYYY-MM-DD') === holiday?.getTarget()) {
		text = holiday.getName();
		lightColor = 'lightColor';
	}
	return {
		text,
		lightColor,
	};
}

// 获取节假日
function formatHoliday(date: Dayjs) {
	const _date = dayjs(date);
	const holiday = $HolidayUtil.getHoliday(_date.year(), _date.month() + 1, _date.date());
	const obj = {
		text: '',
		cls: '',
	};
	if (holiday === null) {
		obj.text = '';
	} else if (holiday.isWork()) {
		obj.text = '班';
		obj.cls = 'primary';
	} else {
		obj.text = '休';
		obj.cls = 'light';
	}
	return obj;
}

function setDateInfo() {
	const solar = $Solar.fromDate(state.date);
	const lunar = solar.getLunar();
	state.yearGanZhi = lunar.getYearInGanZhi();
	state.yearShengXiao = lunar.getYearShengXiao();
	state.yi = lunar.getDayYi().join('，');
	state.ji = lunar.getDayJi().join('，');
	state.xingZuo = solar.getXingZuo();
	state.festivals = solar.getFestivals().join(',');
}

function initCalendar() {
	state.date = new Date();
	const _date = dayjs(state.date);
	state.year = _date.year();
	state.month = _date.month() + 1;
	state.day = _date.date();
	setDateInfo();
}

onMounted(() => {
	initCalendar();
});

watch(
	() => state.holiday,
	(date) => {
		state.date = dayjs(date).toDate();
	}
);
watch(
	() => state.date,
	() => {
		setDateInfo();
	}
);
</script>

<style lang="scss" scoped>
.date {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	.day {
		font-size: 18px;
		font-weight: bold;
	}
	.lunar-day {
		width: 100%;
		font-size: 11px;
		padding: 0 4px;
		box-sizing: border-box;
		text-align: center;
		color: var(--el-text-color-placeholder);
	}
	.lightColor {
		color: var(--el-color-primary);
	}
	.holiday {
		position: absolute;
		right: 4px;
		top: 4px;
		padding: 2px 4px;
		font-size: 12px;
		border-radius: 4px;
		color: #fff;
	}
}
.next .light {
	background-color: var(--el-color-error-light-9);
	color: var(--el-color-error-light-3);
	opacity: 0.8;
	.holiday {
		background-color: var(--el-color-error-light-3);
	}
}

.current .light {
	background-color: var(--el-color-danger-light-8);
	color: var(--el-color-error-light-3);
	opacity: 1;
	.holiday {
		background-color: var(--el-color-error-light-3);
	}
}

.primary {
	background-color: var(--el-color-warning-light-9);
	color: var(--el-color-warning-light-3);
	opacity: 0.8;
	.holiday {
		background-color: var(--el-color-warning-light-3);
	}
}
:deep .el-calendar-table {
	.el-calendar-day {
		height: 60px;
		padding: 0;
	}
	tr td,
	th {
		&:first-child {
			&.prev {
				color: var(--el-color-danger-light-5);
			}
			color: var(--el-color-danger);
		}
		&:last-child {
			&.next {
				color: var(--el-color-danger-light-5);
			}
			color: var(--el-color-danger);
		}
	}
}
.date-info {
	.day-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: 20px;
		font-size: 12px;
		margin-bottom: 10px;
		.day {
			width: 60px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			border-radius: 8px;
			font-size: 40px;
			font-weight: bold;
			background-color: var(--el-color-primary);
			color: #fff;
			&::after,
			&::before {
				content: '';
				width: 4px;
				height: 4px;
				border-radius: 50%;
				position: absolute;
				top: 6px;
				background-color: #fff;
			}
			&::after {
				left: 6px;
			}
			&::before {
				right: 6px;
			}
		}
	}
	.more-info {
		.item {
			display: flex;
			align-items: flex-start;
			border-top: 1px solid var(--el-border-color-light);
			padding: 8px 0;
			.tag {
				padding: 2px 8px;
				border-radius: 4px;
				margin-right: 10px;
				background-color: var(--color);
				color: #fff;
			}
		}
	}
	.more-holidays {
		padding-top: 10px;
		.item {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
			line-height: 20px;
			border-radius: 4px;
			background-color: var(--el-bg-color-page);
		}
		.text {
			font-size: 12px;
			display: flex;
			align-items: center;
			&::before {
				content: '';
				width: 8px;
				height: 8px;
				margin: 0 6px 0 8px;
				display: block;
				border-radius: 50%;
				background-color: var(--el-color-danger);
			}
		}
		.days {
			min-width: 40px;
			background-color: #9ccbff;
			color: #fff;
			padding: 0 4px;
			border-radius: 4px;
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>
