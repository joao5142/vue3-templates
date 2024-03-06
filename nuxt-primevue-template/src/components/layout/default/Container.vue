<template>
  <div class="container px-2">
    <slot></slot>
  </div>
</template>

<style lang="css" scoped>
.container {
  max-width: 1500px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 2000px) {
    & {
      max-width: 1600px;
    }
  }
}
</style>
