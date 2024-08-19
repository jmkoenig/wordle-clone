<template>
  <div class="guess-grid">
    <GuessRow v-for="(guess, index) in grid" :key="index" :guess="guess" />
  </div>
</template>

<script setup lang="ts">
const rootStore = useRootStore();

const grid = computed(() => rootStore.grid);
</script>

<style lang="scss">
.guess-grid {
  margin-bottom: 32px;
}
</style>
