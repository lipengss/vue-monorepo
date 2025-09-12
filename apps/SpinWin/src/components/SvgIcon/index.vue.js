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
import { defineComponent, computed } from 'vue';
export default defineComponent({
    name: 'SvgIcon',
    props: {
        prefix: {
            type: String,
            default: 'icon',
        },
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: 'currentColor',
        },
    },
    setup: function (props) {
        var symbolId = computed(function () { return "#".concat(props.prefix, "-").concat(props.name); });
        return { symbolId: symbolId };
    },
});
debugger; /* PartiallyEnd: #3632/script.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)(__assign({ class: "svg-icon" }, { 'aria-hidden': "true" }));
__VLS_asFunctionalElement(__VLS_elements.use)({
    'xlink:href': (__VLS_ctx.symbolId),
    fill: (__VLS_ctx.color),
});
// @ts-ignore
[symbolId, color,];
/** @type {__VLS_StyleScopedClasses['svg-icon']} */ ;
var __VLS_dollars;
var __VLS_self;
