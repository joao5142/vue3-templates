import { type VariantProps, cva } from 'class-variance-authority'

export { default as AppText } from './AppText.vue'

export const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
    },

    weight: {
      '400': 'font-normal',
      '500': 'font-medium',
      '600': 'font-semibold',
      '700': 'font-bold',
      '800': 'font-extrabold',
      '900': 'font-black',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: '400',
  },
})

export type TextVariants = VariantProps<typeof textVariants>
