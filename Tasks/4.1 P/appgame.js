Vue.createApp({
    data() {
      return {
        targetNumber: this.generateRandomNumber(),
        userGuess: null,
        message: 'Start guessing!'
      };
    },
    methods: {
      generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
      },
      checkGuess() { 
        if (this.userGuess === null) {
          this.message = 'Please enter a number.';
          return;
        }   
        // condition 1 
        if (this.userGuess < 1 || this.userGuess > 100) {
          this.message = 'Please enter a number between 1 and 100';
          return;
        }
        // combine two condition s
        if (this.userGuess > this.targetNumber) {
          this.message = 'Guess lower!';
        } else if (this.userGuess < this.targetNumber) {
          this.message = 'Guess higher!';
        } else {
          this.message = 'You got it!';
        }
      },
      giveUp() {
        this.message = `The number was ${this.targetNumber}. Try again!`;
      },
      startOver() {
        this.targetNumber = this.generateRandomNumber();
        this.userGuess = null;
        this.message = 'Start guessing!';
      }
    }
  }).mount('#app');
  