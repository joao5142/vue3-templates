<template>
  <div>
    <Text as="strong" class="block" size="xl">Teste count store</Text>
    <Button variant="secondary" @click="decrement">decrement</Button>
    <span class="mx-5">{{ count }}</span>
    <Button variant="secondary" @click="increment">add</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useCountStore } from '@/stores/countStore'
import { storeToRefs } from 'pinia'

const store = useCountStore()

const { increment, decrement } = store
const { count } = storeToRefs(store)
</script>

<style scoped></style>
