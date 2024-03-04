<template>
  <app-text as="strong" size="xl" :color="color" class="timer">
    {{ timer.hours }} : {{ timer.minutes }} : {{ timer.seconds }}
  </app-text>
</template>

<script setup lang="ts">
import { secondsToHours } from 'date-fns'
import { ColorTypes } from '@/plugins/vuetify'

type EmitTypes = {
  finish: []
  changeHour: [value: number]
}
const emit = defineEmits<EmitTypes>()

interface IProps {
  color: ColorTypes
  hours?: number
  isFinished: boolean
  mode: 'increment' | 'decrement'
}

const props = withDefaults(defineProps<IProps>(), {
  hours: 0,
  isFinished: false,
  color: 'subtitle',
  mode: 'increment',
})

let interval: string | number | NodeJS.Timeout | undefined

const amountSecondsPassed = ref<number>(props.hours * 60 * 60)

const timer = ref({
  hours: '00',
  minutes: '00',
  seconds: '00',
})

function setTime() {
  const secondsPassed = amountSecondsPassed.value

  if (secondsPassed) {
    const hoursAmount = secondsToHours(secondsPassed)

    emit('changeHour', Math.floor((secondsPassed / 3600) * 100) / 100)

    const minutesAmount = Math.floor(secondsPassed / 60 - hoursAmount * 60)

    const secondsAmount = Math.floor(secondsPassed % 60)

    const hours = String(hoursAmount).padStart(2, '0')
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    // console.log(hoursAmount, minutesAmount, secondsAmount)

    timer.value.hours = hours
    timer.value.minutes = minutes
    timer.value.seconds = seconds
  }
}

function initInterval() {
  if (!props.isFinished) {
    console.log('interval init')
    interval = setInterval(() => {
      if (amountSecondsPassed.value <= 1 && props.mode === 'decrement') {
        finishTimer()
      } else {
        if (props.mode === 'increment') {
          amountSecondsPassed.value += 1
        } else {
          amountSecondsPassed.value -= 1
        }

        setTime()
      }
      // console.log(amountSecondsPassed.value)
    }, 1000)
  }
}

function finishTimer() {
  clearInterval(interval)
  alert('acabou')
  emit('finish')
}

onMounted(() => {
  if (process.client) {
    initInterval()
  }
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped lang="scss">
.timer {
  width: 118px;
}
</style>
