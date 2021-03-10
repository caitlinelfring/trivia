class Player {
  constructor(conn, name) {
    this.conn = conn;
    this.name = name;
    this.state = "nameless";
    this.score = Math.floor((Math.random() * 10) + 1);
    // this.score = 0;
    console.log(conn);
  }

  send(data) {
    this.conn.send(data);
  }
  testSend() {
    this.conn.send(`Hello ${this.name}!`);
  }
}

export default Player;
