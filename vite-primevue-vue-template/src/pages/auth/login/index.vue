<template>
  <div>
    <DataTable :value="products" :table-style="{ minWidth: '50rem' }">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const products = [{ code: '123', name: 'joao', category: 'DEV', quantity: 1234 }]
</script>
