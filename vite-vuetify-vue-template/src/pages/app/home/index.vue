<template>
  <div class="d-flex align-center">
    <v-btn @click="decrement">decrement</v-btn>
    <span class="mx-5">{{ count }}</span>
    <v-btn @click="increment">add</v-btn>
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
