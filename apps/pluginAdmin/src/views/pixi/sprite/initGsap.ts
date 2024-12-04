import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

let tween: any = null
let tl: any = null
export default function useGsap() {
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
	function onUpdate() {
		console.log('onUpdate')
	}
	function play() {
		tl.play()
	}

	function resume() {
		tl.resume()
	}
	function restart() {
		tl.restart()
	}

	function pause() {
		tl.pause()
	}

	return { initGsap, play, resume, restart, pause }
}
