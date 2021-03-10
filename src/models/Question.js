const shuffle = (list) => {
  return list.sort(() => Math.random() - 0.5)
}

export default class Question {
  constructor(props = {}) {
    const { question, correct_answer, incorrect_answers, category } = props;
    this.correct = decodeURIComponent(correct_answer);
    this.incorrect = incorrect_answers.map(decodeURIComponent);
    this.category = decodeURIComponent(category);
    this.question = decodeURIComponent(question);
    this.all = shuffle([this.correct, ...this.incorrect]);
  }
  correctIdx() {
    return this.all.indexOf(this.correct);
  }
  get(i) {
    return this.all[i];
  }
  map(f) {
    return this.all.map(f);
  }
  isCorrect(i) {
    return this.correctIdx() === Number(i);
  }
}
