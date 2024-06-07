declare module '*.json' {
	const value: any;
	export default value;
}
declare module 'qs';
declare module 'numeral';
declare module 'file-saver';
declare module '@vueuse/core';
declare module '@pqina/flip';
declare module 'element-plus/dist/locale/zh-cn.mjs';
const TYPE = 'search' | 'hotTool' | 'art' | 'gallery' | 'color' | 'developer' | 'blog';

interface WebTypeItem {
	name: string;
	icon: string;
	type: TYPE;
	redirect?: TYPE;
	routes: Array<RouteItem>;
	children: Array<WebTypeItem>;
}

interface QueryLocation {
	adcode: number;
	city: string;
}

interface WeatherItem {
	date: Date;
	week: string;
	dayweather: string; // 白天天气现象
	nightweather: string; // 晚上天气现象
	daytemp: string; //白天温度
	nighttemp: string; // 晚上温度
	daywind: string; // 白天风向
	nightwind: string; // 晚上风向
	daypower: string; // 白天风力
	nightpower: string; // 晚上风力
}

interface LivesItem {
	province: string; // 省份名
	city: string; // 城市名
	adcode: string; // 地区编码
	weather: string; //	天气现象（汉子描述）
	temperature: string; // 实时温度
	winddirection: string; // 风向描述
	windpower: string; // 风力级别，单位：级
	humidity: string; // 湿度
	reporttime: string; // 数据发布时间
}

interface IForecasts {
	adcode: string;
	city: string;
	province: string;
	reporttime: string;
	casts: Array<WeatherItem>;
}

interface QueryWeather {
	forecasts: Array<IForecasts>;
	lives: Array<LivesItem>;
}

interface CalendarDataCell {
	type: 'prev-month' | 'current-month' | 'next-month';
	isSelected: boolean;
	day: string;
	date: Date;
}

interface HolidayItem {
	name: string;
	date: string;
	diff: number;
}
