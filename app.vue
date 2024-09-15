<template>
  <div class="noselect">
    <GuessGrid />
    <UserKeyboard @key-clicked="handleClick" />
    <!-- <GameCompleteModal v-show="isGameComplete" /> -->
  </div>
</template>

<script setup lang="ts">
import { keyboard } from './static/keyboard';
import { wordsShort } from './static/words-short';
import { getRandomInt } from './utils/mathHelpers';

const randomIndex = useState('answer_index', () => getRandomInt(0, wordsShort.length));

const rootStore = useRootStore();

const isGameComplete = computed(() => rootStore.isGameOver);

const handleClick = (newLetter: string) => {
  if (isGameComplete.value) {
    return;
  }

  if (newLetter === 'Backspace') {
    rootStore.removeLetterFromCurrentGuess();
  } else if (newLetter === 'Enter') {
    handleSubmit();
  } else {
    rootStore.addLetterToCurrentGuess(newLetter);
  }
};

const handleSubmit = () => {
  if (isGameComplete.value) {
    return;
  }

  if (rootStore.currentGuessFirstBlank !== -1) {
    alert('Not enough letters');
    return;
  }
  
  rootStore.submitGuess();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (isGameComplete.value) {
    return;
  }

  if (event.key === 'Backspace' || (event.key.length === 1 && keyboard.flat().includes(event.key.toLowerCase()))) {
    // Assume keys of length 1 are letters
    handleClick(event.key);
  } else if (event.key === 'Enter') {
    handleSubmit();
  }
};

rootStore.setAnswer(wordsShort[randomIndex.value]);

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
})
</script>

<style lang="scss">
// https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
</style>
