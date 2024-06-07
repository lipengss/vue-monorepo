import { TowerData, Calc, FaultWave } from '@/types/faultLocation'
import { Ref } from 'vue'
function useCalc(allTowers: Array<TowerData>, calc: Ref<Calc>) {
	const { speed, fualtPoints, mode } = calc.value

	function signleCalc(faulWave: FaultWave) {
		console.log(fualtPoints)
		if (fualtPoints.length != 2 || !fualtPoints[0].value || !fualtPoints[1].value) return
		const minns = parseFloat(fualtPoints[0].value[0]) * 1e9
		const maxns = parseFloat(fualtPoints[1].value[0]) * 1e9
		console.log(minns)
		const startTowerName = allTowers[0].entry_name
		const lastTowerName = allTowers[allTowers.length - 1].entry_name
		const deviceInTowerName = faulWave.parent_entry_name
		const wireLength = terminalSpacing(startTowerName, lastTowerName, true)
		// const minns = parseFloat(min.ns) * 1e9
		// const maxns = parseFloat(max.ns) * 1e9
		const result = ((maxns - minns) * (speed / 1000)) / 2
		if (result > wireLength) {
			calc.value.fualtPosition.description = '无法定位故障位置，请重新选取点位进行计算'
			calc.value.fualtPosition.type = 'error'
			return
		}
		const terminalDistanceA = terminalSpacing(startTowerName, deviceInTowerName, true)
		const terminalDistanceB = terminalSpacing(deviceInTowerName, lastTowerName)
		console.log('小端-故障的距离----------------', result)
		console.log('小端-设备的距离----------------', terminalDistanceA)
		console.log('设备-大端的距离----------------', terminalDistanceB)

		let faultDistance = 0
		if (mode === 'mode1') {
			if (result < terminalDistanceA) {
				faultDistance = result
			} else {
				faultDistance = wireLength - result
			}
		} else {
			if (terminalDistanceA < terminalDistanceB) {
				faultDistance = terminalDistanceA + result
			} else {
				faultDistance = terminalDistanceA - result
			}
		}
		faultLocationInTowers(faultDistance)
	}
	// 杆塔与杆塔之间的距离
	function terminalSpacing(t1: string, t2: string, containFirst?: boolean) {
		if (t1 === t2) {
			return allTowers[getIndex(t1)].tower_step
		}
		const towerRange = allTowers.slice(getIndex(t1) + 1, getIndex(t2) + 1)
		const steps = towerRange.map((item) => item.tower_step)
		const accStep = steps.reduce((pre, cur) => {
			return pre + cur
		}, 0)
		return accStep + (containFirst ? allTowers[0].tower_step : 0)
	}

	function faultLocationInTowers(faultDistance: number) {
		let startTower = null,
			endTower = null
		let currentDistance = 0
		let preTotalDistance = 0

		let size = allTowers.length
		for (let index = 0; index < size; index++) {
			currentDistance += allTowers[index].tower_step
			if (currentDistance >= faultDistance) {
				endTower = allTowers[index]
				break
			} else {
				startTower = allTowers[index]
				preTotalDistance += allTowers[index].tower_step
			}
		}
		let msg = ''
		if (startTower === null) {
			//msg = `故障位置距小端变电站${Math.ceil(faultDistance)}米`
			calc.value.fualtPosition.description = '无法定位故障位置，请重新选取点位进行计算'
			calc.value.fualtPosition.type = 'error'
			return
		} else {
			const m = Math.ceil(faultDistance - preTotalDistance)
			msg = `故障位置距小端变电站${Math.ceil(faultDistance)}米，位于${startTower.entry_name}号杆塔 与 ${endTower.entry_name}号杆塔之间，距${
				startTower.entry_name
			} 号杆塔 ${m}米`
			calc.value.faultDistance = faultDistance
			// this.position_distance = m
			// this.position_relative = startTower.entry_name
		}
		calc.value.fualtPosition.description = msg
		calc.value.fualtPosition.type = 'success'
		// this.startTower = startTower
		// this.endTower = endTower
	}
	function getIndex(nT: string) {
		return allTowers.findIndex((n) => n.entry_name === nT)
	}

	return {
		signleCalc,
	}
}

export { useCalc }
