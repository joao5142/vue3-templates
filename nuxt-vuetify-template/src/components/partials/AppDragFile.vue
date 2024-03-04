<template>
  <label
    id="redacao-input-label"
    class="essay__input"
    :class="{ 'essay__input--dragged': isDragged || Boolean(value?.length) }"
    for="redacao"
    @dragenter="isDragged = true"
    @dragstart="isDragged = true"
    @dragleave="isDragged = false"
    @dragover="handleAllowDrop"
    @drop="handleDropEvent"
    @copy.prevent
  >
    <app-button
      background="secondary"
      size="lg"
      class="essay__input-event px-md-15"
      @click.passive="handleClickLabelChangePhoto"
    >
      <app-text as="strong" color="primary" weight="semibold">Selecione uma imagem</app-text>
      <ph-image class="ms-2" size="24" :color="primary" />
    </app-button>

    <app-text class="separator mt-5 essay__input-no-event" size="sm" as="span" color="text-400">
      Ou
    </app-text>

    <div class="d-flex align-center mt-5 essay__input-no-event">
      <app-text size="md" as="span" color="text" weight="medium">
        Arraste e solte o arquivo da sua redação aqui
      </app-text>
      <ph-arrows-out-simple class="ms-2" :color="gray500" size="25" />
    </div>

    <footer class="essay__input-footer d-flex align-center">
      <app-text as="span" color="text-500">
        JPEG, JPG, PNG E TIFF são os arquivos permitidos
      </app-text>
      <ph-link-simple class="ms-2" size="24" :color="gray500" />
    </footer>

    <v-file-input id="redacao" v-model="value" accept="image/*" class="d-none" />
  </label>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { PhImage, PhArrowsOutSimple, PhLinkSimple } from '@phosphor-icons/vue'

interface IProps {
  modelValue: File[]
}

const props = defineProps<IProps>()

const theme = useTheme()

const { 'gray-500': gray500, primary } = theme.current.value.colors

const isDragged = ref<boolean>(false)

const emit = defineEmits<{
  'update:modelValue': [value: File[]]
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

function handleDropEvent(event: DragEvent) {
  value.value = [event!.dataTransfer!.files[0]]

  event.preventDefault()
}

function handleAllowDrop(event: DragEvent) {
  event.preventDefault()
  // change your color here
}

function handleClickLabelChangePhoto() {
  const labelElement = document.querySelector('#redacao-input-label') as HTMLLabelElement
  if (labelElement) {
    labelElement.click()
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/_variables' as variables;

.essay {
  &__input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;

    padding: 1rem;

    height: 100%;

    background: rgb((var(--v-theme-card)));

    border: 3px dashed rgb(var(--v-theme-gray-200));

    border-radius: variables.$defaultBorderRadiusComponents;

    &-no-event {
      pointer-events: none;
    }
    &-event {
      pointer-events: all;
    }
    &-footer {
      position: absolute;

      bottom: 20px;
      margin: 0 auto;
      padding: 1rem;
    }

    &--dragged {
      border-color: rgb(var(--v-theme-primary));
    }
  }
}
</style>
