import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCountStore = defineStore('count', () => {
  const count = ref<number>(0)

  function increment() {
    count.value++
  }
  function decrement() {
    count.value--
  }
  return { increment, decrement, count }
})
