import { Application, Point } from 'pixi.js'
import spinner4 from './spinner4'
const app = new Application()

export default async function init() {
	const container = document.getElementById('container')
	if (!container) return
	const { clientWidth, clientHeight } = container
	await app.init({
		width: clientWidth,
		height: clientHeight,
		resizeTo: window,
		antialias: true,
		backgroundColor: 0xe4e0e1,
	})
	container.appendChild(app.canvas)
	window.addEventListener('resize', app.resize)

	spinner4(app, new Point(50, 50))
}
