export interface CheckedLetterState {
  letter: string
  index: number
  isCorrect: boolean
  isInWord: boolean
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
      ] as string[][],
      currentGuess: ['', '', '', '', ''] as string[],
      allGuesses: [] as CheckedLetterState[][]
    };
  },
  getters: {
    firstBlankIndex: (state) => state.currentGuess.findIndex((x) => x === ''),
    grid: (state) => {
      const blankRowsIndex = state.allGuesses.length + 1;
      return [
        ...state.allGuesses,
        state.currentGuess,
        ...state.blankGrid.slice(blankRowsIndex)
      ];
    }
  },
  actions: {
    addLetterToCurrentGuess (letter: string) {
      this.currentGuess[this.firstBlankIndex] = letter;
    },
    addGuessToAllGuesses (guess: string[]) {
      this.resetCurrentGuess();
      const checkedGuess = this.checkGuess(guess);
      this.allGuesses.push(checkedGuess);
    },
    checkGuess (guess: string[]): CheckedLetterState[] {
      return guess.map((letter, index) => {
        const isCorrect = letter === this.answer[index];
        const isInWord = this.answer.includes(letter);
        return {
          letter,
          index,
          isCorrect,
          isInWord
        }
      });
    },
    removeLetterToCurrentGuess () {
      if (this.firstBlankIndex === -1) {
        this.currentGuess[this.currentGuess.length - 1] = '';
      } else {
        this.currentGuess[this.firstBlankIndex - 1] = '';
      }
    },
    resetCurrentGuess () {
      this.currentGuess = ['', '', '', '', ''];
    },
    setAnswer (word: string) {
      this.answer = word;
    }
  }
});
