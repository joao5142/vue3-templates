import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Text } from '@/components/ui/text'

describe('Text', () => {
  it('should render correctly', () => {
    const wrapper = mount(Text, {
      slots: {
        default: 'Teste',
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should add size class correctly', () => {
    const wrapper = mount(Text, {
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
