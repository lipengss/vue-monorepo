enum IShowType {
	cover = 'cover',
	mobile = 'mobile',
}

enum IStyle {
	style1 = 'style1',
}

interface IOptions {
	show: IShowType
	title: {
		text: string
		size: number
	}
	singer: string
	vice_title: {
		text: string
		show: boolean
	}
	cover: {
		show_style: IStyle
		background_path: string
		blur: number
		rotate: number
	}
}
export { IShowType, IStyle }
export type { IOptions }
