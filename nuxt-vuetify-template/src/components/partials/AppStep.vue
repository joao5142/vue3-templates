<template>
  <div class="stepper">
    <div v-for="(step, index) in steps" :key="index + 'step'" class="step">
      <div
        class="step__ball"
        :class="{ 'step__ball--fill': index <= computedCurrentStep }"
        :data-text="step.name"
      ></div>
      <div
        v-if="index != finalStep"
        :class="{ 'step__line--fill': index < computedCurrentStep }"
        class="step__line"
      ></div>
    </div>
  </div>

  <div v-for="(step, index) in steps" :key="'item' + index" class="mt-16">
    <div v-if="index == props.current - 1">
      <slot :name="'item.' + (index + 1)">></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  steps: Array<{ name: string }>
  current: number
}
const props = defineProps<IProps>()

const finalStep = props.steps.length - 1

const computedCurrentStep = computed(() => {
  if (props.current >= 1) {
    return props.current - 1
  }

  return 0
})

watch(computedCurrentStep, () => {
  console.log(computedCurrentStep.value)
})
</script>

<style scoped lang="scss">
.stepper {
  display: flex;
}

.step {
  display: flex;

  &:not(:last-of-type) {
    flex-grow: 1;
  }

  align-items: center;

  &__line {
    margin: 0 0.2rem;

    height: 2px;
    width: 100%;

    border-radius: 6.25rem;

    background-color: rgb(var(--v-theme-gray-200));

    &--fill {
      background-color: rgb(var(--v-theme-primary));
    }
  }

  &__ball {
    min-width: 1.25rem;
    min-height: 1.25rem;
    max-width: 1.25rem;
    max-height: 1.25rem;

    border: 4px solid rgb(var(--v-theme-gray-200));
    border-radius: 50%;
    position: relative;

    &--fill {
      border-color: rgb(var(--v-theme-primary));
    }
  }

  & .step__ball::before {
    content: attr(data-text);
    position: absolute;
    bottom: -40px;

    left: 50%;
    transform: translateX(-50%);

    width: max-content;

    display: block;

    text-wrap: wrap;
    word-break: break-all;
    white-space: pre;

    @media (max-width: 340px) {
      & {
        display: none;
      }
    }
  }

  &:first-of-type .step__ball::before {
    left: -5px !important;
    transform: translateX(0%);
  }

  &:last-of-type .step__ball::before {
    right: 0;
    transform: translateX(-94%);
  }

  &:last-of-type {
    width: max-content;
  }
}
</style>
