const shuffle = (list) => {
  return list.sort(() => Math.random() - 0.5);
};

export default class Question {
  constructor(props = {}) {
    const { question, correct_answer, incorrect_answers, category } = props;
    this._correct = decodeURIComponent(correct_answer);
    const incorrect = incorrect_answers.map(decodeURIComponent);
    this.category = decodeURIComponent(category);
    this.question = decodeURIComponent(question);
    this.answers = shuffle([this._correct, ...incorrect]);
  }

  correctIdx() {
    return this.answers.indexOf(this._correct);
  }
  get(i) {
    return this.answers[i];
  }
  isCorrect(i) {
    return this.correctIdx() === Number(i);
  }
  // strip out the correct answer for the player
  forPlayer() {
    return {
      question: this.question,
      answers: this.answers,
      category: this.category,
    };
  }
}
