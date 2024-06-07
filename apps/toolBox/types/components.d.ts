// 锚点列表
interface AnchorPoint {
	name: string;
	id: string;
}

interface HotMenuState {
	isDrawer: boolean;
	context: string;
}

interface EditorOptions {
	mode: 'text' | 'tree' | 'table';
}

interface StateCalendar {
	date: Date;
	year: number;
	month: number;
	day: number;
	holiday: string; // 节日
	yearGanZhi: string; // 八字
	yearShengXiao: string; // 生肖
	xingZuo: string; // 星座
	festivals: string; // 节日
	yi: string; // 宜
	ji: string; // 忌
}

interface IWeatherState {
	forecasts: IForecasts[];
	payload: {
		key: string;
		city: string;
	};
	lives: LivesItem[];
}
