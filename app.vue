<template>
  <div class="noselect">
    <GuessGrid />
    <UserKeyboard @key-clicked="handleClick" />
  </div>
</template>

<script setup lang="ts">
import { wordsShort } from './static/words-short';
import { getRandomInt } from './utils/mathHelpers';

const randomIndex = useState('answer_index', () => getRandomInt(0, wordsShort.length));

const rootStore = useRootStore();

const firstBlankIndex = computed(() => rootStore.firstBlankIndex);
const currentGuess = computed(() => rootStore.currentGuess);

const handleClick = (newLetter: string) => {
  if (newLetter === 'back') {
    rootStore.removeLetterToCurrentGuess();
  } else if (newLetter === 'enter') {
    handleSubmit();
  } else if (firstBlankIndex.value > -1) {
    rootStore.addLetterToCurrentGuess(newLetter);
  }
};

const handleSubmit = () => {
  if (firstBlankIndex.value > -1) {
    alert('Not enough letters');
    return;
  }
  
  rootStore.addGuessToAllGuesses(currentGuess.value);
};

rootStore.setAnswer(wordsShort[randomIndex.value]);
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
