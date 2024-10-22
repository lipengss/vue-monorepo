<template>
	<div class="menu-side">
		<div class="logo"></div>
		<el-menu :default-active="selectedKeys" router :collapse="settingStore.isCollapsed">
			<menu-item v-for="route in routes" :key="route.name" :route="route" />
		</el-menu>
	</div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSettingStore } from '@/store/setting'
import menuItem from './menuItem.vue'
import { ElMenu } from 'element-plus'

const route = useRoute()
const router = useRouter()
const settingStore = useSettingStore()

const routes = computed(() => router.options.routes.find((route) => route.name === 'Entry')?.children || [])

const selectedKeys = ref<string>('')

watch(
	route,
	(route) => {
		selectedKeys.value = route.path
	},
	{
		deep: true,
		immediate: true,
	}
)
</script>
<style lang="scss" scoped>
.menu-side {
	border-right: 1px solid #dcdfe6;
}
:deep .el-menu:not(.el-menu--collapse) {
	width: 240px;
}
:deep .el-menu {
	border-right: none;
}
</style>
