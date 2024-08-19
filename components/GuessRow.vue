<template>
  <div class="guess-row">
    <GuessLetter v-for="(letter, index) in guess" :key="index" :guess="letter" />
  </div>
</template>

<script setup lang="ts">
import type { CheckedLetterState } from '../stores/useRootStore';

defineProps({
  guess: { default: [], type: Array as PropType<string[]|CheckedLetterState[]> }
});
</script>

<style lang="scss">
.guess-row {
  display: flex;
  grid-gap: 12px;
  justify-content: center;
  margin-bottom: 8px;
}
</style>
