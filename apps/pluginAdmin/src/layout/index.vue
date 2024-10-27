<template>
	<div class="layout">
		<sider />
		<div class="section">
			<header-bar />
			<div class="main">
				<LayoutRouterView />
			</div>
			<footer class="footer">
				<a href="https://lukelili.github.io/plugins.github.io/#/home">https://lukelili.github.io/plugins.github.io/#/home</a>
			</footer>
		</div>
	</div>
</template>
<script setup lang="ts">
import LayoutRouterView from './routerView.vue'
import sider from './sider/index.vue'
import headerBar from './header-bar/header-bar.vue'
</script>
<style lang="scss" scoped>
.layout {
	width: 100vw;
	height: 100vh;
	box-sizing: border-box;
	display: flex;
	.section {
		flex: 1;
		display: flex;
		flex-direction: column;
		.main {
			flex: 1;
			width: 100%;
			padding: 10px;
			box-sizing: border-box;
			overflow: hidden;
		}
	}
	.footer {
		height: 30px;
		line-height: 30px;
		padding: 0;
		text-align: center;
		font-size: 12px;
		border-top: 1px solid #dcdfe6;
		a {
			color: #ccc !important;
		}
	}
}
</style>
