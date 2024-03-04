import { ChartOptions } from 'chart.js'

export const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    subtitle: {
      font: {
        family: 'Montserrat',
        weight: 500,
        size: 14,
      },
      color: '#718096',
    },
    legend: {
      position: 'bottom',
      align: 'start',
      fullSize: true,

      labels: {
        boxHeight: 6,
        useBorderRadius: true,
        borderRadius: 3,
        font: {
          family: 'Montserrat',
          size: 14,
        },
      },
      title: {
        font: {
          family: 'Montserrat',
          size: 14,
        },
      },
    },
  },
  aspectRatio: 1 / 1,
  color: '#718096',
  font: {
    family: 'Montserrat',
    size: 14,
  },
}
