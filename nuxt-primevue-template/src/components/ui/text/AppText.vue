<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(textVariants({ weight, size }), props.class)">
    <slot></slot>
  </Primitive>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type TextVariants, textVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  size?: TextVariants['size']
  weight?: TextVariants['weight']
  as?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'span',
  weight: '400',
})
</script>
