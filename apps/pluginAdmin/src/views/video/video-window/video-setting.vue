<template>
	<div v-if="optionForm" class="mobile" :style="{ backgroundImage: `url(${background_base64})` }">
		<div class="content" :class="{ [optionForm.cover.show_style]: optionForm.show === 'cover' }">
			<div class="bit-title">{{ optionForm.title.text }}</div>
			<div class="singer">歌手：{{ optionForm.singer }}</div>
			<div v-if="optionForm.vice_title.show" class="vice_title">
				<span>{{ optionForm.vice_title.text }}</span>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { inject, computed } from 'vue'
import { IOptions } from '@/types/IVideo'

const optionForm: IOptions | undefined = inject('optionForm')

const blurs = computed(() => optionForm && optionForm.cover.blur + 'px')
const titleSize = computed(() => optionForm && optionForm.title.size + 'px')
const background_base64 = computed(() => optionForm && optionForm.cover.background_path)
</script>
<style lang="scss" scoped>
.mobile {
	width: 375px;
	height: 667px;
	margin: 0 auto;
	background-color: #ccc;
	color: #fff;
	padding: 20px;
	text-align: center;
	background-position: center;
	background-size: cover;
	position: relative;
	&::before {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		backdrop-filter: blur(v-bind(blurs));
	}
	.content {
		width: 100%;
		box-sizing: border-box;
		position: relative;
		.bit-title {
			font-size: v-bind(titleSize);
			font-weight: bold;
			letter-spacing: 2px;
			text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
		}
		.singer {
			font-size: 18px;
			font-weight: bold;
		}
	}
	.style1 {
		min-height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		border: 3px solid #fff;
		margin-top: 50%;
		padding-bottom: 10px;
		background-color: rgba(0, 0, 0, 0.5);
		.vice_title {
			font-size: 14px;
			span {
				padding: 0 2px 4px 2px;
				border-bottom: 1px solid #fff;
			}
		}
	}
}
</style>
