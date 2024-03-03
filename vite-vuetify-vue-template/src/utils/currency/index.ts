const options = {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
}
export const formatCurrency = new Intl.NumberFormat('pt-BR', options)
