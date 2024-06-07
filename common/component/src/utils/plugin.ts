// 引入组件
import 'virtual:svg-icons-register';
// @ts-ignore
import SvgIcon from "../component/SvgIcon/SvgIcon.vue";


import { createPinia } from 'pinia';

function elSvg(app) {
    app.component('SvgIcon', SvgIcon);
}



const plugins = {
    elSvg:(app) => {
        elSvg(app)
    },
    pinia: (app) => {
        app.use(createPinia());
    }
}

export default plugins;