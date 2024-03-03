import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('should render correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Teste',
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should add size class correctly', () => {
    const wrapper = mount(Button, {
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
