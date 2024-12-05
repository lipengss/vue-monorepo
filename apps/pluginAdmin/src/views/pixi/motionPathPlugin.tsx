import { defineComponent, onMounted } from 'vue'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
export default defineComponent({
	name: '轨迹动画',
	setup() {
		function initGsap() {
			gsap.registerPlugin(MotionPathPlugin)
			gsap.to('#rect', {
				duration: 5,
				repeat: 12,
				repeatDelay: 3,
				yoyo: true,
				ease: 'power1.inOut',
				motionPath: {
					path: '#path',
					align: '#path',
					autoRotate: true,
					alignOrigin: [0.5, 0.5],
				},
			})
		}
		onMounted(() => {
			initGsap()
		})
		const style = {
			width: '100%',
			height: '100%',
			overflow: 'hidden',
		}
		return () => (
			<div style={style}>
				<svg xmlns="http://www.w3.org/2000/svg" id="svg" viewBox="0 0 80% 80%" fill="none" width={'100%'} height={'100%'}>
					<path
						id="path"
						stroke="rgba(128, 128, 128, 1)"
						stroke-width="4"
						d="M58 101.5C58 101.5 279.206 195.54 344.5 345.5C409.794 495.46 221.236 628.817 326.5 754C431.764 879.183 581.833 892.498 706 803C830.167 713.502 724.97 659.891 752 568C779.03 476.109 743.357 475.233 814.5 411C885.643 346.767 909.834 334.322 1045 345.5C1180.17 356.678 1222.55 430.158 1351.5 490.5C1480.45 550.842 1543.46 695.648 1674.5 640C1805.54 584.352 1719.73 501.705 1754 411C1788.27 320.295 1839.5 202 1839.5 202"
					></path>
					<g id="rect">
						<rect width="85" height="30" fill="dodgerblue" />
						<text x="10" y="19" font-size="14" fill="#fff">
							SVG &lt;rect&gt;
						</text>
					</g>
				</svg>
			</div>
		)
	},
})
