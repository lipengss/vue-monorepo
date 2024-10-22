import { nanoid } from 'nanoid';
import { cloneDeep, isEqual, sortBy, flatten } from 'lodash-es';
import { formatNum, multiply, add, subtract, convertToPercentages, numeral } from './count';
import dayjs from 'dayjs';
import { Local, Session } from './storage';
import qs from 'qs';
import mittBus from 'mitt';
import { getBytes, filesize } from './filesize';

function getDayOfWeek(date: string) {
	const today = dayjs();
	// 创建一个 dayjs 对象
	const dayOfWeek = dayjs(date).day();
	// 定义一个星期几的数组
	const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	if (dayjs(date).isSame(today, 'day')) {
		return '今天';
	} else {
		// 返回对应的星期几
		return daysOfWeek[dayOfWeek];
	}
}

export {
	qs,
	dayjs,
	Local,
	Session,
	nanoid,
	sortBy,
	flatten,
	isEqual,
	cloneDeep,
	multiply,
	add,
	subtract,
	formatNum,
	numeral,
	convertToPercentages,
	getDayOfWeek,
	getBytes,
	filesize,
	mittBus,
};
