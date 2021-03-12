import Question from "./Question";

const MID_ROUND_DELAY = 1000;
const DEFAULT_QUESTIONS = 1;

const sessionToken = (id) => {
  return `dHJpdmlhCg-${id}`;
};

const getQuestions = async (roomId = null, num = 1) => {
  var query = { "amount": num, "encode": "url3986", "type": "multiple", "category": "18" };

  if (roomId) {
    query["token"] = sessionToken(roomId);
  }
  const searchParams = new URLSearchParams(query);

  let response = await fetch(`https://opentdb.com/api.php?${searchParams.toString()}`);
  let data = await response.json();
  return data.results.map(d => new Question(d));
};

export default class Manager {
  static instance = Manager.instance == null ? new Manager() : Manager.instance;

  constructor() {
    this.players = [];
    this.round = 0;
    this.questions = [];
    this.currentQuestion = null;
    this.roomId = null;
    this.onRoundComplete = () => { };
    this.onGameComplete = () => {};
    this.onNewQuestion = () => {};
    this.populateQuestions();
  }
  async populateQuestions() {
    this.questions = await getQuestions(this.roomId, DEFAULT_QUESTIONS);
  }
  addPlayer(player) {
    this.players.push(player);
    if (this.currentQuestion) {
      this.sendQuestion();
    }
  }

  removeId(id) {
    const ndx = this.players.findIndex(p => p.connectionId === id);
    console.log(`idx: ${ndx}`);
    if (ndx !== -1) {
      this.players.splice(ndx, 1);
    }
    console.log(this.players);
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
    this.currentQuestion = null;
  }

  sendQuestion() {
    if (this.round > this.questions.length) {
      this.gameComplete();
      return;
    }
    this.currentQuestion = this.questions[this.round-1];
    console.log(`Question: ${this.currentQuestion.question}, answer: ${this.currentQuestion._correct}`);
    this.players.forEach(player => {
      const onData = (d) => {
        console.log(`got message from player ${player.name}. Correct? ${this.currentQuestion.isCorrect(d.answer)}`);
        player.record(this.round, d.answer, this.currentQuestion.isCorrect(d.answer));
        player.conn.off('data', onData);
        this.goToNextRound();
      };
      player.conn.on('data', onData);
      player.send({"newQuestion": this.currentQuestion.forPlayer()});
    });
    this.onNewQuestion(this.currentQuestion.forPlayer());
  }

  goToNextRound() {
    if (this.checkRoundDone()) {
      this.prepareNextRound();
    }
  }

  prepareNextRound() {
    this.nextRound();
    if (this.round > this.questions.length) {
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

  newGame() {
    this.round = 0;
    this.players.forEach(p => p.score = 0);
    this.populateQuestions();
  }
}
