<template>
  <div>
    <component :is="$route.meta.layoutComponent">
      <RouterView></RouterView>
    </component>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="css">
.slide-enter-active,
.slide-leave-active {
  transform: translateX(100vw);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
