<template>
	<div class="">
		<div>
			<md-editor v-model:content="content" />
		</div>
		<el-card>
			{{ content }}
		</el-card>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElCard } from 'element-plus'
import mdEditor from 'components/mdEditor/index.vue'

const content = ref()
</script>
