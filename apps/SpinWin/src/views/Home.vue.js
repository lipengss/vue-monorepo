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
import SettingSpin from '@/components/SettingSpin/index.vue';
import SpinResult from '@/components/SpinResult/index.vue';
import { useSound } from '@/hooks/useSound';
import { usePrizesStore } from '@/stores/prizes';
import { weightedRandom } from '@/utils/tools';
import confetti from 'canvas-confetti';
import { ElMessage, ElMessageBox } from 'element-plus';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
var _a = storeToRefs(usePrizesStore()), prizes = _a.prizes, spinSty = _a.spinSty, spinHistory = _a.spinHistory, todaySpinCount = _a.todaySpinCount, maxDailySpins = _a.maxDailySpins, getSpinSize = _a.getSpinSize, getBlocks = _a.getBlocks, iconSize = _a.iconSize, fontSize = _a.fontSize, getLoseId = _a.getLoseId;
var _b = usePrizesStore(), getRemainingSpins = _b.getRemainingSpins, initLocalSet = _b.initLocalSet, setSpinLocaData = _b.setSpinLocaData;
var myLuckyRef = ref();
var settingSpinRef = ref();
var spinResultRef = ref();
var currentPrizeIndex = ref(0);
var prizesList = computed(function () {
    return prizes.value.map(function (n) { return ({
        id: n.id,
        range: n.range,
        fonts: [
            { text: n.name, fontColor: '#fff', fontSize: fontSize.value + 'px', top: '10%' },
            { text: n.icon, fontSize: iconSize.value + 'px', top: '35%' },
        ],
        background: n.color,
        description: n.description,
        price: n.price,
    }); });
});
var buttons = [
    {
        radius: '24%',
        background: '#8a9bf3',
        pointer: true,
        fonts: [{ text: '开始', top: '-10px' }],
    },
];
function getIndex() {
    var weights = prizes.value.filter(function (n) { return n.stock > 0; }).map(function (n) { return n.range; });
    var index = weightedRandom(weights);
    return index;
}
function startCallback() {
    useSound().playSound('/click.mp3', false);
    if (maxDailySpins.value <= todaySpinCount.value) {
        ElMessage.error('今日已抽完');
        return;
    }
    // 调用抽奖组件的play方法开始游戏
    myLuckyRef.value.play();
    // 模拟调用接口异步抽奖
    setTimeout(function () {
        currentPrizeIndex.value = getIndex();
        // 调用stop停止旋转并传递中奖索引
        myLuckyRef.value.stop(currentPrizeIndex.value);
    }, 1000);
}
function onResetSpinCount() {
    ElMessageBox.confirm('确定重置今日抽奖次数吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(function () {
        todaySpinCount.value = 0;
        ElMessage.success('重置成功');
        setSpinLocaData();
    });
}
// 抽奖结束会触发end回调
function endCallback(prize) {
    var result = {
        id: prize.id,
        name: prize.fonts[0].text,
        icon: prize.fonts[1].text,
        description: prize.description,
        timestamp: new Date().getTime(),
        price: prize.price,
    };
    spinHistory.value.push(result);
    console.log('prize', prize);
    // 增加今日抽奖次数
    todaySpinCount.value++;
    // 减少库存
    prizes.value[currentPrizeIndex.value].stock--;
    spinResultRef.value.open(result);
    // 设置本地存储
    setSpinLocaData();
    if (result.id !== getLoseId.value) {
        useSound().playSound('/win.mp3', false);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    }
    else {
        useSound().playSound('/lose.mp3', false);
    }
}
function clearHistory() {
    ElMessageBox.confirm('确定清空最近中奖记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(function () {
        spinHistory.value = [];
        setSpinLocaData();
    });
}
onMounted(function () {
    initLocalSet();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['prize-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
var __VLS_0 = {}.ElSplitter;
/** @type {[typeof __VLS_components.ElSplitter, typeof __VLS_components.elSplitter, typeof __VLS_components.ElSplitter, typeof __VLS_components.elSplitter, ]} */ ;
// @ts-ignore
ElSplitter;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ class: "home-splitter" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ class: "home-splitter" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = __VLS_3.slots.default;
var __VLS_5 = {}.ElSplitterPanel;
/** @type {[typeof __VLS_components.ElSplitterPanel, typeof __VLS_components.elSplitterPanel, typeof __VLS_components.ElSplitterPanel, typeof __VLS_components.elSplitterPanel, ]} */ ;
// @ts-ignore
ElSplitterPanel;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(__assign({ style: {} })));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign({ style: {} })], __VLS_functionalComponentArgsRest(__VLS_6), false));
var __VLS_9 = __VLS_8.slots.default;
var __VLS_10 = {}.ElSplitter;
/** @type {[typeof __VLS_components.ElSplitter, typeof __VLS_components.elSplitter, typeof __VLS_components.ElSplitter, typeof __VLS_components.elSplitter, ]} */ ;
// @ts-ignore
ElSplitter;
// @ts-ignore
var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    layout: "vertical",
}));
var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
        layout: "vertical",
    }], __VLS_functionalComponentArgsRest(__VLS_11), false));
var __VLS_14 = __VLS_13.slots.default;
var __VLS_15 = {}.ElSplitterPanel;
/** @type {[typeof __VLS_components.ElSplitterPanel, typeof __VLS_components.elSplitterPanel, typeof __VLS_components.ElSplitterPanel, typeof __VLS_components.elSplitterPanel, ]} */ ;
// @ts-ignore
ElSplitterPanel;
// @ts-ignore
var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15(__assign({ collapsible: true }, { class: "pd0" })));
var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([__assign({ collapsible: true }, { class: "pd0" })], __VLS_functionalComponentArgsRest(__VLS_16), false));
var __VLS_19 = __VLS_18.slots.default;
var __VLS_20 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
ElCard;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20(__assign(__assign(__assign({ ref: "cardRef" }, { class: "wheel-card" }), { bodyClass: "wheel-card-body", size: "small" }), { style: {} })));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([__assign(__assign(__assign({ ref: "cardRef" }, { class: "wheel-card" }), { bodyClass: "wheel-card-body", size: "small" }), { style: {} })], __VLS_functionalComponentArgsRest(__VLS_21), false));
/** @type {typeof __VLS_ctx.cardRef} */ ;
var __VLS_24 = {};
var __VLS_26 = __VLS_23.slots.default;
// @ts-ignore
[cardRef,];
{
    var __VLS_27 = __VLS_23.slots.header;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "flex-between" }));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    var __VLS_28 = {}.ElSpace;
    /** @type {[typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, ]} */ ;
    // @ts-ignore
    ElSpace;
    // @ts-ignore
    var __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
    var __VLS_30 = __VLS_29.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_29), false));
    var __VLS_32 = __VLS_31.slots.default;
    var __VLS_33 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    ElTag;
    // @ts-ignore
    var __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        type: (__VLS_ctx.getRemainingSpins() > 0 ? 'success' : 'danger'),
    }));
    var __VLS_35 = __VLS_34.apply(void 0, __spreadArray([{
            type: (__VLS_ctx.getRemainingSpins() > 0 ? 'success' : 'danger'),
        }], __VLS_functionalComponentArgsRest(__VLS_34), false));
    var __VLS_37 = __VLS_36.slots.default;
    // @ts-ignore
    [getRemainingSpins,];
    (__VLS_ctx.todaySpinCount);
    (__VLS_ctx.maxDailySpins);
    // @ts-ignore
    [todaySpinCount, maxDailySpins,];
    var __VLS_36;
    var __VLS_38 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    var __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38(__assign({ 'onClick': {} }, { size: "small", type: "danger" })));
    var __VLS_40 = __VLS_39.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small", type: "danger" })], __VLS_functionalComponentArgsRest(__VLS_39), false));
    var __VLS_42 = void 0;
    var __VLS_43 = void 0;
    var __VLS_44 = ({ click: {} },
        { onClick: (__VLS_ctx.onResetSpinCount) });
    var __VLS_45 = __VLS_41.slots.default;
    // @ts-ignore
    [onResetSpinCount,];
    var __VLS_41;
    var __VLS_46 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    var __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46(__assign({ 'onClick': {} }, { size: "small", type: "warning", id: "prize-set" })));
    var __VLS_48 = __VLS_47.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small", type: "warning", id: "prize-set" })], __VLS_functionalComponentArgsRest(__VLS_47), false));
    var __VLS_50 = void 0;
    var __VLS_51 = void 0;
    var __VLS_52 = ({ click: {} },
        { onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.settingSpinRef.open('base');
                // @ts-ignore
                [settingSpinRef,];
            } });
    var __VLS_53 = __VLS_49.slots.default;
    var __VLS_49;
    var __VLS_31;
}
var __VLS_54 = {}.LuckyWheel;
/** @type {[typeof __VLS_components.LuckyWheel, ]} */ ;
// @ts-ignore
LuckyWheel;
// @ts-ignore
var __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54(__assign(__assign({ 'onStart': {} }, { 'onEnd': {} }), { ref: "myLuckyRef", key: (__VLS_ctx.getSpinSize), width: (__VLS_ctx.getSpinSize), height: (__VLS_ctx.getSpinSize), prizes: (__VLS_ctx.prizesList), blocks: (__VLS_ctx.getBlocks), buttons: (__VLS_ctx.buttons) })));
var __VLS_56 = __VLS_55.apply(void 0, __spreadArray([__assign(__assign({ 'onStart': {} }, { 'onEnd': {} }), { ref: "myLuckyRef", key: (__VLS_ctx.getSpinSize), width: (__VLS_ctx.getSpinSize), height: (__VLS_ctx.getSpinSize), prizes: (__VLS_ctx.prizesList), blocks: (__VLS_ctx.getBlocks), buttons: (__VLS_ctx.buttons) })], __VLS_functionalComponentArgsRest(__VLS_55), false));
var __VLS_58;
var __VLS_59;
var __VLS_60 = ({ start: {} },
    { onStart: (__VLS_ctx.startCallback) });
var __VLS_61 = ({ end: {} },
    { onEnd: (__VLS_ctx.endCallback) });
/** @type {typeof __VLS_ctx.myLuckyRef} */ ;
var __VLS_62 = {};
// @ts-ignore
[getSpinSize, getSpinSize, getSpinSize, prizesList, getBlocks, buttons, startCallback, endCallback, myLuckyRef,];
var __VLS_57;
var __VLS_65 = {}.ElSlider;
/** @type {[typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ]} */ ;
// @ts-ignore
ElSlider;
// @ts-ignore
var __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65(__assign({ class: "my-slider" }, { modelValue: (__VLS_ctx.spinSty.size), size: "small", showInput: true, min: (__VLS_ctx.spinSty.min), max: (__VLS_ctx.spinSty.max), step: (__VLS_ctx.spinSty.step) })));
var __VLS_67 = __VLS_66.apply(void 0, __spreadArray([__assign({ class: "my-slider" }, { modelValue: (__VLS_ctx.spinSty.size), size: "small", showInput: true, min: (__VLS_ctx.spinSty.min), max: (__VLS_ctx.spinSty.max), step: (__VLS_ctx.spinSty.step) })], __VLS_functionalComponentArgsRest(__VLS_66), false));
// @ts-ignore
[spinSty, spinSty, spinSty, spinSty,];
var __VLS_23;
var __VLS_18;
var __VLS_70 = {}.ElSplitterPanel;
/** @type {[typeof __VLS_components.ElSplitterPanel, typeof __VLS_components.elSplitterPanel, typeof __VLS_components.ElSplitterPanel, typeof __VLS_components.elSplitterPanel, ]} */ ;
// @ts-ignore
ElSplitterPanel;
// @ts-ignore
var __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70(__assign({ collapsible: true }, { class: "pd0" })));
var __VLS_72 = __VLS_71.apply(void 0, __spreadArray([__assign({ collapsible: true }, { class: "pd0" })], __VLS_functionalComponentArgsRest(__VLS_71), false));
var __VLS_74 = __VLS_73.slots.default;
var __VLS_75 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
ElCard;
// @ts-ignore
var __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75(__assign({ class: "record-card" })));
var __VLS_77 = __VLS_76.apply(void 0, __spreadArray([__assign({ class: "record-card" })], __VLS_functionalComponentArgsRest(__VLS_76), false));
var __VLS_79 = __VLS_78.slots.default;
{
    var __VLS_80 = __VLS_78.slots.header;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "flex-between" }));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    var __VLS_81 = {}.ElSpace;
    /** @type {[typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, ]} */ ;
    // @ts-ignore
    ElSpace;
    // @ts-ignore
    var __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({}));
    var __VLS_83 = __VLS_82.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_82), false));
    var __VLS_85 = __VLS_84.slots.default;
    var __VLS_86 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    var __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86(__assign({ 'onClick': {} }, { size: "small", type: "danger" })));
    var __VLS_88 = __VLS_87.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small", type: "danger" })], __VLS_functionalComponentArgsRest(__VLS_87), false));
    var __VLS_90 = void 0;
    var __VLS_91 = void 0;
    var __VLS_92 = ({ click: {} },
        { onClick: (__VLS_ctx.clearHistory) });
    var __VLS_93 = __VLS_89.slots.default;
    // @ts-ignore
    [clearHistory,];
    var __VLS_89;
    var __VLS_94 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    var __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94(__assign({ 'onClick': {} }, { size: "small", type: "warning" })));
    var __VLS_96 = __VLS_95.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small", type: "warning" })], __VLS_functionalComponentArgsRest(__VLS_95), false));
    var __VLS_98 = void 0;
    var __VLS_99 = void 0;
    var __VLS_100 = ({ click: {} },
        { onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.settingSpinRef.open('history');
                // @ts-ignore
                [settingSpinRef,];
            } });
    var __VLS_101 = __VLS_97.slots.default;
    var __VLS_97;
    var __VLS_84;
}
if (__VLS_ctx.spinHistory.length === 0) {
    // @ts-ignore
    [spinHistory,];
    var __VLS_102 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    ElEmpty;
    // @ts-ignore
    var __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
        description: "暂无中奖记录",
    }));
    var __VLS_104 = __VLS_103.apply(void 0, __spreadArray([{
            description: "暂无中奖记录",
        }], __VLS_functionalComponentArgsRest(__VLS_103), false));
}
else {
    var __VLS_107 = {}.ElScrollbar;
    /** @type {[typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, ]} */ ;
    // @ts-ignore
    ElScrollbar;
    // @ts-ignore
    var __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107({
        viewStyle: "padding:10px 20px 10px 10px",
    }));
    var __VLS_109 = __VLS_108.apply(void 0, __spreadArray([{
            viewStyle: "padding:10px 20px 10px 10px",
        }], __VLS_functionalComponentArgsRest(__VLS_108), false));
    var __VLS_111 = __VLS_110.slots.default;
    var __VLS_112 = {}.ElTimeline;
    /** @type {[typeof __VLS_components.ElTimeline, typeof __VLS_components.elTimeline, typeof __VLS_components.ElTimeline, typeof __VLS_components.elTimeline, ]} */ ;
    // @ts-ignore
    ElTimeline;
    // @ts-ignore
    var __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({}));
    var __VLS_114 = __VLS_113.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_113), false));
    var __VLS_116 = __VLS_115.slots.default;
    for (var _i = 0, _c = __VLS_getVForSourceType((__VLS_ctx.spinHistory.slice(0, 8))); _i < _c.length; _i++) {
        var record = _c[_i][0];
        // @ts-ignore
        [spinHistory,];
        var __VLS_117 = {}.ElTimelineItem;
        /** @type {[typeof __VLS_components.ElTimelineItem, typeof __VLS_components.elTimelineItem, typeof __VLS_components.ElTimelineItem, typeof __VLS_components.elTimelineItem, ]} */ ;
        // @ts-ignore
        ElTimelineItem;
        // @ts-ignore
        var __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
            key: (record.id),
            type: (record.id === __VLS_ctx.getLoseId ? 'primary' : 'success'),
            placement: "top",
            timestamp: (new Date(record.timestamp).toLocaleTimeString()),
        }));
        var __VLS_119 = __VLS_118.apply(void 0, __spreadArray([{
                key: (record.id),
                type: (record.id === __VLS_ctx.getLoseId ? 'primary' : 'success'),
                placement: "top",
                timestamp: (new Date(record.timestamp).toLocaleTimeString()),
            }], __VLS_functionalComponentArgsRest(__VLS_118), false));
        var __VLS_121 = __VLS_120.slots.default;
        // @ts-ignore
        [getLoseId,];
        var __VLS_122 = {}.ElCard;
        /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
        // @ts-ignore
        ElCard;
        // @ts-ignore
        var __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
            bodyStyle: "padding: 10px;",
            header: (record.icon + ' ' + record.name),
        }));
        var __VLS_124 = __VLS_123.apply(void 0, __spreadArray([{
                bodyStyle: "padding: 10px;",
                header: (record.icon + ' ' + record.name),
            }], __VLS_functionalComponentArgsRest(__VLS_123), false));
        var __VLS_126 = __VLS_125.slots.default;
        __VLS_asFunctionalElement(__VLS_elements.h4, __VLS_elements.h4)({});
        (record.description);
        var __VLS_125;
        var __VLS_120;
    }
    var __VLS_115;
    var __VLS_110;
}
var __VLS_78;
var __VLS_73;
var __VLS_13;
var __VLS_8;
var __VLS_127 = {}.ElSplitterPanel;
/** @type {[typeof __VLS_components.ElSplitterPanel, typeof __VLS_components.elSplitterPanel, typeof __VLS_components.ElSplitterPanel, typeof __VLS_components.elSplitterPanel, ]} */ ;
// @ts-ignore
ElSplitterPanel;
// @ts-ignore
var __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127(__assign({ collapsible: true }, { class: "pd0" })));
var __VLS_129 = __VLS_128.apply(void 0, __spreadArray([__assign({ collapsible: true }, { class: "pd0" })], __VLS_functionalComponentArgsRest(__VLS_128), false));
var __VLS_131 = __VLS_130.slots.default;
var __VLS_132 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
ElCard;
// @ts-ignore
var __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({}));
var __VLS_134 = __VLS_133.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_133), false));
var __VLS_136 = __VLS_135.slots.default;
{
    var __VLS_137 = __VLS_135.slots.header;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "flex-between" }));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({});
    var __VLS_138 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    var __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138(__assign({ 'onClick': {} }, { size: "small", type: "warning" })));
    var __VLS_140 = __VLS_139.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small", type: "warning" })], __VLS_functionalComponentArgsRest(__VLS_139), false));
    var __VLS_142 = void 0;
    var __VLS_143 = void 0;
    var __VLS_144 = ({ click: {} },
        { onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.settingSpinRef.open('prize');
                // @ts-ignore
                [settingSpinRef,];
            } });
    var __VLS_145 = __VLS_141.slots.default;
    var __VLS_141;
}
var __VLS_146 = {}.ElScrollbar;
/** @type {[typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, typeof __VLS_components.ElScrollbar, typeof __VLS_components.elScrollbar, ]} */ ;
// @ts-ignore
ElScrollbar;
// @ts-ignore
var __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
    viewClass: "prize-list",
}));
var __VLS_148 = __VLS_147.apply(void 0, __spreadArray([{
        viewClass: "prize-list",
    }], __VLS_functionalComponentArgsRest(__VLS_147), false));
var __VLS_150 = __VLS_149.slots.default;
for (var _d = 0, _e = __VLS_getVForSourceType((__VLS_ctx.prizes)); _d < _e.length; _d++) {
    var prize = _e[_d][0];
    // @ts-ignore
    [prizes,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ key: (prize.id) }, { class: "prize-item" }));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "prize-info" }));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "prize-icon-small" }));
    (prize.icon);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "prize-content" }));
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "prize-header" }));
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)(__assign({ class: "prize-name" }));
    (prize.name);
    var __VLS_151 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    ElTag;
    // @ts-ignore
    var __VLS_152 = __VLS_asFunctionalComponent(__VLS_151, new __VLS_151({
        type: (prize.stock > 10 ? 'success' : prize.stock > 0 ? 'warning' : 'danger'),
        size: "small",
    }));
    var __VLS_153 = __VLS_152.apply(void 0, __spreadArray([{
            type: (prize.stock > 10 ? 'success' : prize.stock > 0 ? 'warning' : 'danger'),
            size: "small",
        }], __VLS_functionalComponentArgsRest(__VLS_152), false));
    var __VLS_155 = __VLS_154.slots.default;
    (prize.stock);
    (prize.totalCount);
    var __VLS_154;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "prize-description" }));
    (prize.description);
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)(__assign({ class: "prize-progress" }));
    var __VLS_156 = {}.ElProgress;
    /** @type {[typeof __VLS_components.ElProgress, typeof __VLS_components.elProgress, ]} */ ;
    // @ts-ignore
    ElProgress;
    // @ts-ignore
    var __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({
        percentage: ((prize.stock / prize.totalCount) * 100),
        showText: (false),
        strokeWidth: (6),
        color: (prize.stock > 10 ? '#67c23a' : prize.stock > 0 ? '#e6a23c' : '#f56c6c'),
    }));
    var __VLS_158 = __VLS_157.apply(void 0, __spreadArray([{
            percentage: ((prize.stock / prize.totalCount) * 100),
            showText: (false),
            strokeWidth: (6),
            color: (prize.stock > 10 ? '#67c23a' : prize.stock > 0 ? '#e6a23c' : '#f56c6c'),
        }], __VLS_functionalComponentArgsRest(__VLS_157), false));
}
var __VLS_149;
var __VLS_135;
var __VLS_130;
var __VLS_3;
/** @type {[typeof SettingSpin, ]} */ ;
// @ts-ignore
var __VLS_161 = __VLS_asFunctionalComponent(SettingSpin, new SettingSpin({
    ref: "settingSpinRef",
}));
var __VLS_162 = __VLS_161.apply(void 0, __spreadArray([{
        ref: "settingSpinRef",
    }], __VLS_functionalComponentArgsRest(__VLS_161), false));
/** @type {typeof __VLS_ctx.settingSpinRef} */ ;
var __VLS_164 = {};
// @ts-ignore
[settingSpinRef,];
var __VLS_163;
/** @type {[typeof SpinResult, ]} */ ;
// @ts-ignore
var __VLS_167 = __VLS_asFunctionalComponent(SpinResult, new SpinResult({
    ref: "spinResultRef",
}));
var __VLS_168 = __VLS_167.apply(void 0, __spreadArray([{
        ref: "spinResultRef",
    }], __VLS_functionalComponentArgsRest(__VLS_167), false));
/** @type {typeof __VLS_ctx.spinResultRef} */ ;
var __VLS_170 = {};
// @ts-ignore
[spinResultRef,];
var __VLS_169;
/** @type {__VLS_StyleScopedClasses['home-splitter']} */ ;
/** @type {__VLS_StyleScopedClasses['pd0']} */ ;
/** @type {__VLS_StyleScopedClasses['wheel-card']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-between']} */ ;
/** @type {__VLS_StyleScopedClasses['my-slider']} */ ;
/** @type {__VLS_StyleScopedClasses['pd0']} */ ;
/** @type {__VLS_StyleScopedClasses['record-card']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-between']} */ ;
/** @type {__VLS_StyleScopedClasses['pd0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-between']} */ ;
/** @type {__VLS_StyleScopedClasses['prize-item']} */ ;
/** @type {__VLS_StyleScopedClasses['prize-info']} */ ;
/** @type {__VLS_StyleScopedClasses['prize-icon-small']} */ ;
/** @type {__VLS_StyleScopedClasses['prize-content']} */ ;
/** @type {__VLS_StyleScopedClasses['prize-header']} */ ;
/** @type {__VLS_StyleScopedClasses['prize-name']} */ ;
/** @type {__VLS_StyleScopedClasses['prize-description']} */ ;
/** @type {__VLS_StyleScopedClasses['prize-progress']} */ ;
// @ts-ignore
var __VLS_25 = __VLS_24, __VLS_63 = __VLS_62, __VLS_165 = __VLS_164, __VLS_171 = __VLS_170;
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        SettingSpin: SettingSpin,
        SpinResult: SpinResult,
        prizes: prizes,
        spinSty: spinSty,
        spinHistory: spinHistory,
        todaySpinCount: todaySpinCount,
        maxDailySpins: maxDailySpins,
        getSpinSize: getSpinSize,
        getBlocks: getBlocks,
        getLoseId: getLoseId,
        getRemainingSpins: getRemainingSpins,
        myLuckyRef: myLuckyRef,
        settingSpinRef: settingSpinRef,
        spinResultRef: spinResultRef,
        prizesList: prizesList,
        buttons: buttons,
        startCallback: startCallback,
        onResetSpinCount: onResetSpinCount,
        endCallback: endCallback,
        clearHistory: clearHistory,
    }); },
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
