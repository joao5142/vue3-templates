<template>
  <div class="d-flex align-center">
    <button @click="decrement">decrement</button>
    <span class="mx-5">{{ count }}</span>
    <button @click="increment">add</button>
  </div>
</template>

<script setup lang="ts">
import { useCountStore } from '@/store/countStore'
import { storeToRefs } from 'pinia'

const store = useCountStore()

const { increment, decrement } = store
const { count } = storeToRefs(store)
</script>

<style scoped></style>
