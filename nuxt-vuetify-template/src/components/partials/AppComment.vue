<template>
  <div class="comment">
    <div class="d-flex">
      <v-avatar size="50">
        <v-img :lazy-src="comment?.author?.photo" :src="comment?.author?.photo" alt="Avatar" />
      </v-avatar>
      <div class="ms-3 d-flex flex-column">
        <app-text class="d-block mb-1" as="strong" size="lg" color="text-900">
          {{ comment?.author?.name }}
        </app-text>
        <app-text as="span" size="md" color="text-500">{{ comment?.date }}</app-text>
      </div>
    </div>
    <app-text class="mt-4" as="p" color="text">
      {{ comment?.text }}
    </app-text>
  </div>
</template>

<script setup lang="ts">
import { IComment } from '@/types/global/comments'

interface IProps {
  comment: IComment
}
defineProps<IProps>()
</script>

<style scoped lang="scss">
.comment:not(:last-of-type) {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgb(var(--v-theme-gray-200));
  margin: 1.2rem 0;
}
</style>
