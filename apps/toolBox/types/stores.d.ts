interface IEngineItem {
	name: string;
	link: string;
	icon: string;
	description: string;
}

interface ISetting {
	theme: string;
	date: {
		show: boolean;
		size: number;
		color: string;
		font: string;
		date: string[];
	};
	search: {
		show: boolean;
		height: number;
		radius: number;
		opacity: number;
		history: boolean;
	};
	bg: {
		picture: string[];
		opacity: number; // 遮罩层透明度
		blur: number; // 遮罩层模糊度
		auto: boolean;
		autoTime: number;
	};
	menuBar: {
		width: number; // 侧边栏菜单宽度
		blur: number; // 遮罩层模糊度
		bgColor: string; // 背景颜色
		color: string; // 字体颜色
		autoHide: boolean;
		appSlideIndex: number;
	};
	offWork: {
		name: '下班倒计时';
		payday: number;
		workday: string[];
		isWorkDay: boolean;
		showItem: string[];
		workHours: [string, string];
		income: number;
		color: string;
		bgColor: string;
	};
	app: {
		screenWidth: number;
		unit: '%' | 'px';
		size: number;
		radius: number;
		async: boolean;
		gap: number;
		columnGap: number;
		rowGap: number;
		opacity: number;
		showTitle: boolean;
	};
	collectionWeb: string[],
	hotWebRanks: { [key: string]: number };
	excludeWeb: RouteItem[];
	addedWeb: RouteItem[];
}

interface ISettingState {
	showDrawer: boolean;
	tour: boolean;
	setting: ISetting;
	engineList: Array<IEngineItem>;
	activeTag: string;
}
