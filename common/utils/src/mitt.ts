

import mitt, { Emitter } from 'mitt';

// 类型
const mittBus: Emitter<any> = mitt<any>();

// 导出
export default mittBus;
