<template>
  <app-box class="pa-4 table-container">
    <table class="table">
      <thead>
        <slot name="head"></slot>
      </thead>

      <tbody>
        <slot name="body"></slot>
      </tbody>
    </table>

    <div>
      <slot name="footer"></slot>
    </div>
  </app-box>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/styles/_variables' as variables;

.table-container {
  overflow-x: auto;
}
.table {
  width: 100%;

  background-color: rgb(var(--v-theme-box));
  border-radius: variables.$defaultBorderRadiusComponents;
  border-collapse: collapse;

  :deep(th) {
    text-align: left;
    padding-inline: 1rem;
    padding-block: 0.8rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: rgb(var(--v-theme-text-500));
  }
  :deep(td) {
    padding-block: 1rem;
    padding-inline: 1rem;
    margin-block: 1rem;
    font-size: 0.875rem;
    border-block: 1px solid rgb(var(--v-theme-gray-200));
  }
}
</style>
