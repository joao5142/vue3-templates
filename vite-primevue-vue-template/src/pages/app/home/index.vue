<template>
  <div>
    <h4 size="xl" weight="500" as="span" class="block">Teste pinia</h4>
    <div class="flex flex-col">
      <Button variant="secondary" @click="decrement">decrement</Button>
      <Text size="lg" weight="500" class="mx-5">{{ count }}</Text>
      <Button variant="secondary" @click="increment">add</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

import { useCountStore } from '@/stores/countStore'
import { storeToRefs } from 'pinia'
import Text from '@/components/ui/text/Text.vue'

const store = useCountStore()

const { increment, decrement } = store
const { count } = storeToRefs(store)
</script>

<style scoped></style>
