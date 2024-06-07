<template>
	<div class="container" @contextmenu.prevent="contextmenu">
		<Engines />
		<Swiper
			class="swiper-parent"
			:modules="[SwiperMousewheel]"
			loop
			direction="vertical"
			:mousewheel="true"
			:initialSlide="setting.menuBar.appSlideIndex"
			@swiper="(instance) => (swiper = instance)"
			@slideChange="({ realIndex }) => (setting.menuBar.appSlideIndex = realIndex)"
		>
			<template v-for="(route, index) in swiperSlideData" :key="route.path">
				<SwiperSlide v-if="route.children" style="overflow: hidden">
					<div class="tags" v-if="index === 0">
						<el-tag
							v-for="tag in allTagList"
							:key="tag.value"
							:type="activeTag === tag.value ? 'success' : 'info'"
							effect="light"
							round
							@click="activeTag = tag.value"
							>{{ tag.label }}</el-tag
						>
					</div>
					<Swiper
						:modules="[SwiperFreeMode, SwiperMousewheel]"
						direction="vertical"
						slidesPerView="auto"
						:nested="true"
						:freeMode="true"
						:mousewheel="true"
					>
						<SwiperSlide class="swiper-slide-child">
							<template v-for="app in route.children">
								<GridItem v-if="app.type === 'card'" size="5x2" :name="app.name">
									<component :is="card[app.component]" />
								</GridItem>
								<GridItem v-else size="1x1" :name="app.name">
									<Application :app="app" />
								</GridItem>
							</template>
							<AddedApp v-if="isDeveloper" />
						</SwiperSlide>
					</Swiper>
				</SwiperSlide>
			</template>
		</Swiper>
	</div>
	<!-- 菜单 -->
	<MenuBar :list="appTypeList" />
	<!-- 右键菜单 -->
	<Contextmenu ref="contextmenuRef">
		<template v-if="global">
			<div class="item" @click="changeWallpaper">
				<el-icon><svg-icon name="menu-picture" /></el-icon>
				<span>换壁纸</span>
			</div>
			<div class="item" @click="showDrawer = true">
				<el-icon><svg-icon name="setting" /></el-icon>
				<span>设置</span>
			</div>
		</template>
		<template v-else>
			<div class="item">
				<el-icon><Edit /></el-icon>
				<span>编辑</span>
			</div>
			<div class="item">
				<el-icon><svg-icon name="batchEdit" /></el-icon>
				<span>批量编辑</span>
			</div>
			<div class="item" @click="onDeleteApp">
				<el-icon><Delete /></el-icon>
				<span>删除</span>
			</div>
      <div class="item" @click="onLikeApp">
        <el-icon><svg-icon name="like" /></el-icon>
        <span>收藏</span>
      </div>
		</template>
	</Contextmenu>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '~/stores/settings';
import { Delete, Edit } from '@element-plus/icons-vue';
import { developers, filterHoutWebSiteList } from '~/assets/website/index';
import { tagList, appTypeList } from '~/assets/utils/publicData';
import mitt from '~/assets/utils/mitt';
const settingStore = useSettingsStore();
const { setting, showDrawer, activeTag } = storeToRefs(useSettingsStore());
const { initGlobalSetting, changeWallpaper, setGlobalSetting } = settingStore;

let swiper: any = null;

const global = ref();
const contextmenuRef = ref();
const curApp = ref<RouteItem>({
	name: '',
	path: '',
	type: '',
	meta: {
		rank: 0,
		icon: '',
		layout: '',
	},
});

const allTagList = computed(() => {
	return [{ label: '全部', value: 'all' }, ...tagList];
});

const screenWidth = computed(() => setting.value.app.screenWidth + setting.value.app.unit);
const appSize = computed(() => setting.value.app.size + 'px');
const columnGap = computed(() => {
	const { async, gap, columnGap } = setting.value.app;
	return (async ? gap : columnGap) + 'px';
});
const rowGap = computed(() => {
	const { async, gap, rowGap } = setting.value.app;
	return (async ? gap : rowGap) + 'px';
});
const swiperSlideData = computed(() => {
  return appTypeList.map((route) => {
		route.children = filterHoutWebSiteList(route.type);
		return route;
	});
});
const isDeveloper = computed(() => process.env.NODE_ENV === 'development');

const card: any = {
	Weather: resolveComponent('Weather'),
	Calendar: resolveComponent('Calendar'),
	OffWork: resolveComponent('OffWork'),
};
function contextmenu(event: any) {
	global.value = true;
	contextmenuRef.value.contextmenu(event);
}
function onDeleteApp() {
	const { name } = curApp.value;
	const names = setting.value.excludeWeb.map((item) => item.name);
	if (!names.includes(name)) {
		const index = developers.findIndex((item) => item.name === name);
		if (index !== -1) {
			developers.splice(index, 1);
		}
		setting.value.excludeWeb.push(curApp.value);
	}
	setGlobalSetting();
}

function onLikeApp() {
  const { name } = curApp.value;
  const names = setting.value.collectionWeb.map((item) => item.name);
  if (!names.includes(name)) {
    // const index = developers.findIndex((item) => item.name === name);
    // if (index !== -1) {
    //   developers.splice(index, 1);
    // }
    setting.value.excludeWeb.push(curApp.value);
    ElMessage.success('已收藏了');
  } else {
    ElMessage.warning('已收藏了');
    return
  }
  setGlobalSetting();
}

// 根据标签过滤
watch(
	() => activeTag.value,
	(tag) => {
		const index = setting.value.menuBar.appSlideIndex;
		const list = filterHoutWebSiteList(appTypeLisrt[index].type);
		swiperSlideData.value[index].children = tag === 'all' ? list : list.filter((item) => item.meta.tag && item.meta.tag.includes(tag));
	}
);

mitt.on('contextmenuApp', ({ event, name }) => {
	global.value = !name;
	if (!global.value) {
		const app = filterHoutWebSiteList('/').find((item) => item.name === name);
		app && (curApp.value = app);
	}
	contextmenuRef.value.contextmenu(event);
});

mitt.on('onMenuChange', (index: number) => {
	if (!swiper.destroyed) {
		swiper.slideToLoop(index, 500);
	}
});

onMounted(() => {
	initGlobalSetting();
	swiper.slideToLoop(setting.value.menuBar.appSlideIndex);
});
</script>
<style lang="scss" scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	.tags {
		width: v-bind(screenWidth);
		position: relative;
		margin: auto;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.el-tag {
			cursor: pointer;
			margin-bottom: 10px;
			&:not(:last-child) {
				margin-right: 10px;
			}
		}
	}
	.swiper-parent {
		flex: 1;
		height: 100%;
	}
}
.swiper {
	width: 100%;
	height: 100%;
}

.swiper-slide-child {
	width: v-bind(screenWidth);
	height: auto;
	box-sizing: border-box;
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(auto-fill, v-bind(appSize));
	grid-template-rows: repeat(auto-fill, v-bind(appSize));
	grid-row: auto;
	grid-auto-flow: dense;
	column-gap: v-bind(columnGap);
	row-gap: v-bind(rowGap);
	margin: 0 auto;
	padding-bottom: 50px;
}
</style>
