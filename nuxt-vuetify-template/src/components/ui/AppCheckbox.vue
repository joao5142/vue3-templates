<template>
  <div class="checkbox" :class="{ 'checkbox--disabled': disabled }">
    <div class="d-flex align-center">
      <div v-if="!disabled" class="d-flex align-center" @click="handleSetIsSelected">
        <img v-if="!isSelected" :src="CheckboxImage" alt="checkbox" />
        <img v-else :src="CheckboxFillImage" alt="checkbox" />
      </div>
      <div v-else class="d-flex align-center">
        <img v-if="!isSelected" :src="CheckboxDisabledImage" alt="checkbox" />
        <img v-else :src="CheckboxFillDisabledImage" alt="checkbox" />
      </div>
    </div>
    <div class="checkbox__label">
      <slot name="label"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import CheckboxImage from '@/assets/icons/components/checkbox.png'
import CheckboxFillImage from '@/assets/icons/components/checkbox-fill.png'
import CheckboxDisabledImage from '@/assets/icons/components/checkbox-disabled.png'
import CheckboxFillDisabledImage from '@/assets/icons/components/checkbox-fill-disabled.png'

interface IProps {
  modelValue: boolean
  disabled?: boolean
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isSelected = computed({
  get() {
    return props.modelValue
  },
  set(value: boolean) {
    emit('update:modelValue', value)
  },
})

const theme = useTheme()

const { primary } = theme.current.value.colors

function handleSetIsSelected() {
  isSelected.value = !isSelected.value
}

console.log(isSelected)
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:not(.checkbox--disabled) {
    cursor: pointer;
  }

  &--disabled {
    &,
    & * {
      pointer-events: none;
      cursor: not-allowed;
    }
  }
}
</style>
