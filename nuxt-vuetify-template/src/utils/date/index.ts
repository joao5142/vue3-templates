export const months = {
  janeiro: 'Janeiro',
  fevereiro: 'Fevereiro',
  marco: 'Março',
  abril: 'Abril',
  maio: 'Maio',
  junho: 'Junho',
  julho: 'Julho',
  agosto: 'Agosto',
  setembro: 'Setembro',
  outubro: 'Outubro',
  novembro: 'Novembro',
  dezembro: 'Dezembro',
}
export const numericValuesMonths = {
  janeiro: 1,
  fevereiro: 2,
  marco: 3,
  abril: 4,
  maio: 5,
  junho: 6,
  julho: 7,
  agosto: 8,
  setembro: 9,
  outubro: 10,
  novembro: 11,
  dezembro: 12,
}

interface IGetWeekDays {
  short?: boolean
}

export function getWeekDays({ short = false }: IGetWeekDays = {}) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2023, 7, day))))
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3)
      }

      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })
}
