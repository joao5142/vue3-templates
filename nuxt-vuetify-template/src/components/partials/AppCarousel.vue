<template>
  <div class="carousel" :style="{ height: height }">
    <img loading="lazy" :src="currentImage" alt="Carousel Images" />

    <div class="carousel__btn carousel__btn--prev" @click="handlePrevSlide">
      <ph-caret-left size="30" weight="thin" color="white" />
    </div>
    <div class="carousel__btn carousel__btn--next" @click="handleNextSlide">
      <ph-caret-right size="30" weight="thin" color="white" />
    </div>

    <div class="carousel__dots">
      <div
        v-for="(dot, index) in images.length"
        :key="'dot' + index"
        :class="{ 'carousel__dot--active': index === currentIndex }"
        class="carousel__dot"
        @click="goToIndexSlide(index)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue'

interface IProps {
  images: string[]
  height: string
}

const props = withDefaults(defineProps<IProps>(), { height: '500px' })

const currentIndex = ref<number>(0)
const currentImage = ref(props.images[0])

let interval: string | number | NodeJS.Timeout | undefined

function changeCurrentImage() {
  currentImage.value = props.images[currentIndex.value]
}
function handleNextSlide() {
  clearSlideInterval()
  if (currentIndex.value >= props.images.length - 1) {
    currentIndex.value = 0
  } else {
    currentIndex.value++
  }

  changeCurrentImage()
  initSlideInterval()
}
function handlePrevSlide() {
  clearSlideInterval()
  if (currentIndex.value <= 0) {
    currentIndex.value = props.images.length - 1
  } else {
    currentIndex.value--
  }
  changeCurrentImage()
  initSlideInterval()
}

function nextSlideWithoutClearInterval() {
  if (currentIndex.value >= props.images.length - 1) {
    currentIndex.value = 0
  } else {
    currentIndex.value++
  }
  changeCurrentImage()
}
function goToIndexSlide(index: number) {
  clearSlideInterval()
  currentIndex.value = index
  changeCurrentImage()

  initSlideInterval()
}
function initSlideInterval() {
  interval = setInterval(() => {
    nextSlideWithoutClearInterval()
  }, 5000)
}
function clearSlideInterval() {
  clearInterval(interval)
}

onMounted(() => {
  if (process.client) {
    initSlideInterval()
  }
})

onUnmounted(() => {
  clearSlideInterval()
})
</script>

<style scoped lang="scss">
@use '@/styles/_variables' as variables;

.carousel {
  position: relative;

  border-radius: variables.$defaultBorderRadiusComponents;

  width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;

    transition: all 0.5s ease;
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    cursor: pointer;

    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.36);

    background: rgba(255, 255, 255, 0.24);
    width: 2.5rem;
    height: 2.5rem;

    &--prev {
      left: 50px;
    }

    &--next {
      right: 50px;
    }
  }

  &__dots {
    display: flex;
    align-items: center;
    gap: 0.3rem;

    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%);
  }

  &__dot {
    width: 0.9375rem;
    height: 0.3125rem;

    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.48);

    cursor: pointer;

    &--active {
      width: 4.6875rem;
      background: #fff;
    }
  }
}
</style>
