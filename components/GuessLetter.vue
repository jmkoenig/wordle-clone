<template>
  <div class="guess-letter">
    <span>{{ guessString.toUpperCase() }}</span>
  </div>
</template>

<script setup lang="ts">
import type { CheckedLetterState } from '../stores/useRootStore';

const props = defineProps({
  guess: { default: null, type: [String, Object] as PropType<string | CheckedLetterState> }
});

const guessString = computed((): string => {
  if (typeof props.guess === 'string') {
    return props.guess;
  } else {
    return props.guess.letter;
  }
});
</script>

<style lang="scss">
.guess-letter {
  min-width: 32px;
  aspect-ratio: 1;
  border: 1px solid darkgray;
  padding: 16px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 32px;
  line-height: 32px;
  font-weight: bold;
  text-align: center;
}
</style>
