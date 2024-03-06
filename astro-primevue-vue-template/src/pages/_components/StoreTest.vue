<template>
  <div>
    <AppText as="strong" class="block mb-5" size="xl" weight="700">Teste count store</AppText>
    <div class="flex items-center gap-5">
      <Button variant="secondary" @click="decrement">decrement</Button>
      <AppText as="strong" size="xl" weight="700">{{ count }}</AppText>
      <Button variant="secondary" @click="increment">add</Button>
    </div>

    <div class="mt-12">
      <DataTable :value="products" :table-style="{ minWidth: '50rem' }">
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import { AppText } from '@/components/ui/text'
import { useCountStore } from '@/stores/countStore'
import { storeToRefs } from 'pinia'

const products = [{ code: '123', name: 'joao', category: 'DEV', quantity: 1234 }]

const store = useCountStore()

const { increment, decrement } = store
const { count } = storeToRefs(store)
</script>

<style scoped></style>
