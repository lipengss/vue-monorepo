<template>
  <ClientOnly>
    <el-drawer v-model="showDrawer" title="风 格 配 置" size="450px">
      <el-form :model="setting" ref="formRef" label-width="80px">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item name="theme">
            <template #title>
              <div class="collapse-title">
                <el-icon :size="20"><svg-icon name="menu-picture" /> </el-icon>
                <span>主题/壁纸</span>
              </div>
            </template>
            <el-form-item label="深色模式">
              <el-switch :model-value="isDark" @change="toggleDark()" />
            </el-form-item>
            <el-form-item label="网站主题" prop="theme">
              <color-picker v-model:color="setting.theme" colorFormat="hex" :color-list="predefineColors" @change="changeThemeColor" />
            </el-form-item>
            <el-form-item label="遮罩透明">
              <div class="slider-wrap">
                <el-slider v-model="setting.bg.opacity" :min="0" :max="1" :step="0.1" @change="setGlobalSetting" />
                <el-tag type="primary">{{ setting.bg.opacity }}</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="背景模糊">
              <div class="slider-wrap">
                <el-slider v-model="setting.bg.blur" :min="0" :max="60" :step="1" @change="setGlobalSetting" />
                <el-tag type="primary">{{ setting.bg.blur }} PX</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="背景切换">
              <el-space>
                <el-switch v-model="setting.bg.auto" @change="setGlobalSetting" />
                <el-select style="width: 100px" placeholder="时间间隔" v-if="setting.bg.auto" v-model="setting.bg.autoTime" @change="setGlobalSetting">
                  <el-option v-for="item in timeStepList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-space>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item name="menu">
            <template #title>
              <div class="collapse-title">
                <el-icon :size="20"><svg-icon name="aside" /> </el-icon>
                <span>菜单栏</span>
              </div>
            </template>
            <el-form-item label="默认菜单">
              <el-select v-model="setting.menuBar.appSlideIndex" @change="setGlobalSetting">
                <el-option v-for="(route, index) in appTypeList" :key="route.path" :value="index" :label="route.name" />
              </el-select>
            </el-form-item>
            <el-form-item label="自动隐藏">
              <el-switch v-model="setting.menuBar.autoHide" @change="setGlobalSetting" />
            </el-form-item>
            <el-form-item label="菜单宽度">
              <div class="slider-wrap">
                <el-slider v-model="setting.menuBar.width" :min="60" :max="400" />
                <el-tag type="primary">{{ setting.menuBar.width }} PX</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="背景颜色">
              <color-picker v-model:color="setting.menuBar.bgColor" show-alpha @change="changeThemeColor" />
            </el-form-item>
            <el-form-item label="字体颜色">
              <color-picker v-model:color="setting.menuBar.color" show-alpha @change="changeThemeColor" />
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item name="app">
            <template #title>
              <div class="collapse-title">
                <el-icon :size="20"><svg-icon name="app" /> </el-icon>
                <span>图标布局</span>
              </div>
            </template>
            <el-form-item label="图标名称">
              <div class="slider-wrap">
                <el-switch v-model="setting.app.showTitle" @change="setGlobalSetting" />
              </div>
            </el-form-item>
            <el-form-item label="图标大小">
              <div class="slider-wrap">
                <el-slider v-model="setting.app.size" :min="60" :max="100" :step="1" @change="setGlobalSetting" />
                <el-tag type="primary">{{ setting.app.size }}PX</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="图标圆角">
              <div class="slider-wrap">
                <el-slider v-model="setting.app.radius" :min="0" :max="50" :step="1" @change="setGlobalSetting" />
                <el-tag type="primary">{{ setting.app.radius }}PX</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="不透明度">
              <div class="slider-wrap">
                <el-slider v-model="setting.app.opacity" :min="0" :max="1" :step="0.01" @change="setGlobalSetting" />
                <el-tag type="primary">{{ setting.app.opacity }}%</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="间距同步">
              <el-switch v-model="setting.app.async" @change="setGlobalSetting" />
            </el-form-item>
            <template v-if="setting.app.async">
              <el-form-item label="图标间距">
                <div class="slider-wrap">
                  <el-slider v-model="setting.app.gap" :min="20" :max="60" :step="1" @change="setGlobalSetting" />
                  <el-tag type="primary">{{ setting.app.gap }}PX</el-tag>
                </div>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="X间距">
                <div class="slider-wrap">
                  <el-slider v-model="setting.app.columnGap" :min="20" :max="60" :step="1" @change="setGlobalSetting" />
                  <el-tag type="primary">{{ setting.app.columnGap }}PX</el-tag>
                </div>
              </el-form-item>
              <el-form-item label="Y间距">
                <div class="slider-wrap">
                  <el-slider v-model="setting.app.rowGap" :min="20" :max="60" :step="1" @change="setGlobalSetting" />
                  <el-tag type="primary">{{ setting.app.rowGap }}PX</el-tag>
                </div>
              </el-form-item>
            </template>
            <el-form-item label="宽度单位">
              <el-switch v-model="setting.app.unit" active-value="PX" ctive-text="PX" inactive-value="%" inactive-text="%" @change="setGlobalSetting" />
            </el-form-item>
            <el-form-item label="最大宽度">
              <div class="slider-wrap">
                <el-slider v-model="setting.app.sceenWidth" :min="40" :max="100" :step="1" @change="setGlobalSetting" />
                <el-tag type="primary">{{ setting.app.sceenWidth }}{{ setting.app.unit }}</el-tag>
              </div>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item name="date">
            <template #title>
              <div class="collapse-title">
                <el-icon :size="20"><svg-icon name="date" /> </el-icon>
                <span>时间</span>
              </div>
            </template>
            <el-form-item label="字体大小">
              <div class="slider-wrap">
                <el-slider v-model="setting.date.size" :min="20" :max="100" @change="setGlobalSetting" />
                <el-tag type="primary">{{ setting.date.size }} PX</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="字体风格">
              <el-select v-model="setting.date.font" @change="setGlobalSetting">
                <el-option v-for="font in fontList" :value="font">
                  <div class="flex-between">
                    <span :style="{ 'font-family': font, 'font-size': '18px' }">19:00</span>
                    <span>{{ font === 'rocks-serif' ? '默认' : font }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字体颜色">
              <div class="slider-wrap">
                <color-picker v-model:color="setting.date.color" show-alpha @change="setGlobalSetting" />
              </div>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item name="search">
            <template #title>
              <div class="collapse-title">
                <el-icon :size="20"><Search /> </el-icon>
                <span>搜索框</span>
              </div>
            </template>
            <el-form-item label="搜索显示">
              <el-switch v-model="setting.search.show" @change="setGlobalSetting" />
            </el-form-item>
            <el-form-item label="搜索高度">
              <div class="slider-wrap">
                <el-slider v-model="setting.search.height" :min="40" :max="60" @change="setGlobalSetting" />
                <el-tag type="primary">{{ setting.search.height }} PX</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="搜索圆角">
              <div class="slider-wrap">
                <el-slider v-model="setting.search.radius" :min="0" :max="60" @change="setGlobalSetting" />
                <el-tag type="primary">{{ setting.search.radius }} PX</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="搜索透明">
              <div class="slider-wrap">
                <el-slider v-model="setting.search.opacity" :min="0" :max="1" :step="0.1" @change="setGlobalSetting" />
                <el-tag type="primary">{{ setting.search.opacity }} PX</el-tag>
              </div>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <el-space direction="vertical" fill class="w100">
        <el-button type="primary" size="large" class="w100" :icon="CopyDocument">一键复制配置</el-button>
        <el-button type="info" size="large" class="w100" :icon="RefreshRight" @click="clearGlobalSetting()">一键恢复默认</el-button>
      </el-space>
    </el-drawer>
  </ClientOnly>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '~/stores/settings';
import {predefineColors, timeStepList, fontList, appTypeList} from '~/assets/utils/publicData';
import { CopyDocument, RefreshRight, Search } from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core';

const { setting, showDrawer, engineList } = storeToRefs(useSettingsStore());
const { setGlobalSetting, clearGlobalSetting, onColorPickerChange } = useSettingsStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const formRef = ref();

const activeName = ref('theme');

function changeThemeColor() {
	onColorPickerChange();
	setGlobalSetting();
}

</script>
<style lang="scss" scoped>
.slider-wrap {
	width: 100%;
	display: flex;
	align-items: center;
	.el-slider {
		flex: 1;
		margin-left: 10px;
		margin-right: 20px;
	}
}
.el-collapse {
	margin-bottom: 10px;
	.el-collapse-item {
		margin-bottom: 10px;
		background-color: var(--el-bg-color);
		.collapse-title {
			display: flex;
			align-items: center;
			padding-left: 10px;
			.el-icon {
				width: 30px;
				height: 30px;
				margin-right: 10px;
				border-radius: 6px;
				background-color: var(--el-text-color-regular);
				color: var(--el-color-white);
			}
		}
		.el-tag {
			min-width: 60px;
		}
		:deep .el-collapse-item__wrap {
			padding-right: 10px;
		}
	}
}
</style>
