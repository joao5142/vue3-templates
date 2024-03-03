<template>
  <div v-if="isLoading" class="loading" role="dialog">
    <img :src="LoadingGif" alt="Loading" />
  </div>
</template>

<script setup lang="ts">
import LoadingGif from '@/assets/loading.gif'
import { useLoadingStore } from '@/store/loadingStore'
import { storeToRefs } from 'pinia'

const store = useLoadingStore()

const { isLoading } = storeToRefs(store)
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  inset: 0;

  width: 100vw;
  height: 100vh;

  border-radius: 0px;
  z-index: 100000000;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.7);

  img {
    width: 70px;
  }
}
</style>
