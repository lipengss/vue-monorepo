<template>
	<van-nav-bar :border="false" title="存储量" />
	<div class="container">
		<div class="Liquid">
			<LiquidFill :data="parseFloat(rate)" />
		</div>
		<van-progress :percentage="parseFloat(rate)" stroke-width="8" :show-pivot="false" />
		<div class="memory-info">{{ used }}/{{ filesize(memory) }}</div>
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useBillStore } from '@/stores/bill';
import { getBytes, numeral, filesize } from '@common/utils';
import LiquidFill from '@common/component/src/component/LiquidFill/index.vue';
const { billList } = storeToRefs(useBillStore());

// 总内存大小
const memory = 5 * 1024 * 1024;

// 将已使用的和未使用的转为百分比
const rate = computed(() => numeral(getBytes(billList)).divide(memory).multiply(100).format('0.00'));

const used = computed(() => filesize(getBytes(billList)));
</script>
<style scoped lang="scss">
.container {
	padding: 0 10px 10px;
	.Liquid {
		height: 240px;
	}
	.memory-info {
		font-size: 12px;
		padding-top: 6px;
		color: var(--van-text-color-2);
	}
}
</style>
