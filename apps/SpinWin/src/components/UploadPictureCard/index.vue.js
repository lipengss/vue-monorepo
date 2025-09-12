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
import { Plus } from '@element-plus/icons-vue';
import { computed, defineProps, reactive, ref, watchEffect } from 'vue';
var props = defineProps({
    size: {
        type: Number,
        default: 80,
    },
    imgs: {
        type: String,
        default: '',
    },
    limit: {
        type: Number,
        default: 1,
    },
});
var state = reactive({
    preview: {
        index: 0,
        url: '',
        show: false,
    },
});
var fileList = ref([]);
var srcList = computed(function () { return fileList.value.map(function (n) { return n.url; }); });
var getSize = computed(function () { return props.size + 'px'; });
var emits = defineEmits(['setFileList']);
watchEffect(function () {
    fileList.value = [props.imgs].map(function (n) { return ({
        url: n,
    }); });
    emits('setFileList', fileList.value);
});
var handleRemove = function (file) {
    console.log(file);
};
var handlePictureCardPreview = function (file) {
    state.preview.index = fileList.value.findIndex(function (item) { return item.name === file.name; });
    state.preview.url = file.url;
    state.preview.show = true;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_elements;
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
__VLS_ctx.getSize;
__VLS_ctx.getSize;
// CSS variable injection end 
var __VLS_0 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
ElUpload;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    action: "#",
    listType: "picture-card",
    autoUpload: (false),
    fileList: (__VLS_ctx.fileList),
    onPreview: (__VLS_ctx.handlePictureCardPreview),
    onRemove: (__VLS_ctx.handleRemove),
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        action: "#",
        listType: "picture-card",
        autoUpload: (false),
        fileList: (__VLS_ctx.fileList),
        onPreview: (__VLS_ctx.handlePictureCardPreview),
        onRemove: (__VLS_ctx.handleRemove),
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = __VLS_3.slots.default;
// @ts-ignore
[fileList, handlePictureCardPreview, handleRemove,];
var __VLS_5 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_6), false));
var __VLS_9 = __VLS_8.slots.default;
var __VLS_10 = {}.Plus;
/** @type {[typeof __VLS_components.Plus, ]} */ ;
// @ts-ignore
Plus;
// @ts-ignore
var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    color: (__VLS_ctx.limit <= __VLS_ctx.fileList.length ? '#ccc' : 'inherit'),
}));
var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
        color: (__VLS_ctx.limit <= __VLS_ctx.fileList.length ? '#ccc' : 'inherit'),
    }], __VLS_functionalComponentArgsRest(__VLS_11), false));
// @ts-ignore
[fileList, limit,];
var __VLS_8;
var __VLS_3;
if (__VLS_ctx.state.preview.show) {
    // @ts-ignore
    [state,];
    var __VLS_15 = {}.ElImageViewer;
    /** @type {[typeof __VLS_components.ElImageViewer, typeof __VLS_components.elImageViewer, ]} */ ;
    // @ts-ignore
    ElImageViewer;
    // @ts-ignore
    var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15(__assign({ 'onClose': {} }, { urlList: (__VLS_ctx.srcList), teleported: true, showProgress: true, zIndex: (3000), initialIndex: (__VLS_ctx.state.preview.index) })));
    var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([__assign({ 'onClose': {} }, { urlList: (__VLS_ctx.srcList), teleported: true, showProgress: true, zIndex: (3000), initialIndex: (__VLS_ctx.state.preview.index) })], __VLS_functionalComponentArgsRest(__VLS_16), false));
    var __VLS_19 = void 0;
    var __VLS_20 = void 0;
    var __VLS_21 = ({ close: {} },
        { onClose: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!(__VLS_ctx.state.preview.show))
                    return;
                __VLS_ctx.state.preview.show = false;
                // @ts-ignore
                [state, state, srcList,];
            } });
    var __VLS_18;
}
var __VLS_dollars;
var __VLS_self = (await import('vue')).defineComponent({
    setup: function () { return ({
        Plus: Plus,
        state: state,
        fileList: fileList,
        srcList: srcList,
        getSize: getSize,
        handleRemove: handleRemove,
        handlePictureCardPreview: handlePictureCardPreview,
    }); },
    emits: {},
    props: {
        size: {
            type: Number,
            default: 80,
        },
        imgs: {
            type: String,
            default: '',
        },
        limit: {
            type: Number,
            default: 1,
        },
    },
});
export default (await import('vue')).defineComponent({
    emits: {},
    props: {
        size: {
            type: Number,
            default: 80,
        },
        imgs: {
            type: String,
            default: '',
        },
        limit: {
            type: Number,
            default: 1,
        },
    },
});
; /* PartiallyEnd: #4569/main.vue */
