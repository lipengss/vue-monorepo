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
import { iconList, prizeLevel } from '@/utils/publicData';
import { Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { nanoid } from 'nanoid';
import { storeToRefs } from 'pinia';
import Sortable from 'sortablejs';
import { computed, onMounted, reactive } from 'vue';
var _a = storeToRefs(usePrizesStore()), prizes = _a.prizes, iconSize = _a.iconSize, fontSize = _a.fontSize;
var setSpinLocaData = usePrizesStore().setSpinLocaData;
var state = reactive({
    rowEdit: null,
    iconSearch: '',
});
var filterIconList = computed(function () {
    if (state.iconSearch) {
        return iconList.filter(function (item) { return item.description.includes(state.iconSearch); });
    }
    return iconList;
});
var addPrize = function () {
    if (prizes.value.length >= prizeLevel.length + 1) {
        return ElMessage.warning("\u6700\u591A\u6DFB\u52A0".concat(prizeLevel.length, "\u4E2A\u5956\u54C1"));
    }
    var id = nanoid();
    state.rowEdit = id;
    var prizeName = prizeLevel[prizes.value.length];
    prizes.value.push({
        id: id,
        name: prizeName,
        icon: '🌈',
        description: '',
        color: '#fff',
        totalCount: 0,
        range: 0,
        stock: 0,
        price: 0,
    });
    setSpinLocaData();
};
var removePrize = function (row) {
    prizes.value = prizes.value.filter(function (item) { return item.id !== row.id; });
    setSpinLocaData();
};
var onSave = function () {
    state.rowEdit = null;
    setSpinLocaData();
};
function rowDrop() {
    // 确保DOM已经渲染完成
    setTimeout(function () {
        var tbody = document.querySelector('.el-table__body-wrapper tbody');
        if (!tbody) {
            console.error('找不到表格DOM元素');
            return;
        }
        Sortable.create(tbody, {
            onEnd: function (_a) {
                var newIndex = _a.newIndex, oldIndex = _a.oldIndex;
                console.log('拖动了行，序号(index)"' + oldIndex + '"拖动到序号(index)"' + newIndex + '"');
                var currentRow = prizes.value.splice(oldIndex, 1)[0]; // 直接使用prizes.value
                prizes.value.splice(newIndex, 0, currentRow);
                setSpinLocaData(); // 保存更新后的数据
            },
        });
    }, 100); // 短暂延迟确保DOM已渲染
}
onMounted(function () {
    rowDrop();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
var __VLS_0 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    label: "图标大小",
    prop: "iconSize",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        label: "图标大小",
        prop: "iconSize",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = __VLS_3.slots.default;
var __VLS_5 = {}.ElSlider;
/** @type {[typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ]} */ ;
// @ts-ignore
ElSlider;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(__assign(__assign({ 'onChange': {} }, { style: {} }), { modelValue: (__VLS_ctx.iconSize), showInput: true })));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign(__assign({ 'onChange': {} }, { style: {} }), { modelValue: (__VLS_ctx.iconSize), showInput: true })], __VLS_functionalComponentArgsRest(__VLS_6), false));
var __VLS_9;
var __VLS_10;
var __VLS_11 = ({ change: {} },
    { onChange: (__VLS_ctx.setSpinLocaData) });
// @ts-ignore
[iconSize, setSpinLocaData,];
var __VLS_8;
var __VLS_3;
var __VLS_13 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    label: "文字大小",
    prop: "time",
}));
var __VLS_15 = __VLS_14.apply(void 0, __spreadArray([{
        label: "文字大小",
        prop: "time",
    }], __VLS_functionalComponentArgsRest(__VLS_14), false));
var __VLS_17 = __VLS_16.slots.default;
var __VLS_18 = {}.ElSlider;
/** @type {[typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ]} */ ;
// @ts-ignore
ElSlider;
// @ts-ignore
var __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18(__assign(__assign({ 'onChange': {} }, { style: {} }), { modelValue: (__VLS_ctx.fontSize), showInput: true })));
var __VLS_20 = __VLS_19.apply(void 0, __spreadArray([__assign(__assign({ 'onChange': {} }, { style: {} }), { modelValue: (__VLS_ctx.fontSize), showInput: true })], __VLS_functionalComponentArgsRest(__VLS_19), false));
var __VLS_22;
var __VLS_23;
var __VLS_24 = ({ change: {} },
    { onChange: (__VLS_ctx.setSpinLocaData) });
// @ts-ignore
[setSpinLocaData, fontSize,];
var __VLS_21;
var __VLS_16;
var __VLS_26 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
ElTable;
// @ts-ignore
var __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    data: (__VLS_ctx.prizes),
    border: true,
}));
var __VLS_28 = __VLS_27.apply(void 0, __spreadArray([{
        data: (__VLS_ctx.prizes),
        border: true,
    }], __VLS_functionalComponentArgsRest(__VLS_27), false));
var __VLS_30 = __VLS_29.slots.default;
// @ts-ignore
[prizes,];
var __VLS_31 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
var __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    label: "奖品等级",
    prop: "name",
    align: "center",
}));
var __VLS_33 = __VLS_32.apply(void 0, __spreadArray([{
        label: "奖品等级",
        prop: "name",
        align: "center",
    }], __VLS_functionalComponentArgsRest(__VLS_32), false));
var __VLS_35 = __VLS_34.slots.default;
{
    var __VLS_36 = __VLS_34.slots.default;
    var row = __VLS_getSlotParameters(__VLS_36)[0].row;
    if (__VLS_ctx.state.rowEdit === row.id) {
        // @ts-ignore
        [state,];
        var __VLS_37 = {}.ElSelect;
        /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
        // @ts-ignore
        ElSelect;
        // @ts-ignore
        var __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
            modelValue: (row.name),
            placeholder: "请选择",
        }));
        var __VLS_39 = __VLS_38.apply(void 0, __spreadArray([{
                modelValue: (row.name),
                placeholder: "请选择",
            }], __VLS_functionalComponentArgsRest(__VLS_38), false));
        var __VLS_41 = __VLS_40.slots.default;
        for (var _i = 0, _b = __VLS_getVForSourceType((__VLS_ctx.prizes)); _i < _b.length; _i++) {
            var item = _b[_i][0];
            // @ts-ignore
            [prizes,];
            var __VLS_42 = {}.ElOption;
            /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
            // @ts-ignore
            ElOption;
            // @ts-ignore
            var __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
                label: (item.name),
                value: (item.name),
            }));
            var __VLS_44 = __VLS_43.apply(void 0, __spreadArray([{
                    label: (item.name),
                    value: (item.name),
                }], __VLS_functionalComponentArgsRest(__VLS_43), false));
        }
        var __VLS_40;
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
        (row.name);
    }
}
var __VLS_34;
var __VLS_47 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
var __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    label: "奖品名称",
    prop: "description",
    minWidth: (120),
}));
var __VLS_49 = __VLS_48.apply(void 0, __spreadArray([{
        label: "奖品名称",
        prop: "description",
        minWidth: (120),
    }], __VLS_functionalComponentArgsRest(__VLS_48), false));
var __VLS_51 = __VLS_50.slots.default;
{
    var __VLS_52 = __VLS_50.slots.default;
    var row_1 = __VLS_getSlotParameters(__VLS_52)[0].row;
    if (__VLS_ctx.state.rowEdit === row_1.id) {
        // @ts-ignore
        [state,];
        var __VLS_53 = {}.ElInput;
        /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
        // @ts-ignore
        ElInput;
        // @ts-ignore
        var __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53(__assign({ class: "input-name" }, { modelValue: (row_1.description), placeholder: "请输入奖品名称" })));
        var __VLS_55 = __VLS_54.apply(void 0, __spreadArray([__assign({ class: "input-name" }, { modelValue: (row_1.description), placeholder: "请输入奖品名称" })], __VLS_functionalComponentArgsRest(__VLS_54), false));
        var __VLS_57 = __VLS_56.slots.default;
        {
            var __VLS_58 = __VLS_56.slots.prepend;
            var __VLS_59 = {}.ElPopover;
            /** @type {[typeof __VLS_components.ElPopover, typeof __VLS_components.elPopover, typeof __VLS_components.ElPopover, typeof __VLS_components.elPopover, ]} */ ;
            // @ts-ignore
            ElPopover;
            // @ts-ignore
            var __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
                placement: "bottom",
                trigger: "hover",
                showArrow: true,
                width: (300),
            }));
            var __VLS_61 = __VLS_60.apply(void 0, __spreadArray([{
                    placement: "bottom",
                    trigger: "hover",
                    showArrow: true,
                    width: (300),
                }], __VLS_functionalComponentArgsRest(__VLS_60), false));
            var __VLS_63 = __VLS_62.slots.default;
            {
                var __VLS_64 = __VLS_62.slots.default;
                var __VLS_65 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                // @ts-ignore
                ElInput;
                // @ts-ignore
                var __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65(__assign(__assign({ modelValue: (__VLS_ctx.state.iconSearch) }, { style: {} }), { placeholder: "请输入图标描述", suffixIcon: (__VLS_ctx.Search) })));
                var __VLS_67 = __VLS_66.apply(void 0, __spreadArray([__assign(__assign({ modelValue: (__VLS_ctx.state.iconSearch) }, { style: {} }), { placeholder: "请输入图标描述", suffixIcon: (__VLS_ctx.Search) })], __VLS_functionalComponentArgsRest(__VLS_66), false));
                // @ts-ignore
                [state, Search,];
                if (__VLS_ctx.filterIconList.length) {
                    // @ts-ignore
                    [filterIconList,];
                    var __VLS_70 = {}.ElScrollbar;
                    /** @type {[typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, ]} */ ;
                    // @ts-ignore
                    ElScrollbar;
                    // @ts-ignore
                    var __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
                        viewClass: "scroll-view",
                        maxHeight: (200),
                    }));
                    var __VLS_72 = __VLS_71.apply(void 0, __spreadArray([{
                            viewClass: "scroll-view",
                            maxHeight: (200),
                        }], __VLS_functionalComponentArgsRest(__VLS_71), false));
                    var __VLS_74 = __VLS_73.slots.default;
                    var _loop_1 = function (item) {
                        // @ts-ignore
                        [filterIconList,];
                        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign(__assign(__assign({ onClick: function () {
                                var _a = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    _a[_i] = arguments[_i];
                                }
                                var $event = _a[0];
                                if (!(__VLS_ctx.state.rowEdit === row_1.id))
                                    return;
                                if (!(__VLS_ctx.filterIconList.length))
                                    return;
                                row_1.icon = item.icon;
                            } }, { class: "item" }), { class: ({ active: item.icon === row_1.icon }) }), { key: (item.id) }));
                        (item.icon);
                        __VLS_asFunctionalElement(__VLS_elements.small, __VLS_elements.small)({});
                        (item.description);
                    };
                    for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.filterIconList)); _c < _d.length; _c++) {
                        var item = _d[_c][0];
                        _loop_1(item);
                    }
                    var __VLS_73;
                }
                else {
                    var __VLS_75 = {}.ElEmpty;
                    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
                    // @ts-ignore
                    ElEmpty;
                    // @ts-ignore
                    var __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
                        imageSize: "100",
                        description: "暂无图标",
                    }));
                    var __VLS_77 = __VLS_76.apply(void 0, __spreadArray([{
                            imageSize: "100",
                            description: "暂无图标",
                        }], __VLS_functionalComponentArgsRest(__VLS_76), false));
                }
            }
            {
                var __VLS_80 = __VLS_62.slots.reference;
                (row_1.icon);
            }
            var __VLS_62;
        }
        var __VLS_56;
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (row_1.icon);
        (row_1.description);
    }
}
var __VLS_50;
var __VLS_81 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
var __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    label: "奖品价值",
    prop: "price",
    align: "center",
}));
var __VLS_83 = __VLS_82.apply(void 0, __spreadArray([{
        label: "奖品价值",
        prop: "price",
        align: "center",
    }], __VLS_functionalComponentArgsRest(__VLS_82), false));
var __VLS_85 = __VLS_84.slots.default;
{
    var __VLS_86 = __VLS_84.slots.default;
    var row = __VLS_getSlotParameters(__VLS_86)[0].row;
    if (__VLS_ctx.state.rowEdit === row.id) {
        // @ts-ignore
        [state,];
        var __VLS_87 = {}.ElInputNumber;
        /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
        // @ts-ignore
        ElInputNumber;
        // @ts-ignore
        var __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87(__assign({ style: {} }, { modelValue: (row.price), controls: (false) })));
        var __VLS_89 = __VLS_88.apply(void 0, __spreadArray([__assign({ style: {} }, { modelValue: (row.price), controls: (false) })], __VLS_functionalComponentArgsRest(__VLS_88), false));
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (row.price.toFixed(2));
    }
}
var __VLS_84;
var __VLS_92 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
var __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    label: "扇形背景色",
    prop: "color",
    align: "center",
}));
var __VLS_94 = __VLS_93.apply(void 0, __spreadArray([{
        label: "扇形背景色",
        prop: "color",
        align: "center",
    }], __VLS_functionalComponentArgsRest(__VLS_93), false));
var __VLS_96 = __VLS_95.slots.default;
{
    var __VLS_97 = __VLS_95.slots.default;
    var row = __VLS_getSlotParameters(__VLS_97)[0].row;
    if (__VLS_ctx.state.rowEdit === row.id) {
        // @ts-ignore
        [state,];
        var __VLS_98 = {}.ElColorPicker;
        /** @type {[typeof __VLS_components.ElColorPicker, typeof __VLS_components.elColorPicker, ]} */ ;
        // @ts-ignore
        ElColorPicker;
        // @ts-ignore
        var __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
            modelValue: (row.color),
        }));
        var __VLS_100 = __VLS_99.apply(void 0, __spreadArray([{
                modelValue: (row.color),
            }], __VLS_functionalComponentArgsRest(__VLS_99), false));
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "color-block" }, { style: ("--color:".concat(row.color)) }));
        (row.color);
    }
}
var __VLS_95;
var __VLS_103 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
var __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({
    label: "剩余/库存",
    prop: "totalCount",
    align: "center",
}));
var __VLS_105 = __VLS_104.apply(void 0, __spreadArray([{
        label: "剩余/库存",
        prop: "totalCount",
        align: "center",
    }], __VLS_functionalComponentArgsRest(__VLS_104), false));
var __VLS_107 = __VLS_106.slots.default;
{
    var __VLS_108 = __VLS_106.slots.default;
    var row = __VLS_getSlotParameters(__VLS_108)[0].row;
    if (__VLS_ctx.state.rowEdit === row.id) {
        // @ts-ignore
        [state,];
        var __VLS_109 = {}.ElSpace;
        /** @type {[typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, ]} */ ;
        // @ts-ignore
        ElSpace;
        // @ts-ignore
        var __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({}));
        var __VLS_111 = __VLS_110.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_110), false));
        var __VLS_113 = __VLS_112.slots.default;
        var __VLS_114 = {}.ElInputNumber;
        /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
        // @ts-ignore
        ElInputNumber;
        // @ts-ignore
        var __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114(__assign({ style: {} }, { modelValue: (row.totalCount), controls: (false), size: "small" })));
        var __VLS_116 = __VLS_115.apply(void 0, __spreadArray([__assign({ style: {} }, { modelValue: (row.totalCount), controls: (false), size: "small" })], __VLS_functionalComponentArgsRest(__VLS_115), false));
        var __VLS_119 = {}.ElInputNumber;
        /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
        // @ts-ignore
        ElInputNumber;
        // @ts-ignore
        var __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119(__assign({ style: {} }, { modelValue: (row.stock), controls: (false), size: "small" })));
        var __VLS_121 = __VLS_120.apply(void 0, __spreadArray([__assign({ style: {} }, { modelValue: (row.stock), controls: (false), size: "small" })], __VLS_functionalComponentArgsRest(__VLS_120), false));
        var __VLS_112;
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (row.stock);
        (row.totalCount);
    }
}
var __VLS_106;
var __VLS_124 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
var __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({
    label: "中奖概率",
    prop: "range",
    align: "center",
}));
var __VLS_126 = __VLS_125.apply(void 0, __spreadArray([{
        label: "中奖概率",
        prop: "range",
        align: "center",
    }], __VLS_functionalComponentArgsRest(__VLS_125), false));
var __VLS_128 = __VLS_127.slots.default;
{
    var __VLS_129 = __VLS_127.slots.default;
    var row = __VLS_getSlotParameters(__VLS_129)[0].row;
    if (__VLS_ctx.state.rowEdit === row.id) {
        // @ts-ignore
        [state,];
        var __VLS_130 = {}.ElInputNumber;
        /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
        // @ts-ignore
        ElInputNumber;
        // @ts-ignore
        var __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130(__assign({ style: {} }, { modelValue: (row.range), controls: (false), size: "small" })));
        var __VLS_132 = __VLS_131.apply(void 0, __spreadArray([__assign({ style: {} }, { modelValue: (row.range), controls: (false), size: "small" })], __VLS_functionalComponentArgsRest(__VLS_131), false));
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
        (row.range);
    }
}
var __VLS_127;
var __VLS_135 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
var __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({
    label: "操作",
    prop: "operation",
    align: "center",
}));
var __VLS_137 = __VLS_136.apply(void 0, __spreadArray([{
        label: "操作",
        prop: "operation",
        align: "center",
    }], __VLS_functionalComponentArgsRest(__VLS_136), false));
var __VLS_139 = __VLS_138.slots.default;
{
    var __VLS_140 = __VLS_138.slots.default;
    var row_2 = __VLS_getSlotParameters(__VLS_140)[0].row;
    if (__VLS_ctx.state.rowEdit !== row_2.id) {
        // @ts-ignore
        [state,];
        var __VLS_141 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        var __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141(__assign({ 'onClick': {} }, { type: "primary", size: "small" })));
        var __VLS_143 = __VLS_142.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "primary", size: "small" })], __VLS_functionalComponentArgsRest(__VLS_142), false));
        var __VLS_145 = void 0;
        var __VLS_146 = void 0;
        var __VLS_147 = ({ click: {} },
            { onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.state.rowEdit !== row_2.id))
                        return;
                    __VLS_ctx.state.rowEdit = row_2.id;
                    // @ts-ignore
                    [state,];
                } });
        var __VLS_148 = __VLS_144.slots.default;
        var __VLS_144;
    }
    else {
        var __VLS_149 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        var __VLS_150 = __VLS_asFunctionalComponent(__VLS_149, new __VLS_149(__assign({ 'onClick': {} }, { type: "primary", size: "small" })));
        var __VLS_151 = __VLS_150.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "primary", size: "small" })], __VLS_functionalComponentArgsRest(__VLS_150), false));
        var __VLS_153 = void 0;
        var __VLS_154 = void 0;
        var __VLS_155 = ({ click: {} },
            { onClick: (__VLS_ctx.onSave) });
        var __VLS_156 = __VLS_152.slots.default;
        // @ts-ignore
        [onSave,];
        var __VLS_152;
    }
    if (__VLS_ctx.state.rowEdit === row_2.id) {
        // @ts-ignore
        [state,];
        var __VLS_157 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        var __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157(__assign({ 'onClick': {} }, { type: "info", size: "small" })));
        var __VLS_159 = __VLS_158.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "info", size: "small" })], __VLS_functionalComponentArgsRest(__VLS_158), false));
        var __VLS_161 = void 0;
        var __VLS_162 = void 0;
        var __VLS_163 = ({ click: {} },
            { onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.state.rowEdit === row_2.id))
                        return;
                    __VLS_ctx.state.rowEdit = null;
                    // @ts-ignore
                    [state,];
                } });
        var __VLS_164 = __VLS_160.slots.default;
        var __VLS_160;
    }
    else {
        var __VLS_165 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        var __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165(__assign({ 'onClick': {} }, { type: "danger", size: "small" })));
        var __VLS_167 = __VLS_166.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "danger", size: "small" })], __VLS_functionalComponentArgsRest(__VLS_166), false));
        var __VLS_169 = void 0;
        var __VLS_170 = void 0;
        var __VLS_171 = ({ click: {} },
            { onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!!(__VLS_ctx.state.rowEdit === row_2.id))
                        return;
                    __VLS_ctx.removePrize(row_2);
                    // @ts-ignore
                    [removePrize,];
                } });
        var __VLS_172 = __VLS_168.slots.default;
        var __VLS_168;
    }
}
var __VLS_138;
var __VLS_29;
var __VLS_173 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
var __VLS_174 = __VLS_asFunctionalComponent(__VLS_173, new __VLS_173(__assign(__assign({ 'onClick': {} }, { class: "add-btn" }), { type: "success" })));
var __VLS_175 = __VLS_174.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { class: "add-btn" }), { type: "success" })], __VLS_functionalComponentArgsRest(__VLS_174), false));
var __VLS_177;
var __VLS_178;
var __VLS_179 = ({ click: {} },
    { onClick: (__VLS_ctx.addPrize) });
var __VLS_180 = __VLS_176.slots.default;
// @ts-ignore
[addPrize,];
var __VLS_176;
/** @type {__VLS_StyleScopedClasses['input-name']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['color-block']} */ ;
/** @type {__VLS_StyleScopedClasses['add-btn']} */ ;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        Search: Search,
        prizes: prizes,
        iconSize: iconSize,
        fontSize: fontSize,
        setSpinLocaData: setSpinLocaData,
        state: state,
        filterIconList: filterIconList,
        addPrize: addPrize,
        removePrize: removePrize,
        onSave: onSave,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
