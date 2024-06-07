import 'virtual:svg-icons-register';

import svgIcon from '~/components/SvgIcon/index.vue';
export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('svg-icon', svgIcon);
});
