<template>
  <div class="px-8">
    <header>
      <div class="d-flex justify-space-between align-center">
        <app-text size="lg">
          <strong class="text-capitalize">
            {{ currentMonth }}
          </strong>
          , {{ currentYear }}
        </app-text>

        <div class="d-flex gap-5">
          <app-button
            border-color="gray-200"
            is-fab
            outlined
            width="40"
            height="40"
            @click="handlePreviousMonth"
          >
            <ph-caret-left :color="primary" />
          </app-button>

          <app-button
            border-color="gray-200"
            is-fab
            outlined
            width="40"
            height="40"
            @click="handleNextMonth"
          >
            <ph-caret-right :color="primary" />
          </app-button>
        </div>
      </div>
    </header>

    <div class="separator-bottom my-8"></div>

    <div class="d-flex align-center gap-30">
      <div class="d-flex align-center gap-10">
        <app-button
          background="primary"
          width="10"
          height="10"
          rounded
          aria-label="ball button"
          class="pa-0"
        ></app-button>

        <app-text as="span" color="text">Dia atual</app-text>
      </div>

      <div class="d-flex align-center gap-10">
        <app-button
          background="orange-300"
          width="10"
          height="10"
          rounded
          aria-label="ball button"
          class="pa-0"
        ></app-button>

        <app-text as="span" color="text">Tarefas / lembretes</app-text>
      </div>
    </div>

    <div class="calendar">
      <header class="calendar__header">
        <div v-for="(weekday, index) in shortWeekDays" :key="'weekday' + index">{{ weekday }}</div>
      </header>
      <div class="calendar__body" aria-label="calendar body">
        <app-button
          v-for="(day, index) in calendarDateMemo.data"
          :key="'day' + index"
          class="calendar__day-button"
          :border-color="isEqual(currentDate, day.date) ? 'primary' : 'gray-200'"
          is-fab
          outlined
          width="50"
          height="50"
          :disabled="day.disabled"
          @click="() => changeSelectedDate(day.date)"
        >
          <app-text as="span" color="text">{{ format(day.date, 'd') }}</app-text>

          <app-button
            v-if="day.isCurrentDay"
            background="primary"
            width="10"
            height="10"
            rounded
            aria-label="ball button"
            class="pa-0 calendar__button-ball"
          ></app-button>
          <app-button
            v-else-if="hasRemindersInDay(day.date)"
            background="orange-300"
            width="10"
            height="10"
            rounded
            aria-label="ball button "
            class="pa-0 calendar__button-ball"
          ></app-button>
        </app-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  format,
  subMonths,
  addMonths,
  getDaysInMonth,
  setDate,
  startOfMonth,
  subDays,
  addDays,
  endOfMonth,
  isToday,
  isEqual,
  getMonth,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { PhCaretRight, PhCaretLeft } from '@phosphor-icons/vue'
import { useTheme } from 'vuetify'
import { getWeekDays } from '@/utils/date'

const theme = useTheme()

const { primary } = theme.current.value.colors

interface IReminder {
  [key: string]: {
    title: string
  }
}
interface IProps {
  modelValue: Date
  reminders: IReminder
}
const props = defineProps<IProps>()

type EmitsTypes = {
  'update:modelValue': [value: Date]
}
const emit = defineEmits<EmitsTypes>()

const shortWeekDays = getWeekDays({ short: true })

const currentDate = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

interface IDateInfoObject {
  date: Date
  disabled: boolean
  isCurrentDay: boolean
  hasReminders: boolean
}

const calendarDateMemo = ref<{ month: string | number; data: IDateInfoObject[] | [] }>({
  month: '',
  data: [],
})

function getCalendarDays() {
  const daysInCurrentMonth = Array.from({ length: getDaysInMonth(currentDate.value) }).map(
    (_, i) => {
      return setDate(currentDate.value, i + 1)
    }
  )

  const firstDayOfMonthWeekDay = startOfMonth(currentDate.value)
  const lastDayOfMonthWeekDay = endOfMonth(currentDate.value)

  const previousMonthFillArray = Array.from({ length: firstDayOfMonthWeekDay.getDay() })
    .map((_, i) => {
      return subDays(firstDayOfMonthWeekDay, i + 1)
    })
    .reverse()

  const DAYS_IN_WEEK = 7

  const nextMonthFillArray = Array.from({
    length: DAYS_IN_WEEK - (lastDayOfMonthWeekDay.getDay() + 1),
  }).map((_, i) => {
    return addDays(lastDayOfMonthWeekDay, i + 1)
  })

  calendarDateMemo.value.month = Number(getMonth(currentDate.value))
  calendarDateMemo.value.data = [
    ...formatDateArraySetOptions(previousMonthFillArray, true),
    ...formatDateArraySetOptions(daysInCurrentMonth, false),
    ...formatDateArraySetOptions(nextMonthFillArray, true),
  ]
}

const currentMonth = computed(() => {
  if (currentDate.value) {
    return format(currentDate.value, 'LLLL', { locale: ptBR })
  }
})

const currentYear = computed(() => {
  if (currentDate.value) {
    return format(currentDate.value, 'yyyy', { locale: ptBR })
  }
})

function formatDateArraySetOptions(date: Date[], isDisabled: boolean): IDateInfoObject[] {
  return date.map((date) => {
    const formattedDate = format(date, 'yyyy-MM-dd')

    const hasReminderInItemDay = formattedDate in props.reminders
    return {
      date,
      disabled: isDisabled,
      isCurrentDay: isToday(date),
      hasReminders: hasReminderInItemDay,
    }
  })
}

function hasRemindersInDay(date: Date) {
  const formattedDate = format(date, 'yyyy-MM-dd')

  const hasReminderInItemDay = formattedDate in props.reminders

  return hasReminderInItemDay
}
function handlePreviousMonth() {
  currentDate.value = subMonths(currentDate.value, 1)
}
function handleNextMonth() {
  currentDate.value = addMonths(currentDate.value, 1)
}

function changeSelectedDate(date: Date) {
  currentDate.value = new Date(date.getTime())
}

watchEffect(() => {
  console.log('entrou')
  if (getMonth(currentDate.value) !== calendarDateMemo.value.month) {
    getCalendarDays()
  }
})
</script>

<style scoped lang="scss">
.calendar {
  margin-top: 1.5rem;

  &__header,
  &__body {
    display: grid;
    grid-template-columns: repeat(7, 3.125rem);
    justify-content: space-between;
  }

  &__header > * {
    text-transform: capitalize;
    text-align: center;
    font-weight: 600;

    color: rgb(var(--v-theme-primary));
  }

  &__body {
    margin-top: 2.5rem;
  }

  &__day-button {
    position: relative;
  }

  &__button-ball {
    position: absolute;
    top: -2px;
    left: -2px;
  }

  &__body > * {
    display: flex;
    justify-content: center;

    margin-bottom: 1.5rem;

    aspect-ratio: 1/1;
  }
}
</style>
