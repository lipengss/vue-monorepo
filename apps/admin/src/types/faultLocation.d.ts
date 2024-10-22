interface FualtPoints {
	seriesIndex: number
	dataIndex: number
	text?: string
	value?: [string, number]
}

interface FaultWave {
	date_time: string
	dev_model_id: string
	device_id: string
	fault_type: number
	fault_type_name: string
	parent_entry_name: string // 杆塔名称
	phase: number
	phase_name: string
	ts: number
	wave_id: string
	wave_type: number
	wave_type_name: string
}

interface Calc {
	calc: 'single' | 'dobule'
	mode: 'mode1' | 'mode2'
	speed: number
	fualtPosition: {
		description: string
		type: 'success' | 'error'
	}
	faultDistance: number // 故障距离起始变电站的位置
	fualtPoints: Array<FualtPoints>
}

interface TowerData {
	entry_name: string
	tower_step: number
	toolNum: number
	devs?: Array<{}>
}

interface TowerStateData {
	substation: string
	lineLength: number
	lineName: string
	towerDevs: Array<TowerData>
	dialogVisible: boolean
}

interface LineStateData {
	calc: Calc
	faultWave: FaultWave
}

export { LineStateData, FaultWave, TowerData, TowerStateData, Calc }
