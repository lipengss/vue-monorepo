import { merge } from 'lodash';
// 网格
function grid(data) {
    if (data === void 0) { data = {}; }
    var grid = {
        left: 10,
        top: 30,
        bottom: 10,
        right: 10,
        containLabel: true,
    };
    merge(grid, data);
    return grid;
}
// 图例组件
function legend(data) {
    if (data === void 0) { data = {}; }
    var legend = {
        left: 'center',
        show: true,
        type: 'scroll',
        right: 60,
        top: 4,
    };
    merge(legend, data);
    return legend;
}
// 弹窗
function tooltip(data) {
    if (data === void 0) { data = {}; }
    var tooltip = {
        show: true,
        trigger: 'axis',
        axisPointer: {
            type: 'line',
        },
        hideDelay: 0,
    };
    merge(tooltip, data);
    return tooltip;
}
// 区域缩放
function dataZoom(data) {
    if (data === void 0) { data = [
        {
            type: 'inside',
        },
    ]; }
    return data;
}
// 图表标注
function markPoint(data, unit) {
    if (data === void 0) { data = {}; }
    if (unit === void 0) { unit = ''; }
    var markPoint = {
        symbol: 'rect',
        symbolSize: [0, 20],
        symbolOffset: [0, -15],
        data: [
            {
                name: '',
                type: 'max',
            },
        ],
        silent: true,
        label: {
            show: true,
            fontSize: 14,
            color: 'inherit',
            fontWeight: 'bold',
            textShadowColor: '#000',
            textShadowBlur: 2,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1,
            formatter: "{c} ".concat(unit),
        },
    };
    merge(markPoint, data);
    return markPoint;
}
// 工具栏
function toolbox(data) {
    if (data === void 0) { data = {}; }
    var toolbox = {
        right: 10,
        feature: {
            dataZoom: {
                yAxisIndex: 'none',
                title: {
                    zoom: '缩放',
                    back: '还原',
                },
            },
        },
        emphasis: {
            iconStyle: {
                textPosition: 'left',
            },
        },
    };
    merge(toolbox, data);
    return toolbox;
}
// 颜色渐变
function colorLinear(data) {
    if (data === void 0) { data = {}; }
    var colorlinear = {
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [],
        },
    };
    merge(colorlinear, data);
    return colorlinear;
}
var defaultOption = { grid: grid, legend: legend, tooltip: tooltip, dataZoom: dataZoom, markPoint: markPoint, colorLinear: colorLinear, toolbox: toolbox };
export default defaultOption;
