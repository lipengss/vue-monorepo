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
import BarChart from '@/components/BarChart/index.vue';
import { usePrizesStore } from '@/stores/prizes';
import { dayjs } from '@common/utils';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
var spinHistory = storeToRefs(usePrizesStore()).spinHistory;
var chartOptions = computed(function () {
    var obj = spinHistory.value.reduce(function (acc, item) {
        acc[item.name] = (acc[item.name] || 0) + 1;
        return acc;
    }, {});
    return {
        title: {
            text: '最近中奖记录',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        grid: {
            top: 50,
            left: 40,
            right: 0,
            bottom: 40,
        },
        xAxis: {
            type: 'category',
            data: Object.keys(obj),
        },
        yAxis: {
            type: 'value',
            minInterval: 1,
        },
        series: [
            {
                data: Object.values(obj),
                barWidth: 30,
                type: 'bar',
            },
        ],
    };
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof BarChart, ]} */ ;
// @ts-ignore
var __VLS_0 = __VLS_asFunctionalComponent(BarChart, new BarChart(__assign({ option: (__VLS_ctx.chartOptions) }, { style: {} })));
var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([__assign({ option: (__VLS_ctx.chartOptions) }, { style: {} })], __VLS_functionalComponentArgsRest(__VLS_0), false));
// @ts-ignore
[chartOptions,];
var __VLS_4 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
ElTable;
// @ts-ignore
var __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    data: (__VLS_ctx.spinHistory),
    border: true,
}));
var __VLS_6 = __VLS_5.apply(void 0, __spreadArray([{
        data: (__VLS_ctx.spinHistory),
        border: true,
    }], __VLS_functionalComponentArgsRest(__VLS_5), false));
var __VLS_8 = __VLS_7.slots.default;
// @ts-ignore
[spinHistory,];
var __VLS_9 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
var __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    label: "奖品等级",
    prop: "name",
    align: "center",
}));
var __VLS_11 = __VLS_10.apply(void 0, __spreadArray([{
        label: "奖品等级",
        prop: "name",
        align: "center",
    }], __VLS_functionalComponentArgsRest(__VLS_10), false));
var __VLS_14 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
var __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    label: "奖品名称",
    prop: "description",
    align: "center",
}));
var __VLS_16 = __VLS_15.apply(void 0, __spreadArray([{
        label: "奖品名称",
        prop: "description",
        align: "center",
    }], __VLS_functionalComponentArgsRest(__VLS_15), false));
var __VLS_18 = __VLS_17.slots.default;
{
    var __VLS_19 = __VLS_17.slots.default;
    var row = __VLS_getSlotParameters(__VLS_19)[0].row;
    (row.icon);
    (row.description);
}
var __VLS_17;
var __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "中奖时间",
    prop: "timestamp",
    align: "center",
}));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
        label: "中奖时间",
        prop: "timestamp",
        align: "center",
    }], __VLS_functionalComponentArgsRest(__VLS_21), false));
var __VLS_24 = __VLS_23.slots.default;
{
    var __VLS_25 = __VLS_23.slots.default;
    var row = __VLS_getSlotParameters(__VLS_25)[0].row;
    (__VLS_ctx.dayjs(row.timestamp).format('YYYY年MM月DD日 HH:mm:ss'));
    // @ts-ignore
    [dayjs,];
}
var __VLS_23;
var __VLS_7;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        BarChart: BarChart,
        dayjs: dayjs,
        spinHistory: spinHistory,
        chartOptions: chartOptions,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
