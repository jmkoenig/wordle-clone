export interface CheckedLetterState {
  letter: string
  index: number
  isCorrectPosition: boolean
  isInWord?: boolean
}

const MAX_GUESSES = 6;

const evaluateInWordPositions = (guess: CheckedLetterState[], answer: string): CheckedLetterState[] => {
  return guess.map((letterObj, index, self) => {
    const letter = letterObj.letter;
    const letterRegex = new RegExp(letter, 'g');
    let isInWord;

    if (!answer.includes(letter)) {
      // Easy if answer doesn't include the letter
      isInWord = false;
    } else if (letterObj.isCorrectPosition) {
      // Also easy if letter is already in the correct position
      isInWord = true;
    } else {
      /**
       * Otherwise, depends on how many have already been guessed, and how many later ones are already in the correct position.
       *  - Correct position later overrules earlier guesses.
       *  - "In word" guesses are first come first serve.
       * 
       * Example: Guessing "ERROR" for answer "WORRY"
       *  - "r" in index 2 is in correct position.
       *  - "r" in index 1 and index 4 are both technically in the word, but index 1 would be checked first.
       *  - numLettersInAnswer = 2
       *  - At index 1, numCorrectLater = 1, numGuessedSoFar = 0 -> 1 + 0 = 1 < 2
       *  - At index 2, automatic isInWord = true because isCorrectPosition = true
       *  - At index 4, numCorrectLater = 1, numGuessedSoFar = 2 -> 1 + 2 = 3 > 2
      */
      const numCorrectLater = self.slice(index + 1).filter(x => letter === x.letter && x.isCorrectPosition).length;
      const numGuessedSoFar = self.slice(0, index).filter(x => letter === x.letter).length;
      const numLettersInAnswer = (answer.match(letterRegex) || []).length;

      isInWord = numCorrectLater + numGuessedSoFar < numLettersInAnswer;
    }

    return {
      ...letterObj,
      isInWord
    };
  });
};

export const useRootStore = defineStore('root', {
  state: () => {
    return {
      answer: '',
      currentGuess: ['', '', '', '', ''],
      guessedLetters: [] as string[],
      submittedWords: [] as CheckedLetterState[][]
    };
  },
  getters: {
    currentGuessFirstBlank: (state) => {
      return state.currentGuess.findIndex(x => x === '');
    },
    dedupedGuessedLetters: (state) => {
      return [...new Set(state.guessedLetters)];
    },
    isGameOver (): boolean {
      return this.isGameWon || this.submittedWords.length === MAX_GUESSES
    },
    isGameWon (): boolean {
      let lastGuess = ''
      if (this.submittedWords.length === 0) {
        return false;
      }

      const lastSubmittedWordIndex = this.submittedWords.length - 1;
      lastGuess = this.submittedWords[lastSubmittedWordIndex].map(letterObj => letterObj.letter).join('');

      return this.answer === lastGuess
    },
    grid (): (string[]|CheckedLetterState[])[] {
      const gridArr: (string[]|CheckedLetterState[])[] = [...this.submittedWords];
      // Only add a current guess array if the game is still going
      if (!this.isGameOver) {
        gridArr.push(this.currentGuess);
      }
      // Fill the rest of the grid with blank rows
      for (let i = gridArr.length; i < MAX_GUESSES; i++) {
        gridArr.push(['', '', '', '', '']);
      }
      return gridArr;
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
      // Add to list of guessed letters
      this.guessedLetters.push(...this.currentGuess);

      // Evaluate each letter in guessed word
      let submittedWord = this.currentGuess.map((letter, index) => {
        return {
          letter,
          index,
          isCorrectPosition: letter === this.answer[index] // Can set this easily
        }
      });

      // isInWord is more complicated
      submittedWord = evaluateInWordPositions(submittedWord, this.answer);

      this.submittedWords.push(submittedWord);
      this.currentGuess = ['', '', '', '', '']; // Reset current guess
    }
  }
});
