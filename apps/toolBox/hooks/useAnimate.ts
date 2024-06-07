import { nextTick } from 'vue';

/**
 * 使用动画效果
 * @param clas 元素选择器
 * @param animation 动画名称
 */

export function useAnimate(clas: string, animation: string | string[]) {
	// 参数验证
	if (!clas || !animation) {
		throw new Error('clas or animation is null');
	}

	/**
	 * 鼠标悬停动画函数
	 * @param type 动画类型，可选值为'in'（进入动画）或'out'（退出动画）
	 * @param index 当前元素的索引
	 */
	function hoverAnimate(type: 'in' | 'out', index?: number) {
		const currentElement = typeof index === undefined ? document.querySelector(clas) : document.querySelectorAll(clas)[index];
		if (currentElement) {
			if (type === 'in' && !currentElement.classList.contains('animate__animated')) {
				addOrRemoveClass(true);
			} else {
				addOrRemoveClass(false);
			}
			function addOrRemoveClass(addClass: boolean) {
				nextTick(() => {
					if (addClass) {
						currentElement?.classList.add('animate__animated', Array.isArray(animation) ? animation[0] : animation);
					} else {
						currentElement?.classList.remove('animate__animated', Array.isArray(animation) ? animation[1] : animation);
					}
				});
			}
		}
	}
	return {
		hoverAnimate,
	};
}
