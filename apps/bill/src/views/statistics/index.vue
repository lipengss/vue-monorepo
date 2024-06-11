<template>
	<div class="info">
		<div class="flex-bl-bt">
			<DateTag v-model:value="day" show-format="YYYY年MM月" :columnsType="['year', 'month']" />
			<CheckBoxTag :options="formatMap(EXPENSES)" v-model:value="expenses" />
		</div>
		<div class="text">
			<div class="title">{{ expenses === 'income' ? '共收入' : '共支出' }}</div>
			<div class="num">￥{{ formatNum(total) }}</div>
		</div>
	</div>
	<div class="container mb10">
		<div class="big-title">支出构成</div>
		<PieChart :option="option" />
	</div>
	<div class="container mb10">
		<van-cell
			v-for="item in option.series.data"
			:value="'￥' + formatNum(item.value)"
			is-link
			center
			:to="{
				path: '/purposeTotal',
				query: {
					title: item.name,
					key: item.key,
					total: item.value,
					date: day,
					expenses: expenses,
				},
			}"
		>
			<template #icon>
				<div class="icon-purpose" :style="{ '--color': themeColor }">
					<svg-icon :name="_PURPOSE.get(item.key)?.icon || ''" />
				</div>
			</template>
			<template #title>
				{{ item.name }}
				<van-progress :percentage="item.per" :show-pivot="false" :color="themeColor" />
			</template>
		</van-cell>
	</div>
	<div class="container">
		<div class="big-title">每日对比</div>
		<BarChart :option="dayRatioOption" />
	</div>
</template>
<script lang="ts">
export default {
	name: 'statistics',
};
</script>
<script setup lang="ts">
import { ref, computed, watch, onActivated } from 'vue';
import { EXPENSES, formatMap, _PURPOSE } from '@/assets/data';
import { storeToRefs } from 'pinia';
import { useBillStore } from '@/stores/bill';
import { sortBy, dayjs, formatNum, convertToPercentages } from '@common/utils'
import CheckBoxTag from '@/components/CheckBoxTag/index.vue';
import PieChart from '@common/component/src/component/PieChart/index.vue';
import BarChart from '@common/component/src/component/BarChart/index.vue';
import DateTag from '@/components/DateTag/index.vue';

const { billList } = storeToRefs(useBillStore());

const expenses = ref('income');
const day = ref(dayjs().format('YYYY-MM'));

const option = ref({
	grid: {
		top: 10,
	},
	series: {
		type: 'pie',
		radius: ['34%', '60%'],
		center: ['50%', '50%'],
		data: [],
		silent: true,
		padAngle: 2,
		itemStyle: {
			borderRadius: 2,
		},
		label: {
			formatter: '{b} {per|{d}%}',
			minMargin: 5,
			edgeDistance: 10,
			lineHeight: 15,
			rich: {
				per: {
					color: '#999',
				},
			},
		},
		emphasis: {
			itemStyle: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)',
			},
		},
	},
});
const dayRatioOption = ref({
	tooltip: {},
	grid: {
		containLabel: true,
		left: 10,
		top: 10,
	},
	yAxis: {
		type: 'value',
		splitLine: {
			lineStyle: {
				color: '#eee',
			},
		},
		axisLabel: {
			color: '#969799',
			formatter: '￥{value}',
		},
	},
	xAxis: {
		type: 'category',
		data: [],
		axisTick: {
			show: false,
		},
		axisLine: {
			lineStyle: {
				color: '#ccc',
			},
		},
		axisLabel: {
			color: '#969799',
		},
	},
	series: {
		type: 'bar',
		data: [],
		barMaxWidth: 20,
		itemStyle: {
			borderRadius: 2,
		},
		label: {
			formatter: '{b} {per|{d}%}',
			minMargin: 5,
			edgeDistance: 10,
			lineHeight: 15,
			rich: {
				per: {
					color: '#999',
				},
			},
		},
		emphasis: {
			itemStyle: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)',
			},
		},
	},
});

// 过滤日期相同的数据 并返回所有账单记录
const allOrderList = computed(() =>
	billList.value.filter((n) => dayjs(day.value).isSame(n.date, 'month')).filter((n) => n.expenses === expenses.value)
);

const themeColor = computed(() => EXPENSES.get(expenses.value)?.color);

const total = computed(() =>
	allOrderList.value.reduce((pre, cur) => {
		return pre + parseFloat(cur.price);
	}, 0)
);

function setPieData() {
	const data: { [key: string]: number } = {};
	// 将不同类型的账单分别累加
	allOrderList.value.forEach((n) => {
		if (data[n.purpose]) {
			data[n.purpose] = data[n.purpose] + parseFloat(n.price);
		} else {
			data[n.purpose] = parseFloat(n.price);
		}
	});
	// 将累加后的金额 以最大的为基数 转化成百分比
	const perList = convertToPercentages(allOrderList.value.map((n) => parseFloat(n.price)));
	const dataList = Object.keys(data).map((n, index) => {
		return {
			value: data[n],
			name: _PURPOSE.get(n)?.label,
			key: n,
			per: perList[index],
		};
	});
	// 设置饼图的数据
	option.value.series.data = sortBy(dataList, 'per').reverse();
	setBarData();
}

function setBarData() {
	const data: { [key: string]: number } = {};
	// 将不同类型的账单分别累加
	allOrderList.value.forEach((n) => {
		const day = dayjs(n.date).format('YYYY-MM-DD');
		if (data[day]) {
			data[day] = data[day] + parseFloat(n.price);
		} else {
			data[day] = parseFloat(n.price);
		}
	});
	dayRatioOption.value.xAxis.data = Object.keys(data).map((n) => dayjs(n).format('M.DD'));
	dayRatioOption.value.series.data = Object.values(data);
}

watch(() => expenses.value, setPieData, {
	immediate: true,
});

watch(() => day.value, setPieData);
onActivated(() => {
	setPieData();
});
</script>
<style lang="scss" scoped>
.info {
	padding: 10px;
	background-color: v-bind(themeColor);
	.text {
		color: var(--van-white);
		.title {
			line-height: 30px;
			padding-left: 8px;
		}
		.num {
			font-size: 40px;
		}
	}
}
:deep .van-cell__title {
	flex: 4;
	display: flex;
	align-items: center;
	.van-progress {
		flex: 1;
		margin-left: 10px;
	}
}
:deep .van-cell__value {
	flex-basis: auto;
}
.van-nav-bar {
	background-color: v-bind(themeColor);
	:deep .van-nav-bar__title {
		color: var(--van-white);
	}
}
.big-title {
	line-height: 40px;
	padding: 10px 20px;
}
.chart {
	height: 240px;
}
</style>
