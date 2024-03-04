import { Meta, StoryObj } from '@storybook/vue3'

import ColorsGrid from './ColorsGrid.vue'

const meta = {
  title: 'Tokens/Colors',
  component: ColorsGrid,
} satisfies Meta<typeof ColorsGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  argTypes: {
    theme: {
      options: ['light', 'dark'],
      control: 'select',
      description: 'theme',
    },
  },
}
