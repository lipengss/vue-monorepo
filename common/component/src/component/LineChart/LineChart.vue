<template>
  <v-chart class="chart" :option="option" autoresize />
</template>
<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import VChart, { THEME_KEY } from 'vue-echarts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { withDefaults, defineProps, provide } from 'vue';

interface Props {
  option: any;
}
const props = withDefaults(defineProps<Props>(), {});

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent]);

provide(THEME_KEY, 'light');
</script>
