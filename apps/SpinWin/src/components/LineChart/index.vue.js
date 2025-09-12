var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import defaultOption from '@/assets/defaultOption';
import { LineChart } from 'echarts/charts';
import { DataZoomComponent, DatasetComponent, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent, } from 'echarts/components';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { debounce } from 'lodash';
import { computed, defineProps, provide, shallowRef, withDefaults } from 'vue';
import VChart, { THEME_KEY } from 'vue-echarts';
var props = withDefaults(defineProps(), {});
var emits = defineEmits(['click', 'dblclick', 'datazoom']);
var chartRef = shallowRef();
var mergeOption = computed(function () {
    return __assign({ grid: defaultOption.grid(), legend: defaultOption.legend(), tooltip: defaultOption.tooltip({
            axisPointer: {
                type: 'line',
            },
        }), toolbox: defaultOption.toolbox(), dataZoom: defaultOption.dataZoom() }, props.option);
});
use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
    DataZoomComponent,
    DatasetComponent,
    TitleComponent,
]);
function handleClick(params) {
    emits('click', params);
}
function handledbclick(params) {
    emits('dblclick', params);
}
function resize() {
    chartRef.value.chart && chartRef.value.chart.resize();
}
function handleDatazoom(params) {
    emits('datazoom', params);
}
function getInstance() {
    return chartRef.value.chart;
}
window.addEventListener('resize', debounce(function () {
    resize();
}, 500, {
    leading: true,
}));
var __VLS_exposed = {
    resize: resize,
    getInstance: getInstance,
};
defineExpose(__VLS_exposed);
provide(THEME_KEY, 'light');
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_withDefaultsArg = (function (t) { return t; })({});
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
var __VLS_0 = {}.VChart;
/** @type {[typeof __VLS_components.VChart, typeof __VLS_components.vChart, ]} */ ;
// @ts-ignore
VChart;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign(__assign(__assign({ 'onClick': {} }, { 'onDblclick': {} }), { 'onDatazoom': {} }), { class: "chart" }), { ref: "chartRef", option: (__VLS_ctx.mergeOption), theme: (props.theme), group: (props.group), autoresize: true })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign(__assign(__assign({ 'onClick': {} }, { 'onDblclick': {} }), { 'onDatazoom': {} }), { class: "chart" }), { ref: "chartRef", option: (__VLS_ctx.mergeOption), theme: (props.theme), group: (props.group), autoresize: true })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4;
var __VLS_5;
var __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.handleClick) });
var __VLS_7 = ({ dblclick: {} },
    { onDblclick: (__VLS_ctx.handledbclick) });
var __VLS_8 = ({ datazoom: {} },
    { onDatazoom: (__VLS_ctx.handleDatazoom) });
/** @type {typeof __VLS_ctx.chartRef} */ ;
var __VLS_9 = {};
// @ts-ignore
[mergeOption, handleClick, handledbclick, handleDatazoom, chartRef,];
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['chart']} */ ;
// @ts-ignore
var __VLS_10 = __VLS_9;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        VChart: VChart,
        chartRef: chartRef,
        mergeOption: mergeOption,
        handleClick: handleClick,
        handledbclick: handledbclick,
        handleDatazoom: handleDatazoom,
    }); },
    emits: {},
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup: function () { return (__VLS_exposed); },
    emits: {},
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */
