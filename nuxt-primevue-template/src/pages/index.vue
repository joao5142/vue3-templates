<template>
  <div>
    login
    <div class="flex flex-col">
      <Button @click="decrement">decrement</Button>
      <AppText class="mx-5" size="xl" as="span" weight="700">{{ count }}</AppText>
      <Button @click="increment">add</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

import { storeToRefs } from 'pinia'
import { useCountStore } from '@/stores/countStore'
import AppText from '@/components/ui/text/AppText.vue'

definePageMeta({
  layout: 'default-view-layout',
})

const store = useCountStore()

const { increment, decrement } = store
const { count } = storeToRefs(store)
</script>

<style scoped></style>
