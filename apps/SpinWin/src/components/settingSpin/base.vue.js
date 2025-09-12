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
import UploadPictureCard from '@/components/UploadPictureCard/index.vue';
import { usePrizesStore } from '@/stores/prizes';
import { iconList } from '@/utils/publicData';
import { Delete, Warning } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';
var _a = storeToRefs(usePrizesStore()), prizes = _a.prizes, spinSty = _a.spinSty, blocks = _a.blocks, maxDailySpins = _a.maxDailySpins;
var setSpinLocaData = usePrizesStore().setSpinLocaData;
var state = reactive({
    activeTab: 'prizes',
    iconSearch: '',
    iconList: iconList,
    rowEdit: null,
    form: {
        time: 0,
    },
    rules: {
    // time: [{ required: true, message: '请输入转盘时间', trigger: 'blur' }],
    },
});
function addImg(pIndex) {
    blocks.value[pIndex].imgs.push({
        src: '',
        size: 0,
        rotate: false,
    });
    setSpinLocaData();
}
function editImg(row) {
    state.rowEdit = row;
    setSpinLocaData();
}
function removeImg(row, pIndex) {
    var currentBlock = blocks.value[pIndex];
    var index = currentBlock.imgs.findIndex(function (item) { return item.src === row.src; });
    currentBlock.imgs.splice(index, 1);
    // blocks.value = blocks.value[pIndex].imgs.filter((item) => item.src === row.src)
    setSpinLocaData();
}
/* ----------------------------------- 添加背景块 ----------------------------------- */
function addBlock() {
    blocks.value.push({
        padding: 0,
        background: '#fff',
        imgs: [],
    });
    setSpinLocaData();
}
function onRemoveBlock(pIndex) {
    blocks.value.splice(pIndex, 1);
    setSpinLocaData();
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
var __VLS_0 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ model: (__VLS_ctx.state.form), rules: (__VLS_ctx.state.rules), ref: "formRef", labelWidth: "100px", labelPosition: "top" }, { class: "demo-ruleForm" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ model: (__VLS_ctx.state.form), rules: (__VLS_ctx.state.rules), ref: "formRef", labelWidth: "100px", labelPosition: "top" }, { class: "demo-ruleForm" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_4 = {};
var __VLS_6 = __VLS_3.slots.default;
// @ts-ignore
[state, state, formRef,];
var __VLS_7 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    label: "中奖次数",
    prop: "time",
}));
var __VLS_9 = __VLS_8.apply(void 0, __spreadArray([{
        label: "中奖次数",
        prop: "time",
    }], __VLS_functionalComponentArgsRest(__VLS_8), false));
var __VLS_11 = __VLS_10.slots.default;
var __VLS_12 = {}.ElSlider;
/** @type {[typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ]} */ ;
// @ts-ignore
ElSlider;
// @ts-ignore
var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12(__assign(__assign({ 'onChange': {} }, { style: {} }), { modelValue: (__VLS_ctx.maxDailySpins), showInput: true, min: (1), max: (500), step: (1) })));
var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([__assign(__assign({ 'onChange': {} }, { style: {} }), { modelValue: (__VLS_ctx.maxDailySpins), showInput: true, min: (1), max: (500), step: (1) })], __VLS_functionalComponentArgsRest(__VLS_13), false));
var __VLS_16;
var __VLS_17;
var __VLS_18 = ({ change: {} },
    { onChange: (__VLS_ctx.setSpinLocaData) });
// @ts-ignore
[maxDailySpins, setSpinLocaData,];
var __VLS_15;
var __VLS_10;
var __VLS_20 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "转盘大小",
    prop: "time",
}));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
        label: "转盘大小",
        prop: "time",
    }], __VLS_functionalComponentArgsRest(__VLS_21), false));
var __VLS_24 = __VLS_23.slots.default;
var __VLS_25 = {}.ElSlider;
/** @type {[typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ]} */ ;
// @ts-ignore
ElSlider;
// @ts-ignore
var __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25(__assign(__assign({ 'onChange': {} }, { style: {} }), { modelValue: (__VLS_ctx.spinSty.size), showInput: true, min: (__VLS_ctx.spinSty.min), max: (__VLS_ctx.spinSty.max), step: (__VLS_ctx.spinSty.step) })));
var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([__assign(__assign({ 'onChange': {} }, { style: {} }), { modelValue: (__VLS_ctx.spinSty.size), showInput: true, min: (__VLS_ctx.spinSty.min), max: (__VLS_ctx.spinSty.max), step: (__VLS_ctx.spinSty.step) })], __VLS_functionalComponentArgsRest(__VLS_26), false));
var __VLS_29;
var __VLS_30;
var __VLS_31 = ({ change: {} },
    { onChange: (__VLS_ctx.setSpinLocaData) });
// @ts-ignore
[setSpinLocaData, spinSty, spinSty, spinSty, spinSty,];
var __VLS_28;
var __VLS_23;
var __VLS_33 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
ElCard;
// @ts-ignore
var __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    shadow: "never",
    size: "small",
    bodyStyle: "padding:6px;",
}));
var __VLS_35 = __VLS_34.apply(void 0, __spreadArray([{
        shadow: "never",
        size: "small",
        bodyStyle: "padding:6px;",
    }], __VLS_functionalComponentArgsRest(__VLS_34), false));
var __VLS_37 = __VLS_36.slots.default;
{
    var __VLS_38 = __VLS_36.slots.header;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "flex-between" }));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "mr6" }));
    var __VLS_39 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    var __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39(__assign({ 'onClick': {} }, { type: "primary", size: "small" })));
    var __VLS_41 = __VLS_40.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "primary", size: "small" })], __VLS_functionalComponentArgsRest(__VLS_40), false));
    var __VLS_43 = void 0;
    var __VLS_44 = void 0;
    var __VLS_45 = ({ click: {} },
        { onClick: (__VLS_ctx.addBlock) });
    var __VLS_46 = __VLS_42.slots.default;
    // @ts-ignore
    [addBlock,];
    var __VLS_42;
}
if (__VLS_ctx.blocks.length) {
    // @ts-ignore
    [blocks,];
    var _loop_1 = function (block, pIndex) {
        // @ts-ignore
        [blocks,];
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "block-item" }));
        var __VLS_47 = {}.ElDescriptions;
        /** @type {[typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, ]} */ ;
        // @ts-ignore
        ElDescriptions;
        // @ts-ignore
        var __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47(__assign(__assign({ column: (3), data: (__VLS_ctx.blocks) }, { class: "mb4" }), { border: true })));
        var __VLS_49 = __VLS_48.apply(void 0, __spreadArray([__assign(__assign({ column: (3), data: (__VLS_ctx.blocks) }, { class: "mb4" }), { border: true })], __VLS_functionalComponentArgsRest(__VLS_48), false));
        var __VLS_51 = __VLS_50.slots.default;
        // @ts-ignore
        [blocks,];
        var __VLS_52 = {}.ElDescriptionsItem;
        /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
        // @ts-ignore
        ElDescriptionsItem;
        // @ts-ignore
        var __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
            label: "内边距",
        }));
        var __VLS_54 = __VLS_53.apply(void 0, __spreadArray([{
                label: "内边距",
            }], __VLS_functionalComponentArgsRest(__VLS_53), false));
        var __VLS_56 = __VLS_55.slots.default;
        var __VLS_57 = {}.ElInputNumber;
        /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
        // @ts-ignore
        ElInputNumber;
        // @ts-ignore
        var __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57(__assign({ 'onChange': {} }, { modelValue: (block.padding) })));
        var __VLS_59 = __VLS_58.apply(void 0, __spreadArray([__assign({ 'onChange': {} }, { modelValue: (block.padding) })], __VLS_functionalComponentArgsRest(__VLS_58), false));
        var __VLS_61 = void 0;
        var __VLS_62 = void 0;
        var __VLS_63 = ({ change: {} },
            { onChange: (__VLS_ctx.setSpinLocaData) });
        // @ts-ignore
        [setSpinLocaData,];
        var __VLS_65 = {}.ElDescriptionsItem;
        /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
        // @ts-ignore
        ElDescriptionsItem;
        // @ts-ignore
        var __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
            label: "背景色",
        }));
        var __VLS_67 = __VLS_66.apply(void 0, __spreadArray([{
                label: "背景色",
            }], __VLS_functionalComponentArgsRest(__VLS_66), false));
        var __VLS_69 = __VLS_68.slots.default;
        var __VLS_70 = {}.ElColorPicker;
        /** @type {[typeof __VLS_components.ElColorPicker, typeof __VLS_components.elColorPicker, ]} */ ;
        // @ts-ignore
        ElColorPicker;
        // @ts-ignore
        var __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70(__assign({ 'onChange': {} }, { modelValue: (block.background) })));
        var __VLS_72 = __VLS_71.apply(void 0, __spreadArray([__assign({ 'onChange': {} }, { modelValue: (block.background) })], __VLS_functionalComponentArgsRest(__VLS_71), false));
        var __VLS_74 = void 0;
        var __VLS_75 = void 0;
        var __VLS_76 = ({ change: {} },
            { onChange: (__VLS_ctx.setSpinLocaData) });
        // @ts-ignore
        [setSpinLocaData,];
        var __VLS_78 = {}.ElDescriptionsItem;
        /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
        // @ts-ignore
        ElDescriptionsItem;
        // @ts-ignore
        var __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
            label: "操作",
        }));
        var __VLS_80 = __VLS_79.apply(void 0, __spreadArray([{
                label: "操作",
            }], __VLS_functionalComponentArgsRest(__VLS_79), false));
        var __VLS_82 = __VLS_81.slots.default;
        var __VLS_83 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        var __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83(__assign({ 'onClick': {} }, { size: "small", type: "danger", plain: true, circle: true })));
        var __VLS_85 = __VLS_84.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small", type: "danger", plain: true, circle: true })], __VLS_functionalComponentArgsRest(__VLS_84), false));
        var __VLS_87 = void 0;
        var __VLS_88 = void 0;
        var __VLS_89 = ({ click: {} },
            { onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.blocks.length))
                        return;
                    __VLS_ctx.onRemoveBlock(pIndex);
                    // @ts-ignore
                    [onRemoveBlock,];
                } });
        var __VLS_90 = __VLS_86.slots.default;
        var __VLS_91 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        ElIcon;
        // @ts-ignore
        var __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({}));
        var __VLS_93 = __VLS_92.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_92), false));
        var __VLS_95 = __VLS_94.slots.default;
        var __VLS_96 = {}.Delete;
        /** @type {[typeof __VLS_components.Delete, ]} */ ;
        // @ts-ignore
        Delete;
        // @ts-ignore
        var __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({}));
        var __VLS_98 = __VLS_97.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_97), false));
        var __VLS_101 = {}.ElTable;
        /** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
        // @ts-ignore
        ElTable;
        // @ts-ignore
        var __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
            data: (block.imgs),
            border: true,
        }));
        var __VLS_103 = __VLS_102.apply(void 0, __spreadArray([{
                data: (block.imgs),
                border: true,
            }], __VLS_functionalComponentArgsRest(__VLS_102), false));
        var __VLS_105 = __VLS_104.slots.default;
        var __VLS_106 = {}.ElTableColumn;
        /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
        // @ts-ignore
        ElTableColumn;
        // @ts-ignore
        var __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
            label: "图片",
            prop: "src",
            align: "center",
        }));
        var __VLS_108 = __VLS_107.apply(void 0, __spreadArray([{
                label: "图片",
                prop: "src",
                align: "center",
            }], __VLS_functionalComponentArgsRest(__VLS_107), false));
        var __VLS_110 = __VLS_109.slots.default;
        {
            var __VLS_111 = __VLS_109.slots.default;
            var row_1 = __VLS_getSlotParameters(__VLS_111)[0].row;
            /** @type {[typeof UploadPictureCard, ]} */ ;
            // @ts-ignore
            var __VLS_112 = __VLS_asFunctionalComponent(UploadPictureCard, new UploadPictureCard(__assign({ 'onSetFileList': {} }, { imgs: (row_1.src) })));
            var __VLS_113 = __VLS_112.apply(void 0, __spreadArray([__assign({ 'onSetFileList': {} }, { imgs: (row_1.src) })], __VLS_functionalComponentArgsRest(__VLS_112), false));
            var __VLS_115 = void 0;
            var __VLS_116 = void 0;
            var __VLS_117 = ({ setFileList: {} },
                { onSetFileList: (function (imgs) { return (row_1.imgs = imgs); }) });
        }
        var __VLS_119 = {}.ElTableColumn;
        /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
        // @ts-ignore
        ElTableColumn;
        // @ts-ignore
        var __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({
            label: "大小",
            prop: "size",
            align: "center",
        }));
        var __VLS_121 = __VLS_120.apply(void 0, __spreadArray([{
                label: "大小",
                prop: "size",
                align: "center",
            }], __VLS_functionalComponentArgsRest(__VLS_120), false));
        var __VLS_123 = __VLS_122.slots.default;
        {
            var __VLS_124 = __VLS_122.slots.default;
            var row = __VLS_getSlotParameters(__VLS_124)[0].row;
            var __VLS_125 = {}.ElInputNumber;
            /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
            // @ts-ignore
            ElInputNumber;
            // @ts-ignore
            var __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({
                modelValue: (row.size),
            }));
            var __VLS_127 = __VLS_126.apply(void 0, __spreadArray([{
                    modelValue: (row.size),
                }], __VLS_functionalComponentArgsRest(__VLS_126), false));
        }
        var __VLS_130 = {}.ElTableColumn;
        /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
        // @ts-ignore
        ElTableColumn;
        // @ts-ignore
        var __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
            label: "旋转",
            prop: "rotate",
            align: "center",
        }));
        var __VLS_132 = __VLS_131.apply(void 0, __spreadArray([{
                label: "旋转",
                prop: "rotate",
                align: "center",
            }], __VLS_functionalComponentArgsRest(__VLS_131), false));
        var __VLS_134 = __VLS_133.slots.default;
        {
            var __VLS_135 = __VLS_133.slots.header;
            __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "flex-center" }));
            __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "mr6" }));
            var __VLS_136 = {}.ElTooltip;
            /** @type {[typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ]} */ ;
            // @ts-ignore
            ElTooltip;
            // @ts-ignore
            var __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
                content: "背景图片是否跟随旋转",
                placement: "top",
            }));
            var __VLS_138 = __VLS_137.apply(void 0, __spreadArray([{
                    content: "背景图片是否跟随旋转",
                    placement: "top",
                }], __VLS_functionalComponentArgsRest(__VLS_137), false));
            var __VLS_140 = __VLS_139.slots.default;
            var __VLS_141 = {}.ElIcon;
            /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
            // @ts-ignore
            ElIcon;
            // @ts-ignore
            var __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141(__assign({ class: "mt2" })));
            var __VLS_143 = __VLS_142.apply(void 0, __spreadArray([__assign({ class: "mt2" })], __VLS_functionalComponentArgsRest(__VLS_142), false));
            var __VLS_145 = __VLS_144.slots.default;
            var __VLS_146 = {}.Warning;
            /** @type {[typeof __VLS_components.Warning, ]} */ ;
            // @ts-ignore
            Warning;
            // @ts-ignore
            var __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({}));
            var __VLS_148 = __VLS_147.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_147), false));
        }
        {
            var __VLS_151 = __VLS_133.slots.default;
            var row = __VLS_getSlotParameters(__VLS_151)[0].row;
            var __VLS_152 = {}.ElSwitch;
            /** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
            // @ts-ignore
            ElSwitch;
            // @ts-ignore
            var __VLS_153 = __VLS_asFunctionalComponent(__VLS_152, new __VLS_152({
                modelValue: (row.rotate),
            }));
            var __VLS_154 = __VLS_153.apply(void 0, __spreadArray([{
                    modelValue: (row.rotate),
                }], __VLS_functionalComponentArgsRest(__VLS_153), false));
        }
        var __VLS_157 = {}.ElTableColumn;
        /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
        // @ts-ignore
        ElTableColumn;
        // @ts-ignore
        var __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({
            label: "操作",
            align: "center",
        }));
        var __VLS_159 = __VLS_158.apply(void 0, __spreadArray([{
                label: "操作",
                align: "center",
            }], __VLS_functionalComponentArgsRest(__VLS_158), false));
        var __VLS_161 = __VLS_160.slots.default;
        {
            var __VLS_162 = __VLS_160.slots.default;
            var row_2 = __VLS_getSlotParameters(__VLS_162)[0].row;
            var __VLS_163 = {}.ElButton;
            /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
            // @ts-ignore
            ElButton;
            // @ts-ignore
            var __VLS_164 = __VLS_asFunctionalComponent(__VLS_163, new __VLS_163(__assign({ 'onClick': {} }, { type: "primary", size: "small" })));
            var __VLS_165 = __VLS_164.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "primary", size: "small" })], __VLS_functionalComponentArgsRest(__VLS_164), false));
            var __VLS_167 = void 0;
            var __VLS_168 = void 0;
            var __VLS_169 = ({ click: {} },
                { onClick: function () {
                        var _a = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            _a[_i] = arguments[_i];
                        }
                        var $event = _a[0];
                        if (!(__VLS_ctx.blocks.length))
                            return;
                        __VLS_ctx.editImg(row_2);
                        // @ts-ignore
                        [editImg,];
                    } });
            var __VLS_170 = __VLS_166.slots.default;
            var __VLS_171 = {}.ElButton;
            /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
            // @ts-ignore
            ElButton;
            // @ts-ignore
            var __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171(__assign({ 'onClick': {} }, { type: "danger", size: "small" })));
            var __VLS_173 = __VLS_172.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "danger", size: "small" })], __VLS_functionalComponentArgsRest(__VLS_172), false));
            var __VLS_175 = void 0;
            var __VLS_176 = void 0;
            var __VLS_177 = ({ click: {} },
                { onClick: function () {
                        var _a = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            _a[_i] = arguments[_i];
                        }
                        var $event = _a[0];
                        if (!(__VLS_ctx.blocks.length))
                            return;
                        __VLS_ctx.removeImg(row_2, pIndex);
                        // @ts-ignore
                        [removeImg,];
                    } });
            var __VLS_178 = __VLS_174.slots.default;
        }
        var __VLS_179 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        var __VLS_180 = __VLS_asFunctionalComponent(__VLS_179, new __VLS_179(__assign(__assign({ 'onClick': {} }, { type: "success", size: "small" }), { class: "w100" })));
        var __VLS_181 = __VLS_180.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { type: "success", size: "small" }), { class: "w100" })], __VLS_functionalComponentArgsRest(__VLS_180), false));
        var __VLS_183 = void 0;
        var __VLS_184 = void 0;
        var __VLS_185 = ({ click: {} },
            { onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.blocks.length))
                        return;
                    __VLS_ctx.addImg(pIndex);
                    // @ts-ignore
                    [addImg,];
                } });
        var __VLS_186 = __VLS_182.slots.default;
    };
    var __VLS_60, __VLS_55, __VLS_73, __VLS_68, __VLS_94, __VLS_86, __VLS_81, __VLS_50, __VLS_114, __VLS_109, __VLS_122, __VLS_144, __VLS_139, __VLS_133, __VLS_166, __VLS_174, __VLS_160, __VLS_104, __VLS_182;
    for (var _i = 0, _b = __VLS_getVForSourceType((__VLS_ctx.blocks)); _i < _b.length; _i++) {
        var _c = _b[_i], block = _c[0], pIndex = _c[1];
        _loop_1(block, pIndex);
    }
}
else {
    var __VLS_187 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    ElEmpty;
    // @ts-ignore
    var __VLS_188 = __VLS_asFunctionalComponent(__VLS_187, new __VLS_187({}));
    var __VLS_189 = __VLS_188.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_188), false));
}
var __VLS_36;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['demo-ruleForm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mr6']} */ ;
/** @type {__VLS_StyleScopedClasses['block-item']} */ ;
/** @type {__VLS_StyleScopedClasses['mb4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mr6']} */ ;
/** @type {__VLS_StyleScopedClasses['mt2']} */ ;
/** @type {__VLS_StyleScopedClasses['w100']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        UploadPictureCard: UploadPictureCard,
        Delete: Delete,
        Warning: Warning,
        spinSty: spinSty,
        blocks: blocks,
        maxDailySpins: maxDailySpins,
        setSpinLocaData: setSpinLocaData,
        state: state,
        addImg: addImg,
        editImg: editImg,
        removeImg: removeImg,
        addBlock: addBlock,
        onRemoveBlock: onRemoveBlock,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
