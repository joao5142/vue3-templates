<template>
  <div class="avatar" :class="`${widthClass} ${heightClass} ${computedNoDetailClass}`">
    <app-text
      v-if="mode === 'text'"
      data-test="app-avatar-text"
      class="d-flex justify-center align-center"
      size="xl"
      color="gray-800"
      weight="semibold"
      as="span"
    >
      {{ text }}
    </app-text>

    <v-img
      v-else
      data-test="app-avatar-image"
      class="avatar__img"
      width="100%"
      height="100%"
      cover
      :src="src"
    ></v-img>
    <div v-if="isOnline" data-test="app-avatar-online" class="avatar--online"></div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  text?: string
  isOnline?: boolean
  width?: string | number
  height?: string | number
  mode?: 'text' | 'image'
  src?: string
  noDetail?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  size: 'lg',
  isOnline: false,
  mode: 'text',
  noDetail: false,
})

const widthClass = computed(() => {
  if (props.width !== undefined) {
    return 'avatar--width'
  }
})

const heightClass = computed(() => {
  if (props.height !== undefined) {
    return 'avatar--height'
  }
})

const computedWidthUnit = computed(() => {
  return `${props.width}px`
})

const computedNoDetailClass = computed(() => {
  if (props.noDetail !== undefined && props.noDetail) {
    return 'avatar--no-detail'
  }
})

const computedHeightUnit = computed(() => {
  return `${props.height}px`
})
</script>

<style scoped lang="scss">
.avatar {
  height: 3.5rem;
  width: 3.5rem;

  background: rgb(var(--v-theme-gray-300));

  border-radius: 100px;
  border: 3px solid #f7f9fd;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &__img {
    border-radius: inherit;
  }

  &--online {
    position: absolute;

    right: -5%;
    bottom: -2%;

    width: 1rem;
    height: 1rem;

    background: rgb(var(--v-theme-green-300));

    border-radius: 50%;
    border: 2px solid white;
  }

  &--width {
    width: v-bind(computedWidthUnit);
    min-width: v-bind(computedWidthUnit);
  }
  &--height {
    height: v-bind(computedHeightUnit);
    min-height: v-bind(computedHeightUnit);
  }

  &--no-detail {
    border: none;
  }
}
</style>
