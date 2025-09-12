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
import { Local } from '@common/utils';
import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';
export var usePrizesStore = defineStore('prizes', {
    state: function () { return ({
        // 转盘配置
        spinSty: {
            min: 300,
            max: 1200,
            step: 10,
            size: 400,
        },
        fontSty: {},
        // 奖品配置
        prizes: [
            {
                id: nanoid(),
                name: '一等奖',
                description: 'iPhone 15 Pro',
                range: 0.01,
                color: '#FF6B6B',
                icon: '📱',
                stock: 2,
                totalCount: 2,
                price: 8999,
            },
            {
                id: nanoid(),
                name: '二等奖',
                description: 'iPad Air',
                range: 0.05,
                color: '#4ECDC4',
                icon: '📱',
                stock: 5,
                totalCount: 5,
                price: 4999,
            },
            {
                id: nanoid(),
                name: '三等奖',
                description: 'AirPods Pro',
                range: 0.1,
                color: '#45B7D1',
                icon: '🎧',
                stock: 10,
                totalCount: 10,
                price: 1999,
            },
            {
                id: nanoid(),
                name: '四等奖',
                description: '小米手环',
                range: 0.15,
                color: '#96CEB4',
                icon: '⌚',
                stock: 20,
                totalCount: 20,
                price: 299,
            },
            {
                id: nanoid(),
                name: '五等奖',
                description: '充电宝',
                range: 0.2,
                color: '#FFEAA7',
                icon: '🔋',
                stock: 50,
                totalCount: 50,
                price: 99,
            },
            {
                id: nanoid(),
                name: '六等奖',
                description: '数据线',
                range: 0.25,
                color: '#DDA0DD',
                icon: '🔌',
                stock: 100,
                totalCount: 100,
                price: 29,
            },
            {
                id: nanoid(),
                name: '谢谢参与',
                description: '下次再来',
                range: 0.24,
                color: '#FFB6C1',
                icon: '🎈',
                stock: 999999,
                totalCount: 999999,
                price: 0,
            },
        ],
        blocks: [
            {
                padding: 13,
                background: '#617df2',
                imgs: [
                // {
                //   src: 'https://w.wallhaven.cc/full/xe/wallhaven-xe8g6o.jpg',
                //   rotate: false,
                //   size: 500,
                // },
                ],
            },
        ],
        // 中奖记录
        spinHistory: [],
        // 用户今日抽奖次数
        todaySpinCount: 0,
        maxDailySpins: 3, // 每日最大抽奖次数
        iconSize: 30,
        fontSize: 16,
    }); },
    getters: {
        getSpinSize: function (state) { return state.spinSty.size + 'px'; },
        getBlocks: function (state) {
            return state.blocks.map(function (item) { return ({
                background: item.background,
                padding: item.padding + 'px',
                imgs: item.imgs.map(function (img) { return ({
                    src: img.src,
                    width: img.size + 'px',
                    height: img.size + 'px',
                    top: '20px',
                }); }),
            }); });
        },
        getLoseId: function (state) {
            return state.prizes.find(function (item) { return item.name === '谢谢参与'; }).id;
        },
    },
    actions: {
        initLocalSet: function () {
            if (Local.get('SpinData')) {
                var data = Local.get('SpinData');
                this.spinSty = data.spinSty;
                this.prizes = data.prizes;
                this.blocks = data.blocks;
                this.spinHistory = data.spinHistory;
                this.todaySpinCount = data.todaySpinCount;
                this.maxDailySpins = data.maxDailySpins;
                this.iconSize = data.iconSize;
                this.fontSize = data.fontSize;
            }
            else {
                this.setSpinLocaData();
            }
        },
        setSpinLocaData: function () {
            Local.set('SpinData', {
                spinSty: this.spinSty,
                prizes: this.prizes,
                blocks: this.blocks,
                spinHistory: this.spinHistory,
                todaySpinCount: this.todaySpinCount,
                maxDailySpins: this.maxDailySpins,
                iconSize: this.iconSize,
                fontSize: this.fontSize,
            });
        },
        // 重置今日抽奖次数（可以用于测试或管理员操作）
        resetDailyCount: function () {
            this.todaySpinCount = 0;
        },
        // 补充库存（管理员功能）
        restockPrize: function (prizeId, amount) {
            var prize = this.prizes.find(function (p) { return p.id === prizeId; });
            if (prize) {
                prize.stock += amount;
                prize.totalCount += amount;
            }
        },
        // 获取奖品统计信息
        getPrizeStats: function () {
            var _this = this;
            return this.prizes.map(function (prize) { return (__assign(__assign({}, prize), { winCount: _this.spinHistory.filter(function (record) { return record.prizeId === prize.id; }).length, stockPercentage: prize.totalCount > 0 ? (prize.stock / prize.totalCount) * 100 : 0 })); });
        },
        // 获取今日剩余抽奖次数
        getRemainingSpins: function () {
            return Math.max(0, this.maxDailySpins - this.todaySpinCount);
        },
    },
});
