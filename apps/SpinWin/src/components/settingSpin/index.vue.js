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
import { onBeforeUnmount, ref } from 'vue';
import Base from './base.vue';
import History from './history.vue';
import { useDragMove } from './onDrageStart';
import Prize from './prize.vue';
var activeTab = ref('history');
var visible = ref(false);
var drawerWidth = ref(1200);
var _a = useDragMove(drawerWidth), onDragStart = _a.onDragStart, onDragEnd = _a.onDragEnd;
function open(tabName) {
    if (tabName) {
        activeTab.value = tabName;
    }
    visible.value = true;
}
var __VLS_exposed = {
    open: open,
};
defineExpose(__VLS_exposed);
onBeforeUnmount(function () {
    onDragEnd();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
var __VLS_0 = {}.ElDrawer;
/** @type {[typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, ]} */ ;
// @ts-ignore
ElDrawer;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.visible),
    title: "参数设置",
    direction: "rtl",
    size: (__VLS_ctx.drawerWidth),
    appendToBody: true,
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.visible),
        title: "参数设置",
        direction: "rtl",
        size: (__VLS_ctx.drawerWidth),
        appendToBody: true,
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = {};
var __VLS_5 = __VLS_3.slots.default;
// @ts-ignore
[visible, drawerWidth,];
{
    var __VLS_6 = __VLS_3.slots.default;
    var __VLS_7 = {}.ElTabs;
    /** @type {[typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, ]} */ ;
    // @ts-ignore
    ElTabs;
    // @ts-ignore
    var __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        modelValue: (__VLS_ctx.activeTab),
        id: "setting-tabs",
    }));
    var __VLS_9 = __VLS_8.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.activeTab),
            id: "setting-tabs",
        }], __VLS_functionalComponentArgsRest(__VLS_8), false));
    var __VLS_11 = __VLS_10.slots.default;
    // @ts-ignore
    [activeTab,];
    var __VLS_12 = {}.ElTabPane;
    /** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
    // @ts-ignore
    ElTabPane;
    // @ts-ignore
    var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        label: "🕹️ 转盘设置",
        name: "base",
    }));
    var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{
            label: "🕹️ 转盘设置",
            name: "base",
        }], __VLS_functionalComponentArgsRest(__VLS_13), false));
    var __VLS_16 = __VLS_15.slots.default;
    /** @type {[typeof Base, ]} */ ;
    // @ts-ignore
    var __VLS_17 = __VLS_asFunctionalComponent(Base, new Base({}));
    var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_17), false));
    var __VLS_15;
    var __VLS_21 = {}.ElTabPane;
    /** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
    // @ts-ignore
    ElTabPane;
    // @ts-ignore
    var __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        label: "🏅 奖品设置",
        name: "prize",
    }));
    var __VLS_23 = __VLS_22.apply(void 0, __spreadArray([{
            label: "🏅 奖品设置",
            name: "prize",
        }], __VLS_functionalComponentArgsRest(__VLS_22), false));
    var __VLS_25 = __VLS_24.slots.default;
    /** @type {[typeof Prize, ]} */ ;
    // @ts-ignore
    var __VLS_26 = __VLS_asFunctionalComponent(Prize, new Prize({}));
    var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_26), false));
    var __VLS_24;
    var __VLS_30 = {}.ElTabPane;
    /** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
    // @ts-ignore
    ElTabPane;
    // @ts-ignore
    var __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        label: "📋 中奖记录",
        name: "history",
    }));
    var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([{
            label: "📋 中奖记录",
            name: "history",
        }], __VLS_functionalComponentArgsRest(__VLS_31), false));
    var __VLS_34 = __VLS_33.slots.default;
    /** @type {[typeof History, ]} */ ;
    // @ts-ignore
    var __VLS_35 = __VLS_asFunctionalComponent(History, new History({}));
    var __VLS_36 = __VLS_35.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_35), false));
    var __VLS_33;
    var __VLS_10;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ onMousedown: (__VLS_ctx.onDragStart) }, { class: "resize-handle" }));
    // @ts-ignore
    [onDragStart,];
    __VLS_asFunctionalElement(__VLS_elements.div)(__assign({ class: "line" }));
    __VLS_asFunctionalElement(__VLS_elements.div)(__assign({ class: "line" }));
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['resize-handle']} */ ;
/** @type {__VLS_StyleScopedClasses['line']} */ ;
/** @type {__VLS_StyleScopedClasses['line']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        Base: Base,
        History: History,
        Prize: Prize,
        activeTab: activeTab,
        visible: visible,
        drawerWidth: drawerWidth,
        onDragStart: onDragStart,
    }); },
});
export default (await import('vue')).defineComponent({
    setup: function () { return (__VLS_exposed); },
});
; /* PartiallyEnd: #4569/main.vue */
