import { Chart as ChartJS, registerables, ChartData, ChartOptions } from 'chart.js'

export default defineNuxtPlugin(() => {
  ChartJS.register(...registerables)
})
