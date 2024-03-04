<template>
  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      expand-on-hover
      rail
      :rail-width="80"
      style="background: #ffffff; color: rgb(63, 63, 63)"
      :width="320"
      app
      class="nav"
      @mouseenter="() => handleUpdateRail(true)"
      @mouseleave="() => handleUpdateRail(false)"
    >
      sidebar
    </v-navigation-drawer>

    <v-app-bar class="elevation-0" :height="90">header</v-app-bar>

    <v-main class="w-100 background">
      <container class="my-9">
        <slot></slot>
      </container>
    </v-main>

    <app-loading></app-loading>
  </v-layout>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import Container from '@/components/layout/default/Container.vue'

const { lgAndUp } = useDisplay()
const isNavigationExpanded = ref<boolean>(false)

const drawer = ref(lgAndUp.value)

function handleUpdateRail(value: any) {
  isNavigationExpanded.value = value
}
</script>

<style scoped lang="scss">
.background,
.v-main {
  background: rgb(var(--v-theme-background)) !important;
  min-height: 100vh !important;
}

.nav {
  background: rgb(var(--v-theme-sidebar)) !important;
}
</style>
