<template>
  <table class="tokens-grid">
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
        <th v-if="hasRemValue">Pixels</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="([key, value], index) in Object.entries(tokens)" :key="key + index">
        <td>{{ key }}</td>
        <td>{{ value }}</td>
        <td v-if="hasRemValue">{{ Number(value.replace('rem', '')) * 16 }}px</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
interface IProps {
  tokens: Record<string, string | number>
  hasRemValue?: boolean
}
defineProps<IProps>()
</script>

<style scoped>
.tokens-grid {
  width: 100%;
  font-family: sans-serif;
  color: #000;
  border-collapse: collapse;
}

.tokens-grid thead th {
  padding: 0.75rem 1rem;
  text-align: left;

  background-color: #424141;
  color: #fff;
}
.tokens-grid tbody td {
  padding: 0.75rem 1rem;
  color: #fff;
}

.tokens-grid tbody tr:nth-child(even) td {
  background: #929292;
}
.tokens-grid tbody tr:nth-child(odd) td {
  background: #ececec;

  color: #000;
}
</style>
