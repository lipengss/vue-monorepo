import { Application, Container, Point } from 'pixi.js'

export default function spinner4(app: Application, position: Point) {
	const container = new Container()
	container.position = position
	app.stage.addChild(container)
}
