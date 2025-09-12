// 限制
var minWidth = 400;
var maxWidth = 2000;
var startX = 0;
var startWidth = 0;
var dragging = false;
export function useDragMove(drawerWidth, direction) {
    if (direction === void 0) { direction = 'rtl'; }
    function onDragStart(e) {
        dragging = true;
        startX = e.clientX;
        startWidth = drawerWidth.value;
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
        window.addEventListener('mousemove', onDragMove);
        window.addEventListener('mouseup', onDragEnd);
    }
    function onDragMove(e) {
        if (!dragging)
            return;
        var dx = e.clientX - startX;
        var next = direction === 'rtl'
            ? startWidth - dx // 右侧抽屉
            : startWidth + dx; // 左侧抽屉
        drawerWidth.value = Math.min(maxWidth, Math.max(minWidth, Math.round(next)));
    }
    function onDragEnd() {
        if (!dragging)
            return;
        dragging = false;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        window.removeEventListener('mousemove', onDragMove);
        window.removeEventListener('mouseup', onDragEnd);
    }
    return {
        onDragStart: onDragStart,
        onDragEnd: onDragEnd,
    };
}
