<template>
  <div>
    <line-chart :data="data" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { Line as LineChart } from 'vue-chartjs'

import { Chart as ChartJS, registerables, ChartData, ChartOptions } from 'chart.js'
import { chartOptions } from '@/utils/chart/index'

const options = {
  ...(chartOptions as ChartOptions<'line'>),
  fill: false,
  borderWidth: 2.2,
}

interface ILineChart {
  data?: ChartData<'line'>
}

withDefaults(defineProps<ILineChart>(), {
  data: () => {
    return {
      labels: [],
      datasets: [],
    }
  },
})
</script>

<style scoped></style>
