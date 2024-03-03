<template>
  <v-layout class="d-flex flex-column">
    <v-app-bar elevation="0" class="header">
      <v-container><header>header</header></v-container>
    </v-app-bar>

    <v-main class="mt-15">
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>

    <loading-component />
  </v-layout>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  padding-block: 0.6rem;

  border-bottom: 1px solid rgb(var(--v-theme-gray-200));
}
</style>
