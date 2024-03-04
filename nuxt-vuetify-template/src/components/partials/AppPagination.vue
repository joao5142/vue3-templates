<template>
  <app-box
    background="gray-100"
    class="px-4 py-2 d-flex flex-wrap justify-space-between align-center"
  >
    <app-text as="span" size="xs" weight="medium" color="text">
      {{ initOffsetCurrentPage }} - {{ lastOffsetCurrentPage }} de {{ lastPage }}
    </app-text>

    <div class="d-flex flex-wrap gap-10">
      <div class="d-flex align-center gap-20 me-0 me-md-13 flex-grow-1">
        <app-text as="span" size="xs" weight="medium" color="text">Itens por página</app-text>
        <app-button :outlined="true" border-color="gray-300" class="py-1">
          <app-text class="pagination-text" as="span" size="xs" weight="medium" color="text">
            {{ itemsPerPage }}
          </app-text>

          <div class="d-flex flex-column ms-3">
            <ph-caret-up :color="gray500" @click="handleIncrementItemsPerPageNum" />
            <ph-caret-down :color="gray500" @click="handleDecrementItemsPerPageNum" />
          </div>
        </app-button>
      </div>

      <div class="d-flex align-center gap-20">
        <app-button
          width="40"
          height="40"
          :is-fab="true"
          :outlined="true"
          border-color="gray-300"
          @click="$emit('getPrevPage')"
        >
          <ph-caret-left :color="gray500" />
        </app-button>
        <app-text>{{ currentPage }} de {{ lastPage }}</app-text>
        <app-button
          width="40"
          height="40"
          :is-fab="true"
          :outlined="true"
          border-color="gray-300"
          @click="$emit('getNextPage')"
        >
          <ph-caret-right :color="gray500" />
        </app-button>
      </div>
    </div>
  </app-box>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

import { PhCaretUp, PhCaretDown, PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'

interface IProps {
  currentPage: number
  lastPage: number
  initOffsetCurrentPage: number
  lastOffsetCurrentPage: number
}

withDefaults(defineProps<IProps>(), {
  currentPage: 0,
  lastPage: 0,
})

type EmitTypes = {
  getPrevPage: []
  getNextPage: []
  changeItemsPerPage: [value: number]
}
const emit = defineEmits<EmitTypes>()

const theme = useTheme()

const { 'gray-500': gray500 } = theme.current.value.colors

const itemsPerPage = ref<number>(5)

function handleIncrementItemsPerPageNum() {
  itemsPerPage.value += 5
  emit('changeItemsPerPage', itemsPerPage.value)
}
function handleDecrementItemsPerPageNum() {
  if (itemsPerPage.value >= 10) {
    itemsPerPage.value -= 5
    emit('changeItemsPerPage', itemsPerPage.value)
  }
}
</script>

<style scoped lang="scss">
.pagination-text {
  width: 20px;
}
</style>
