import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(duration);
dayjs.extend(dayOfYear); // 一年第几天
dayjs.extend(weekOfYear); // 一年第几周
dayjs.extend(weekday); // 星期
dayjs.extend(isToday); // 今天
dayjs.extend(isTomorrow); // 明天
dayjs.extend(isBetween); // 一个时间是否介于两个时间之间

const weekFormat: { [key: number]: string } = {
	1: '一',
	2: '二',
	3: '三',
	4: '四',
	5: '五',
	6: '六',
	7: '日',
};

export function useDateFormat() {
	const curDate = new Date();
	function isToday(date = curDate) {
		return dayjs(date).isToday();
	}
	function isTomorrow(date = curDate) {
		return dayjs(date).isTomorrow();
	}
	function weekDay(date = curDate): number {
		return dayjs(date).weekday();
	}
	function format(date = curDate, format = 'YYYY-MM-DD HH:mm:ss') {
		return dayjs(date).format(format);
	}
	function formatWeek(date: Date | number = weekDay()): string {
		if (date) date = dayjs(date).weekday();
		return `星期${date === 0 ? '日' : weekFormat[date]}`;
	}
	function dayOfYear(date = curDate) {
		return dayjs(date).dayOfYear();
	}
	function week(date = curDate) {
		return dayjs(date).week();
	}
	function setTime(date = curDate, hours: [number, number, number]) {
		const day = dayjs(date).set('hour', hours[0]).set('minute', hours[1]).set('second', hours[2]);
		return day;
	}
	return {
		isToday,
		isTomorrow,
		weekDay,
		format,
		formatWeek,
		dayOfYear,
		week,
		weekFormat,
		dayjs,
		setTime,
	};
}
