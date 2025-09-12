var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { onMounted, ref } from 'vue';
var visible = ref(false);
var bar = ref();
onMounted(function () {
    bar.value = document.querySelector('.el-splitter-bar__dragger-vertical');
    setTimeout(function () {
        visible.value = true;
    }, 1000);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
var __VLS_0 = {}.ElTour;
/** @type {[typeof __VLS_components.ElTour, typeof __VLS_components.elTour, typeof __VLS_components.ElTour, typeof __VLS_components.elTour, ]} */ ;
// @ts-ignore
ElTour;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.visible),
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.visible),
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = {};
var __VLS_5 = __VLS_3.slots.default;
// @ts-ignore
[visible,];
var __VLS_6 = {}.ElTourStep;
/** @type {[typeof __VLS_components.ElTourStep, typeof __VLS_components.elTourStep, ]} */ ;
// @ts-ignore
ElTourStep;
// @ts-ignore
var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    target: (__VLS_ctx.bar),
    title: "分割面板",
    description: "点击分割面板，可调整左右面板的宽度",
}));
var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([{
        target: (__VLS_ctx.bar),
        title: "分割面板",
        description: "点击分割面板，可调整左右面板的宽度",
    }], __VLS_functionalComponentArgsRest(__VLS_7), false));
// @ts-ignore
[bar,];
var __VLS_11 = {}.ElTourStep;
/** @type {[typeof __VLS_components.ElTourStep, typeof __VLS_components.elTourStep, ]} */ ;
// @ts-ignore
ElTourStep;
// @ts-ignore
var __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    target: "#prize-set",
    title: "设置",
    description: "点击设置，可设置抽奖的奖品",
}));
var __VLS_13 = __VLS_12.apply(void 0, __spreadArray([{
        target: "#prize-set",
        title: "设置",
        description: "点击设置，可设置抽奖的奖品",
    }], __VLS_functionalComponentArgsRest(__VLS_12), false));
var __VLS_3;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        visible: visible,
        bar: bar,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
