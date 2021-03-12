class Player {
  constructor(conn, name) {
    this.conn = conn;
    console.log(`player: ${name} connectionId: ${conn.connectionId}`);
    this.connectionId = conn.connectionId;
    this.name = name;
    this.score = 0;
    this.answers = {};
  }

  send(data) {
    this.conn.send(data);
  }

  record(round, answer, correct) {
    this.answers[round] = {answer, correct};
    if (correct) {
      this.score++;
    }
  }

  isRoundComplete(round) {
    return !!this.answers[round];
  }

  // Cannot serialize `this.conn` when sending player details to peers
  serialize() {
    return {
      name: this.name,
      score: this.score,
      answers: this.answers,
    };
  }

  reset() {
    this.score = 0;
    this.answers = {};
  }
}

export default Player;
