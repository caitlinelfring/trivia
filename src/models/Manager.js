import QuestionManager from "./QuestionManager";

const MID_ROUND_DELAY = 1000;

export default class Manager {
  constructor() {
    this.reset();
  }

  reset() {
    this.players = [];
    this.round = 0;
    this.questionManager = new QuestionManager();
    this.onRoundComplete = () => { };
    this.onGameComplete = () => { };
    this.onNewQuestion = () => { };
  }

  addPlayer(player) {
    const existing = this.players.findIndex(p => p.name === player.name);
    if (existing !== -1) {
      this.players[existing].update(player);
    } else {
      this.players.push(player);
    }
    if (this.questionManager.current) {
      this.sendQuestion();
    }
  }

  questions() {
    return this.questionManager.questions;
  }

  removeId(id) {
    const idx = this.players.findIndex(p => p.connectionId === id);
    if (idx !== -1) {
      this.players[idx].disconnect();
    }
  }

  checkRoundDone() {
    const incomplete = this.players.filter(player => !player.isRoundComplete(this.round));
    return incomplete.length === 0;
  }

  gameComplete() {
    this.players.forEach(player => {
      player.send({ "gameComplete": this.players.map(p => p.serialize()) });
    });
    this.onGameComplete();
    this.questionManager.current = null;
  }

  sendQuestion() {
    if (this.round > this.questions().length) {
      this.gameComplete();
      return;
    }
    this.questionManager.setCurrent(this.round-1);
    console.log(`Question: ${this.questionManager.current.question}, answer: ${this.questionManager.current._correct}`);
    this.players.forEach(player => {
      const onData = (d) => {
        console.log(`got message from player ${player.name}. Correct? ${this.questionManager.current.isCorrect(d.answer)}`);
        player.record(this.round, d.answer, this.questionManager.current.isCorrect(d.answer));
        player.conn.off("data", onData);
        this.goToNextRound();
      };
      player.conn.on("data", onData);
      player.send({"newQuestion": this.questionManager.current.forPlayer()});
    });
    this.onNewQuestion(this.questionManager.current.forPlayer());
  }

  goToNextRound() {
    if (this.checkRoundDone()) {
      this.prepareNextRound();
    }
  }

  prepareNextRound() {
    this.nextRound();
    console.log(`round: ${this.round}, questions: ${this.questions().length}`);
    if (this.round > this.questions().length) {
      this.gameComplete();
      return;
    }

    this.players.forEach(player => {
      player.send({ "prepareForRound": this.round });
    });
    setTimeout(() => {
      this.sendQuestion();
    }, MID_ROUND_DELAY);
  }

  nextRound() {
    this.round++;
    this.onRoundComplete();
  }

  async newGame() {
    await this.questionManager.reset();
    this.round = 0;
    this.players.forEach(p => p.reset());
  }
}
