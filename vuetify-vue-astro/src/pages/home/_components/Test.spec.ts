import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Test from './Test.vue'

describe('Test Page', () => {
  it('should render correctly', () => {
    const wrapper = mount(Test)

    expect(wrapper.vm).toBeTruthy()
  })
})
