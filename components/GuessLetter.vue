<template>
  <div
    :class="{
      'guess-letter--submitted': !isString,
      'guess-letter--in-word': !isString && (guess as CheckedLetterState).isInWord,
      'guess-letter--correct': !isString && (guess as CheckedLetterState).isCorrectPosition
    }"
    class="guess-letter"
  >
    <span>{{ letter.toUpperCase() }}</span>
  </div>
</template>

<script setup lang="ts">
import type { CheckedLetterState } from '../stores/useRootStore';

const props = defineProps({
  guess: { default: null, type: [String, Object] as PropType<string | CheckedLetterState> }
});

const letter = computed((): string => {
  if (typeof props.guess === 'string') {
    return props.guess;
  } else {
    return props.guess.letter;
  }
});

const isString = computed(() => typeof props.guess === 'string');
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

  &--submitted {
    background: darkgray;
    color: white;
  }

  &--in-word {
    background: goldenrod;
  }

  &--correct {
    background: green;
  }
}
</style>
