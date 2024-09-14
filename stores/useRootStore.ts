export interface CheckedLetterState {
  letter: string
  index?: number
  isCorrectPosition?: boolean
  isInWord?: boolean
}

export const useRootStore = defineStore('root', {
  state: () => {
    return {
      answer: '',
      blankGrid: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
      ],
      currentGuess: ['', '', '', '', ''],
      submittedWords: [] as CheckedLetterState[][]
    };
  },
  getters: {
    currentGuessFirstBlank: (state) => {
      return state.currentGuess.findIndex(x => x === '');
    },
    isGameWon (): boolean {
      return this.answer === this.lastGuess
    },
    lastGuess: (state) => {
      if (state.submittedWords.length === 0) {
        return '';
      }

      const lastSubmittedWordIndex = state.submittedWords.length - 1;
      return state.submittedWords[lastSubmittedWordIndex].map(letterObj => letterObj.letter).join('');
    },
    grid: (state) => {
      const blankRowsIndex = state.submittedWords.length + 1;
      return [
        ...state.submittedWords,
        state.currentGuess,
        ...state.blankGrid.slice(blankRowsIndex)
      ];
    }
  },
  actions: {
    addLetterToCurrentGuess (letter: string) {
      if (this.currentGuessFirstBlank === -1) {
        return;
      }

      this.currentGuess[this.currentGuessFirstBlank] = letter;
    },
    removeLetterFromCurrentGuess () {
      let currIndex = this.currentGuessFirstBlank;
      if (currIndex === -1) {
        currIndex = this.currentGuess.length;
      }

      this.currentGuess[currIndex - 1] = '';
    },
    setAnswer (word: string) {
      this.answer = word;
    },
    submitGuess () {
      const submittedWord = this.currentGuess.map((letter, index) => {
        return {
          letter,
          index,
          isCorrectPosition: letter === this.answer[index],
          isInWord: this.answer.includes(letter)
        }
      });

      this.submittedWords.push(submittedWord);
      this.currentGuess = ['', '', '', '', ''];
    }
  }
});
