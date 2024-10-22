import { expect, describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import SvgIcon from './index.vue'

describe('SvgIcon', () => {
	test('挂载组件', () => {
		expect(SvgIcon).toBeTruthy()
		const wapper = mount(SvgIcon, {
			props: {
				name: 'add',
			},
		})
	})
})
