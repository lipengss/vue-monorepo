<template>
	<div class="wrapper" :class="toDay.weather" v-if="toDay">
		<div class="flex-between location">
			<div class="flex-center">
				<el-icon><Location /></el-icon> <span class="city-name">{{ toDay.city }}</span>
			</div>
			<el-tooltip content="更新天气" placement="top" effect="light">
				<el-icon @click="getCurrentWeather"><Refresh /></el-icon>
			</el-tooltip>
		</div>
		<div class="weather flex-between">
			<div class="temper">{{ toDay.temperature }}°</div>
			<div class="weather-info">
				<div>{{ toDay.weather }}</div>
				<div>{{ toDay.winddirection }}风 {{ toDay.windpower }}级</div>
			</div>
		</div>
		<div class="forecasts" v-if="state.forecasts.length">
			<div class="info" v-for="item in state.forecasts[0].casts">
				<span>{{ _formatWeek(item.date) }}</span>
				<span class="date">{{ format(item.date, 'M月D日') }}</span>
				<el-icon v-if="item.dayweather === '晴' && night" :size="20" :title="item.dayweather">
					<svg-icon name="月亮" />
				</el-icon>
				<el-icon v-else-if="item.dayweather === '晴' && !night" :size="20" :title="item.dayweather">
					<svg-icon name="晴" />
				</el-icon>
				<el-icon v-else :size="20" :title="item.dayweather">
					<svg-icon :name="item.dayweather" />
				</el-icon>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import qs from 'qs';
import { ElMessage } from 'element-plus';
import { Location, Refresh } from '@element-plus/icons-vue';
import { useDateFormat } from '~/hooks/useDateFormat';

const { isToday, isTomorrow, format, dayjs, formatWeek } = useDateFormat();

const now = dayjs();

const night = computed(() => now.hour() >= 18 && now.hour() > 6);

const state: IWeatherState = reactive({
	forecasts: [],
	payload: {
		key: 'ff03de30ff1c0ad671a12699414250e7',
		city: '',
	},
	lives: [],
});

async function initCity() {
	console.log('wai cao')
	try{
		console.log('cao')
		const { data }:any = await useFetch('https://restapi.amap.com/v3/ip', { query: { key: state.payload.key }}, { server: false})
		console.log('data data', data);
		const { adcode } = data.value;
		state.payload.city = adcode;
		await getCurrentWeather();
		await getAllWeather();
	} catch(err) {
		console.log('err', err)
	}
}


initCity()
async function getCurrentWeather() {
	try {
		const { data }: any = await useFetch('https://restapi.amap.com/v3/weather/weatherInfo', { query: state.payload });
		const { lives, status, info }: any = data.value;
		if (status === '0') return ElMessage.error(info);
		state.lives = lives;
	} catch (err) {
		console.log(err);
	}
}

async function getAllWeather() {
	try {
		const { data }: any = await useFetch('https://restapi.amap.com/v3/weather/weatherInfo', { query: { ...state.payload, extensions: 'all' } });
		const { forecasts, status, info } = data.value;
		if (status === '0') return ElMessage.error(info);
		state.forecasts = forecasts;
	} catch (err) {
		console.log(err);
	}
}

function _formatWeek(date: Date) {
	if (isToday(date)) {
		return '今天';
	} else if (isTomorrow(date)) {
		return '明天';
	} else {
		return formatWeek(date);
	}
}

const toDay = computed(() => (state.lives && state.lives.length ? state.lives[0] : undefined));
</script>
<style lang="scss" scoped>
.wrapper {
	width: 100%;
	height: 100%;
	padding: 8px 10px 10px 10px;
	box-sizing: border-box;
	color: #fff;
	background: linear-gradient(45deg, #237fca 58%, rgba(233, 241, 246, 0.91) 100%);
	.location {
		.city-name {
			font-size: 14px;
			margin-left: 4px;
		}
	}
	.weather {
		.temper {
			font-size: 40px;
			font-weight: bold;
		}
		.weather-info {
			text-align: right;
			line-height: 20px;
			font-size: 13px;
		}
	}
	.forecasts {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		.info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			line-height: 18px;
			.date {
				font-size: 10px;
			}
		}
	}
}
.霾 {
	background-image: linear-gradient(45deg, #8d8882 20%, #bbb7af);
}
.晴 {
	background: linear-gradient(45deg, #237fca 58%, rgba(233, 241, 246, 0.91) 100%);
}
.扬沙 {
	background-image: url('~/assets/img/yangsha.png');
	background-repeat: repeat-x;
	background-size: 100% auto;
	background-position: center;
}
.阴,
.多云 {
	background: linear-gradient(61deg, rgba(67, 112, 159, 1) 29%, rgba(205, 205, 205, 1) 100%);
}
</style>
