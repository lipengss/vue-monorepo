const vTableSelect: any = {
	mounted(el: Document, bindings: any) {
		vTableSelect.el = el
		vTableSelect.state = bindings.value
		bindEvent()
	},
}

function bindEvent() {
	const { el } = vTableSelect
	el.addEventListener('click', handleTDClick, false)
	el.addEventListener('dbclick', handleTDDbClick, false)
	el.addEventListener('mousedown', handleTDMouseDown, false)
	el.addEventListener('click', handleWindowClick, false)
}

// events
function handleTDClick(e: any) {
	e.stopPropagation()
	const { target } = e
	const { state } = vTableSelect
	restoreSelectedData(state)
	if (target.tagName === 'TD') {
		const { row, column } = getRowAndColumn(target)
		const selectedData = state.tableData[row].data[column]
		if (state.selectedData !== selectedData) {
			state.selectedData = selectedData
			state.selectedData.selected = true
		}
	}
}
function handleTDDbClick(e: any) {}
function handleTDMouseDown(e: any) {
	e.stopPropagation()
	const { target } = e
	const { el, state } = vTableSelect
	restoreSelectedData(state)
	if (target.tagName === 'TD') {
		const { row, column } = getRowAndColumn(target)
		el.startRow = row
		el.startColumn = column
	}
	document.addEventListener('mouseover', handleTDMouseOver, false)
	document.addEventListener('mouseup', handleTDMouseUp, false)
}
function handleTDMouseUp() {
	document.removeEventListener('mouseover', handleTDMouseOver, false)
	document.removeEventListener('mouseup', handleTDMouseUp, false)
}
function handleTDMouseOver(e: any) {
	e.stopPropagation()
	const { target } = e
	const { el, state } = vTableSelect
	if (target.tagName === 'TD') {
		const { row, column } = getRowAndColumn(target)
		el.endRow = row
		el.endColumn = column
	}
	state.selectedAreaData = getSelectedAreaData()
}
function handleWindowClick(...[state, e]: any) {
	restoreSelectedData(state)
}

// functions
function restoreSelectedData(state: any) {
	if (state.selectedData) {
		state.selectedData.selected = false
	}
	console.log(state)
	console.log(state.selectedAreaData)
	// if (state.selectedAreaData.length) {
	// 	state.selectedAreaData.forEach((item: any) => {
	// 		item.selected = false
	// 	})
	// 	state.selectedAreaData = []
	// }
}

// utils

function getSelectedAreaData() {
	const selectedAreaData: any[] = []

	const { el, state } = vTableSelect

	if (el.startRow <= el.endRow) {
		for (let i = el.startRow; i <= el.endRow; i++) {
			setSelectedAreaData(state.tableData[i].data, el.startColumn, el.endColumn)
		}
	} else {
		for (let i = el.startRow; i >= el.endRow; i--) {
			setSelectedAreaData(state.tableData[i].data, el.startColumn, el.endColumn)
		}
	}

	function setSelectedAreaData(rowData, startColumn, endColumn) {
		if (startColumn <= endColumn) {
			for (let i = startColumn; i <= endColumn; i++) {
				pushColumnData(rowData[i])
			}
			// selectedAreaData.push()
		} else {
			for (let i = startColumn; i >= endColumn; i--) {
				pushColumnData(rowData[i])
			}
		}
	}
	function pushColumnData(columnData) {
		columnData.selected = true
		selectedAreaData.push(columnData)
	}
	return selectedAreaData
}

function getRowAndColumn(target: any) {
	const { row, column } = target.dataset
	return {
		row: Number(row),
		column: Number(column),
	}
}

export default vTableSelect
