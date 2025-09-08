import { Ref } from 'vue'

// 限制
const minWidth = 400
const maxWidth = 2000

let startX = 0
let startWidth = 0
let dragging = false

export function useDragMove(drawerWidth: Ref<number>, direction: 'rtl' | 'ltr' = 'rtl') {
  function onDragStart(e: MouseEvent) {
    dragging = true
    startX = e.clientX
    startWidth = drawerWidth.value

    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'

    window.addEventListener('mousemove', onDragMove)
    window.addEventListener('mouseup', onDragEnd)
  }

  function onDragMove(e: MouseEvent) {
    if (!dragging) return
    const dx = e.clientX - startX
    const next =
      direction === 'rtl'
        ? startWidth - dx // 右侧抽屉
        : startWidth + dx // 左侧抽屉

    drawerWidth.value = Math.min(maxWidth, Math.max(minWidth, Math.round(next)))
  }

  function onDragEnd() {
    if (!dragging) return
    dragging = false
    document.body.style.userSelect = ''
    document.body.style.cursor = ''

    window.removeEventListener('mousemove', onDragMove)
    window.removeEventListener('mouseup', onDragEnd)
  }
  return {
    onDragStart,
    onDragEnd,
  }
}
