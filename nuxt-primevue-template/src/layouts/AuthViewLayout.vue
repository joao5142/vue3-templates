<template>
  <main>
    auth
    <slot></slot>

    <AppLoading></AppLoading>
  </main>
</template>

<script setup>
import AppLoading from '@/components/ui/loading/AppLoading.vue'
</script>

<style scoped></style>
