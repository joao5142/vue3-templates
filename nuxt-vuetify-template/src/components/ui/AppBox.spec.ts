import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppBox from '@/components/ui/AppBox.vue'

describe('AppBox', () => {
  it('should render correctly', () => {
    const wrapper = mount(AppBox, {
      slots: {
        default: 'Texto',
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should be able to see slot on screen', () => {
    const wrapper = mount(AppBox, {
      slots: {
        default: 'Texto',
      },
    })
    expect(wrapper.html()).toContain('Texto')
  })
})
