import React, { useState } from "react";
import {
  Spinner,
  Badge,
} from "react-bootstrap";
import JoinInput from "./JoinInput";
import Peer from 'peerjs';
import { peerConfig, errorAlert } from "./constants";

let peer;

function Join(props) {
  const [state, setState] = useState({
    roomId: "",
    name: "",
  })

  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  const { roomId, name } = state;
  if (roomId === "" || name === "") {
    return <JoinInput onSubmit={setState} />
  }
  if (!peer) {
    peer = new Peer(null, peerConfig);
    peer.on('error', errorAlert);

    peer.on('open', function (id) {
      console.log('My peer ID is: ' + id);
      const conn = peer.connect(roomId, { metadata: state });
      conn.on('open', function () {
        console.log(`open connection, connected: ${conn.open}`)
        setConnected(true);
        // Receive messages
        conn.on('data', function (data) {
          console.log('Received', data);
          setMessages(prevState => [...prevState, data]);
        });
        conn.on('close', () => {
          console.log("connection closed");
          errorAlert("The host has closed the connection");
        });
        conn.send('Hello!');
      });
    });
}
  return (
    <>{connected ||
      <Spinner animation="border" variant="primary" />}
      <p>{connected ? "Joined" : "Joining"} room <Badge variant="secondary">{roomId}</Badge> {`as ${name}`}</p>
      {messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </>
  );
}

export default Join;
