<template>
	<router-view v-slot="{ Component }">
		<transition mode="out-in" name="slide-right">
			<component :is="Component" />
		</transition>
	</router-view>
</template>
<style lang="scss" scoped>
/* 页面切换动画
------------------------------- */
.slide-right-enter-active,
.slide-right-leave-active {
	will-change: transform;
	transition: all 0.3s ease;
}
// slide-right
.slide-right-enter-from {
	opacity: 0;
	transform: translateX(-20px);
}
.slide-right-leave-to {
	opacity: 0;
	transform: translateX(20px);
}
</style>
