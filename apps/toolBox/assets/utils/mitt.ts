declare type MittType<T = any> = {
	contextmenuApp: T;
	onMenuChange: T;
};

import mitt, { type Emitter } from 'mitt';

// 类型
const mittBus: Emitter<MittType> = mitt<MittType>();

// 导出
export default mittBus;
