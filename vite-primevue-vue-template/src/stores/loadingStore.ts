import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref<boolean>(false)

  function setIsLoading(value: boolean) {
    isLoading.value = value
  }

  return { isLoading, setIsLoading }
})
