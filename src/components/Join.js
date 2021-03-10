import React, { useState } from "react";
import {
  Spinner,
  Badge,
} from "react-bootstrap";
import JoinInput from "./JoinInput";
import { PlayerPeer } from "../models/PeerJS";

// Global state to avoid reconnect errors when the property is re
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

  // wow... this is bad, but best reconnect logic i can handle right now
  if (!peer) {
    const onData = (data) => {
      setMessages(prevState => [...prevState, data]);
    }
    const onConnected = () => {
      setConnected(true);
    };
    const onClose = () => {
      // TODO
    }
    peer = new PlayerPeer(roomId, state, onData, onConnected, onClose)
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
