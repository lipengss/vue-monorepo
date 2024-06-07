import { Solar, HolidayUtil } from 'lunar-typescript';

export default defineNuxtPlugin(() => {
	return {
		provide: {
			Solar,
			HolidayUtil,
		},
	};
});
