<template>
	<splitpanes class="split-panes">
		<pane v-bind="side">
			<div class="sider">
				<el-form layout="vertical" label-position="top">
					<el-form-item>
						<template #label>默认占比（size）</template>
						<el-input-number v-model="side.size" :min="10" :max="50" addon-after="%" />
					</el-form-item>
					<el-form-item>
						<template #label>最小占比（min-size）</template>
						<el-input-number v-model="side.size" :min="1" :max="100" addon-after="%" />
					</el-form-item>
					<el-form-item>
						<template #label>最大占比（max-size）</template>
						<el-input-number v-model="side.size" :min="1" :max="100" addon-after="%" />
					</el-form-item>
				</el-form>
			</div>
		</pane>
		<pane>
			<div class="main">
				<codemirror :code="side" />
			</div>
		</pane>
	</splitpanes>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import codemirror from 'components/codemirror/index.vue'
import { ElInputNumber, ElForm, ElFormItem } from 'element-plus'

const side = reactive({
	size: 14,
	'min-size': 14,
	'max-size': 50,
})
</script>
<style class="less" scoped>
.split-panes {
	height: 100%;
}
.split-wrap {
	height: 100%;
}
.sider,
.main {
	width: 100%;
	height: inherit;
	padding: 10px;
	background-color: pink;
}
.main {
	background-color: bisque;
	box-sizing: border-box;
}
</style>
