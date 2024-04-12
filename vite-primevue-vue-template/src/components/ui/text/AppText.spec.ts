import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AppText } from '@/components/ui/text'

describe('AppText', () => {
  it('should render correctly', () => {
    const wrapper = mount(AppText, {
      slots: {
        default: 'Teste',
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should add size class correctly', () => {
    const wrapper = mount(AppText, {
      slots: {
        default: 'Teste',
      },
      props: {
        size: 'lg',
      },
    })
    expect(wrapper.props().size).toBe('lg')
  })
})
