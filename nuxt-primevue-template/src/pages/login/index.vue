<template>
  <div class="d-flex align-center">
    login
    <button @click="decrement">decrement</button>
    <span class="mx-5">{{ count }}</span>
    <button @click="increment">add</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountStore } from '@/stores/countStore'

definePageMeta({
  layout: 'auth-view-layout',
})

const store = useCountStore()

const { increment, decrement } = store
const { count } = storeToRefs(store)
</script>

<style scoped></style>
