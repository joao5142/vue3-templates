<template>
  <div>
    <bar-chart :data="data" :options="{ ...defaultOptions, ...options }" />
  </div>
</template>

<script setup lang="ts">
import { Bar as BarChart } from 'vue-chartjs'

import { Chart as ChartJS, registerables, ChartData, ChartOptions } from 'chart.js'
import { chartOptions } from '@/utils/chart/index'

const defaultOptions = {
  ...(chartOptions as ChartOptions<'bar'>),
  borderRadius: 40,
}

interface IBarChart {
  data?: ChartData<'bar'>
  options?: ChartOptions<'bar'>
}

withDefaults(defineProps<IBarChart>(), {
  data: () => {
    return {
      labels: [],
      datasets: [],
    }
  },
  options: () => {
    return {}
  },
})
</script>

<style scoped></style>
