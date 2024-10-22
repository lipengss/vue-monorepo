<template>
	<el-sub-menu v-if="route.children && route.children.length" :index="route.path">
		<template #title>
			<el-icon>
				<svg-icon v-if="route.meta.icon" :name="route.meta.icon" />
			</el-icon>
			<span>{{ route.meta.title }}</span>
		</template>
		<template v-for="sub in route.children">
			<menu-item :route="sub" />
		</template>
	</el-sub-menu>
	<el-menu-item v-else :index="route.path">
		<el-icon>
			<svg-icon v-if="route.meta.icon" :name="route.meta.icon" />
		</el-icon>
		<template #title>
			<span>{{ route.meta.title }}</span>
		</template>
	</el-menu-item>
</template>
<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { ElMenuItem, ElIcon, ElSubMenu } from 'element-plus'

interface Props {
	route: any
}
withDefaults(defineProps<Props>(), {})
</script>
