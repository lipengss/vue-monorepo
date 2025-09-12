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
import { usePrizesStore } from '@/stores/prizes';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
var visible = ref(false);
var result = ref({
    name: '谢谢参与',
    description: '很遗憾，您没有抽中任何奖品',
    price: 0,
    icon: '',
    id: '',
});
var getLoseId = storeToRefs(usePrizesStore()).getLoseId;
function open(res) {
    visible.value = true;
    console.log('res', res);
    if (res.id === getLoseId.value) {
        result.value = {
            name: '未中奖',
            description: '很遗憾，您没有抽中任何奖品',
            price: 0,
            icon: '🎉',
            id: getLoseId.value,
        };
    }
    else {
        result.value = res;
    }
}
var __VLS_exposed = { open: open };
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
var __VLS_0 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
ElDialog;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign({ modelValue: (__VLS_ctx.visible), showClose: (false) }, { class: "result-el-dialog" }), { width: "500px" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ modelValue: (__VLS_ctx.visible), showClose: (false) }, { class: "result-el-dialog" }), { width: "500px" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = {};
var __VLS_5 = __VLS_3.slots.default;
// @ts-ignore
[visible,];
if (__VLS_ctx.result) {
    // @ts-ignore
    [result,];
    var __VLS_6 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    ElCard;
    // @ts-ignore
    var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6(__assign({ class: "result-card" }, { shadow: "never", bodyStyle: "padding: 0;" })));
    var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ class: "result-card" }, { shadow: "never", bodyStyle: "padding: 0;" })], __VLS_functionalComponentArgsRest(__VLS_7), false));
    var __VLS_10 = __VLS_9.slots.default;
    {
        var __VLS_11 = __VLS_9.slots.header;
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "result-header" }));
    }
    var __VLS_12 = {}.ElResult;
    /** @type {[typeof __VLS_components.ElResult, typeof __VLS_components.elResult, typeof __VLS_components.ElResult, typeof __VLS_components.elResult, ]} */ ;
    // @ts-ignore
    ElResult;
    // @ts-ignore
    var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        icon: (__VLS_ctx.result.id !== __VLS_ctx.getLoseId ? 'success' : 'info'),
        title: (__VLS_ctx.result.name),
        subTitle: (__VLS_ctx.result.id !== __VLS_ctx.getLoseId ? '恭喜您抽中了以下奖品' : '很遗憾，您没有抽中任何奖品'),
    }));
    var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{
            icon: (__VLS_ctx.result.id !== __VLS_ctx.getLoseId ? 'success' : 'info'),
            title: (__VLS_ctx.result.name),
            subTitle: (__VLS_ctx.result.id !== __VLS_ctx.getLoseId ? '恭喜您抽中了以下奖品' : '很遗憾，您没有抽中任何奖品'),
        }], __VLS_functionalComponentArgsRest(__VLS_13), false));
    var __VLS_16 = __VLS_15.slots.default;
    // @ts-ignore
    [result, result, result, getLoseId, getLoseId,];
    if (__VLS_ctx.result.id !== __VLS_ctx.getLoseId) {
        // @ts-ignore
        [result, getLoseId,];
        {
            var __VLS_17 = __VLS_15.slots.icon;
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "prize-icon" }));
            (__VLS_ctx.result.icon);
            // @ts-ignore
            [result,];
        }
    }
    if (__VLS_ctx.result.id !== __VLS_ctx.getLoseId) {
        // @ts-ignore
        [result, getLoseId,];
        {
            var __VLS_18 = __VLS_15.slots.extra;
            var __VLS_19 = {}.ElDescriptions;
            /** @type {[typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, ]} */ ;
            // @ts-ignore
            ElDescriptions;
            // @ts-ignore
            var __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
                column: (1),
                border: true,
            }));
            var __VLS_21 = __VLS_20.apply(void 0, __spreadArray([{
                    column: (1),
                    border: true,
                }], __VLS_functionalComponentArgsRest(__VLS_20), false));
            var __VLS_23 = __VLS_22.slots.default;
            var __VLS_24 = {}.ElDescriptionsItem;
            /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
            // @ts-ignore
            ElDescriptionsItem;
            // @ts-ignore
            var __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
                label: "奖品名称",
            }));
            var __VLS_26 = __VLS_25.apply(void 0, __spreadArray([{
                    label: "奖品名称",
                }], __VLS_functionalComponentArgsRest(__VLS_25), false));
            var __VLS_28 = __VLS_27.slots.default;
            var __VLS_29 = {}.ElText;
            /** @type {[typeof __VLS_components.ElText, typeof __VLS_components.elText, typeof __VLS_components.ElText, typeof __VLS_components.elText, ]} */ ;
            // @ts-ignore
            ElText;
            // @ts-ignore
            var __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
                tag: "b",
            }));
            var __VLS_31 = __VLS_30.apply(void 0, __spreadArray([{
                    tag: "b",
                }], __VLS_functionalComponentArgsRest(__VLS_30), false));
            var __VLS_33 = __VLS_32.slots.default;
            (__VLS_ctx.result.name);
            // @ts-ignore
            [result,];
            var __VLS_32;
            var __VLS_27;
            var __VLS_34 = {}.ElDescriptionsItem;
            /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
            // @ts-ignore
            ElDescriptionsItem;
            // @ts-ignore
            var __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
                label: "奖品描述",
            }));
            var __VLS_36 = __VLS_35.apply(void 0, __spreadArray([{
                    label: "奖品描述",
                }], __VLS_functionalComponentArgsRest(__VLS_35), false));
            var __VLS_38 = __VLS_37.slots.default;
            (__VLS_ctx.result.description);
            // @ts-ignore
            [result,];
            var __VLS_37;
            var __VLS_39 = {}.ElDescriptionsItem;
            /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
            // @ts-ignore
            ElDescriptionsItem;
            // @ts-ignore
            var __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
                label: "价值",
            }));
            var __VLS_41 = __VLS_40.apply(void 0, __spreadArray([{
                    label: "价值",
                }], __VLS_functionalComponentArgsRest(__VLS_40), false));
            var __VLS_43 = __VLS_42.slots.default;
            var __VLS_44 = {}.ElText;
            /** @type {[typeof __VLS_components.ElText, typeof __VLS_components.elText, typeof __VLS_components.ElText, typeof __VLS_components.elText, ]} */ ;
            // @ts-ignore
            ElText;
            // @ts-ignore
            var __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
                type: "danger",
                tag: "b",
            }));
            var __VLS_46 = __VLS_45.apply(void 0, __spreadArray([{
                    type: "danger",
                    tag: "b",
                }], __VLS_functionalComponentArgsRest(__VLS_45), false));
            var __VLS_48 = __VLS_47.slots.default;
            (__VLS_ctx.result.price);
            // @ts-ignore
            [result,];
            var __VLS_47;
            var __VLS_42;
            var __VLS_22;
        }
    }
    var __VLS_15;
    var __VLS_9;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['result-el-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['result-card']} */ ;
/** @type {__VLS_StyleScopedClasses['result-header']} */ ;
/** @type {__VLS_StyleScopedClasses['prize-icon']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        visible: visible,
        result: result,
        getLoseId: getLoseId,
    }); },
});
export default (await import('vue')).defineComponent({
    setup: function () { return (__VLS_exposed); },
});
; /* PartiallyEnd: #4569/main.vue */
