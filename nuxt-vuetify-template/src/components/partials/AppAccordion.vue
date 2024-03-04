<template>
  <div class="accordion">
    <div
      v-for="(item, index) in reactiveItems"
      :key="'accordion-item' + index"
      class="accordion__item"
    >
      <div
        class="d-flex align-center justify-space-between"
        @click="item.isOpen = !Boolean(item.isOpen)"
      >
        <app-text as="span" color="text-700" weight="medium">{{ item.title }}</app-text>
        <ph-caret-up v-if="item.isOpen" size="24" :color="gray500" />
        <ph-caret-down v-else size="24" :color="gray500" />
      </div>
      <div v-if="item.isOpen" class="mt-5">
        <app-text as="p" color="text-500">{{ item.text }}</app-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'
import { useTheme } from 'vuetify'

interface IItems {
  text: string
  title: string
  isOpen?: boolean
}
interface IProps {
  items: IItems[]
}
const props = defineProps<IProps>()

const reactiveItems = ref<IItems[]>(props.items)

const theme = useTheme()

const { 'gray-500': gray500 } = theme.current.value.colors
</script>

<style scoped lang="scss">
@use '@/styles/_variables' as variables;

.accordion {
  display: grid;
  gap: 0.6rem;

  &__item {
    border-radius: variables.$defaultBorderRadiusComponents;
    padding: 0.9375rem 1.25rem;

    border: 1px solid rgb(var(--v-theme-gray-100));
    background: rgb(var(--v-theme-card));

    cursor: pointer;

    transition: all 1s;
  }
}
</style>
