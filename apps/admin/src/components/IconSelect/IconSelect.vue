<template>
	<el-select v-model="defValue" filterable placeholder="请选择图标" @change="onSelect">
		<template v-if="defValue" #prefix>
			<el-icon>
				<component :is="defValue" />
			</el-icon>
		</template>
		<div class="select-temp">
			<el-option value=""> 无 </el-option>
			<el-option v-for="[key, component] of Object.entries(ElementPlusIconsVue)" :key="key" :value="key">
				<el-icon>
					<component :is="key" />
				</el-icon>
			</el-option>
		</div>
	</el-select>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { ElSelect, ElOption, ElIcon } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

interface PROPS {
	value: string
}
const props = withDefaults(defineProps<PROPS>(), {
	value: '',
})

const emits = defineEmits(['update:value'])

const defValue = ref(props.value)

function onSelect() {
	emits('update:value', defValue.value)
}
</script>
<style lang="scss">
.select-temp {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	text-align: center;
	.el-select-dropdown__item {
		padding: 0;
	}
}
</style>
