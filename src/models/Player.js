class Player {
  constructor(conn, name) {
    this.conn = conn;
    this.name = name;
    this.state = "nameless";
    this.score = 0;
    this.answers = {}
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
    return !!this.answers[round]
  }
}

export default Player;
