class Player {
  constructor(conn, name) {
    this.conn = conn;
    console.log(`player: ${name} connectionId: ${conn.connectionId}`);
    this.connectionId = conn.connectionId;
    this.name = name;
    this.score = 0;
    this.answers = {};
    this.connected = true;
  }

  send(data) {
    this.conn.send(data);
  }

  update(player) {
    this.conn = player.conn;
    this.connectionId = player.conn.connectionId;
    this.connected = true;
  }

  disconnect() {
    this.connected = false;
  }

  record(round, answer, correct) {
    this.answers[round] = {answer, correct};
    if (correct) {
      this.score++;
    }
  }

  isRoundComplete(round) {
    if (!this.connected) {
      return true;
    }
    return !!this.answers[round];
  }

  // Cannot serialize `this.conn` when sending player details to peers
  serialize() {
    return {
      name: this.name,
      score: this.score,
      answers: this.answers,
      connected: this.connected,
    };
  }

  reset() {
    this.score = 0;
    this.answers = {};
  }
}

export default Player;
