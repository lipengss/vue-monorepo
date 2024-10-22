// 引入组件
import 'virtual:svg-icons-register';
// @ts-ignore
import SvgIcon from "../component/SvgIcon/SvgIcon.vue";

const plugins = {
    elSvg:(app:any) => {
        app.component('SvgIcon', SvgIcon);
    }
}

export default plugins;