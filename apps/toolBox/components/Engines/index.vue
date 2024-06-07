<template>
	<ClientOnly>
		<el-row class="engines-wrap">
			<el-col :xs="22" :sm="12" :md="10" :lg="8" :xl="7" class="content">
				<div class="date-wrapper" v-if="setting.date.show">
					<div class="time">{{ state.time }}</div>
					<div class="date">{{ state.date }} {{ currentWeek }}</div>
				</div>
				<template v-if="setting.search.show">
					<el-popover placement="bottom" :width="560" :visible="state.show" :hide-after="0">
						<template #reference>
							<el-input
								v-model="state.query"
								size="large"
								placeholder="本地应用搜索"
								class="my-search"
								clearable
								@focus="state.show = true"
								@blur="state.show = false"
							>
								<template #prefix>
									<el-icon :size="30">
										<svg-icon name="icon-local" />
									</el-icon>
								</template>
							</el-input>
						</template>
						<el-scrollbar>
							<GirdLayout style="width: 100%; grid-gap: 30px">
								<GridItem v-for="app in list" :key="app.name" size="1x1" :name="app.name" color="#333">
									<Application :app="app" />
								</GridItem>
							</GirdLayout>
						</el-scrollbar>
					</el-popover>
				</template>
			</el-col>
		</el-row>
	</ClientOnly>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useDateFormat } from '~/hooks/useDateFormat';
import { useSettingsStore } from '~/stores/settings';
import { developers, sortWebRanks } from '~/assets/website/index';

const { setting } = storeToRefs(useSettingsStore());
const { format, formatWeek } = useDateFormat();

const inputHeight = computed(() => `${setting.value.search.height}px`);
const inputRadius = computed(() => `${setting.value.search.radius}px`);
const inputOpacity = computed(() => `rgba(0, 0, 0, ${setting.value.search.opacity})`);
const dateColor = computed(() => setting.value.date.color);
const dateFont = computed(() => setting.value.date.font);
const dateSize = computed(() => `${setting.value.date.size}px`);

const state = reactive({
	query: '',
	date: format(new Date(), 'YYYY年MM月DD日'),
	time: '',
	show: false,
});

const hotRankList = computed(() =>
	sortWebRanks(developers)
		.filter((item: RouteItem) => item.type !== 'card')
		.slice(0, 20)
);

let timer: any = null;

const currentWeek = computed(() => formatWeek());

const list = computed(() => {
	if (state.query === '') return hotRankList.value;
	return developers.filter((item) => {
		if (item.name.includes(state.query) || item.meta.description?.includes(state.query)) {
			return item;
		} else {
		}
	});
});

onMounted(() => {
	state.time = format(new Date(), 'HH:mm:ss');
	timer = setInterval(() => {
		state.time = format(new Date(), 'HH:mm:ss');
	}, 1000);
});
</script>
<style lang="scss" scoped>
.engines-wrap {
	display: flex;
	box-sizing: border-box;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding-top: 10vh;
	margin-bottom: 20px;
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		z-index: 100;
		.date-wrapper {
			min-width: 140px;
			margin-bottom: 20px;
			text-align: center;
			color: v-bind(dateColor);
			text-shadow: 1px 1px 1px #000;
			.time {
				font-family: v-bind(dateFont);
				font-size: v-bind(dateSize);
			}
			.date {
				font-size: 12px;
				font-weight: bold;
			}
		}
		.serach-engines {
			width: 100%;
			margin-bottom: 4px;
			.engines-item {
				font-size: 14px;
				font-weight: bold;
				text-shadow: 1px 1px 1px #000;
				padding: 6px 4px;
			}
			.el-link--info {
				color: var(--el-color-white);
			}
		}
	}
	.engines {
		width: 100%;
		display: flex;
		justify-content: space-around;
		padding-top: 6px;
		padding-bottom: 6px;
	}
}
:deep .my-search,
:deep .el-autocomplete {
	width: 100%;
	.el-input__wrapper {
		height: v-bind(inputHeight);
		border-radius: v-bind(inputRadius);
		background-color: v-bind(inputOpacity);
		backdrop-filter: blur(10px);
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2) inset;
		font-size: 18px;
		.el-input__inner {
			letter-spacing: 1px;
			color: #fff;
		}
	}
	.el-input__clear {
		font-size: 20px;
	}
}
</style>
