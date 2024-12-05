import { defineComponent, onMounted, ref } from 'vue'
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
export default defineComponent({
	name: '轨迹动画',
	setup() {
		const flag = ref(false)
		const tm = gsap.timeline({ defaults: { duration: 1 } })
		function onHandleMenu() {
			flag.value = !flag.value
			if (flag.value) {
				tm.to('.btn-wrap', {
					width: 'auto',
					ease: 'power1.out',
				}).to(
					['.red-btn', '.blue-btn'],
					{
						x: 60,
						alpha: 1,
						rotate: 360,
					},
					'-=1'
				)
				return
			} else {
				tm.to('.btn-wrap', {
					width: '50px',
				}).to(
					['.red-btn', '.blue-btn'],
					{
						x: 0,
						alpha: 0,
						rotate: 0,
					},
					'-=1'
				)
			}

			// tm.to(['.btn3', '.btn2'], {
			// 	x: 0,
			// 	alpha: 0,
			// 	duration: 1,
			// 	rotate: 0,
			// })
			// tm.to('.btn2', {
			// 	delay: 1,
			// })
			// tm.to('.btn-wrap', {
			// 	width: 'auto',
			// 	duration: 1,
			// 	ease: 'power1.in',
			// })
		}
		onMounted(() => {
			tm.set('.btn-wrap', {
				width: '50px',
			})
			gsap.set('.red-btn', {
				alpha: 0,
			})
			gsap.set('.blue-btn', {
				x: -60,
				alpha: 0,
			})
			gsap.set('.gray-btn', {
				x: -120,
			})
		})

		const btnStyle = (color: string) => ({
			width: '50px',
			height: '50px',
			borderRadius: '50%',
			cursor: 'pointer',
			backgroundColor: color,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: '#fff',
		})
		const btnWrap = {
			padding: '10px',
			display: 'inline-grid',
			'border-radius': '50px',
			'grid-template-columns': 'repeat(3,1fr)',
			'grid-gap': '10px',
			'background-color': '#eee',
		}

		return () => (
			<div class="btn-wrap" style={btnWrap}>
				<div class="red-btn" style={btnStyle('red')}>
					红色
				</div>
				<div class="blue-btn" style={btnStyle('blue')}>
					蓝色
				</div>
				<div class="gray-btn" style={btnStyle('#ccc')} onClick={onHandleMenu}>
					按钮
				</div>
			</div>
		)
	},
})
