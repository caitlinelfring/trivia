import Question from "./Question";

const midQuestionPause = 1000;
const defaultQuestions = 10;

const sessionToken = (id) => {
  return `dHJpdmlhCg-${id}`;
};

const getQuestions = async (roomId = null, num = 1) => {
  var query = { "amount": num, "encode": "url3986", "type": "multiple" };

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
    this.onRoundComplete = () => { };
    this.onGameComplete = () => {};
    this.onNewQuestion = () => {};
    this.populateQuestions();
  }
  async populateQuestions() {
    this.questions = await getQuestions(null, defaultQuestions);
  }
  addPlayer(player) {
    this.players.push(player);
  }

  checkRoundDone() {
    const incomplete = this.players.filter(player => !player.isRoundComplete(this.round));
    return incomplete.length === 0;
  }

  gameComplete() {
    this.players.forEach(player => {
      player.send({ "gameComplete": this.players.map(p => p.details()) });
    });
    this.onGameComplete();
  }

  sendQuestion() {
    if (this.round > this.questions.length) {
      this.gameComplete();
      return;
    }
    const q = this.questions[this.round-1];
    this.players.forEach(player => {
      const onData = (d) => {
        console.log(`got message from player ${player.name}. Correct? ${q.isCorrect(d.answer)}`);
        player.record(this.round, d.answer, q.isCorrect(d.answer));
        player.conn.off('data', onData);
        this.goToNextRound();
      };
      player.conn.on('data', onData);
      player.send({"newQuestion": q.forPlayer()});
    });
    this.onNewQuestion(q.forPlayer());
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
    console.log(this.players);
    this.players.forEach(player => {
      player.send({ "prepareForRound": this.round });
    });
    setTimeout(() => {
      this.sendQuestion();
    }, midQuestionPause);
  }

  nextRound() {
    this.round++;
    this.onRoundComplete();
  }
}
