<template>
  <div class="d-flex align-center">
    login
    <v-btn @click="decrement">decrement</v-btn>
    <span class="mx-5">{{ count }}</span>
    <v-btn @click="increment">add</v-btn>
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
