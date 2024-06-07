<template>
	<ClientOnly>
		<div class="calendar-panel" @click="state.visible = true">
			<div class="left">
				<div class="month">
					<el-link class="btn" :underline="false" :icon="ArrowLeft" @click="subtractMonth" />
					{{ format(state.date, 'YYYY年MM月') }}
					<el-link class="btn" :underline="false" :icon="ArrowRight" @click="addMonth" />
				</div>
				<div class="day">{{ format(state.date, 'D') }}</div>
				<div class="week">第{{ dayOfYear(state.date) }}天 第{{ week(state.date) }}周</div>
				<div class="lunar">{{ state.lunarMonth }}月{{ state.lunarDay }} {{ formatWeek() }}</div>
			</div>
			<div class="right">
				<el-calendar v-model="state.date" class="my-min-calendar" />
			</div>
		</div>
		<Dialog v-model:visible="state.visible" width="900px">
			<CalendarInfo />
		</Dialog>
	</ClientOnly>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { useDateFormat } from '~/hooks/useDateFormat';
import CalendarInfo from './CalendarInfo.vue';

const { format, formatWeek, dayOfYear, week, dayjs } = useDateFormat();

const { $Solar } = useNuxtApp();

const state = reactive({
	visible: false,
	date: new Date(),
	lunarMonth: '',
	lunarDay: '',
});

function addMonth() {
	state.date = new Date(dayjs(state.date).add(1, 'month').format());
}
function subtractMonth() {
	state.date = new Date(dayjs(state.date).subtract(1, 'month').format());
}

function initLunar() {
	const year = parseInt(format(state.date, 'YYYY'));
	const month = parseInt(format(state.date, 'M'));
	const day = parseInt(format(state.date, 'D'));
	const solar = $Solar?.fromYmd(year, month, day).getLunar();
	state.lunarMonth = solar.getMonthInChinese();
	state.lunarDay = solar.getDayInChinese();
}
onMounted(() => {
	initLunar();
});
</script>

<style lang="scss" scoped>
.calendar-panel {
	height: 100%;
	display: flex;
	background-color: var(--el-bg-color);
	.left {
		min-width: 130px;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.btn {
			display: none;
		}
		.month {
			display: flex;
			align-items: center;
		}
		.day {
			font-size: 50px;
			font-weight: bold;
		}
		.week {
			font-size: 12px;
			color: var(--el-text-color-placeholder);
			line-height: 20px;
		}
		.lunar {
			font-size: 12px;
		}
		&:hover .btn {
			display: flex;
		}
	}
}
.my-min-calendar {
	height: 100%;
	--el-calendar-border: none;
	position: relative;
	&::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		cursor: pointer;
	}
	:deep .el-calendar__header {
		display: none;
	}
	:deep .el-calendar__body {
		height: 100%;
		padding: 10px 10px 10px 0;
		box-sizing: border-box;
		.el-calendar-table {
			height: 100%;
			.el-calendar-day {
				height: 100%;
				padding: 0;
				font-size: 12px;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			thead th {
				font-size: 12px;
				padding: 4px 0;
				&:first-child,
				&:last-child {
					color: var(--el-color-danger);
				}
			}
			tbody tr td {
				&:first-child,
				&:last-child {
					color: var(--el-color-danger);
				}
			}
		}
	}
}
</style>
