import { Meta, StoryObj } from '@storybook/vue3'
import { DefaultTheme } from '../../theme'

import TokensGrid from './TokensGrid.vue'

const meta = {
  title: 'Tokens/Fonts',
  component: TokensGrid,
} satisfies Meta<typeof TokensGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Sizes: Story = {
  args: { tokens: DefaultTheme.fontSizes, hasRemValue: true },
}

export const Weight: Story = {
  args: { tokens: DefaultTheme.fontWeights },
}
