import React, { useState } from "react";
import {
  Spinner,
  Badge,
} from "react-bootstrap";
import { PlayerPeer } from "../models/PeerJS";
import QuestionView from "./QuestionView";

// Global state to avoid reconnect errors when the property is re
let peer;

function Join(props) {
  console.log(props);
  const { name, roomId } = props;

  const [connected, setConnected] = useState(false);
  const [question, setQuestion] = useState(null);
  const [prepareRound, setPrepareRound] = useState(null);

  // wow... this is bad, but best reconnect logic i can handle right now
  if (!peer) {
    const onData = (data) => {
      if (typeof data === "object") {
        if (data.newQuestion) {
          setQuestion(data.newQuestion);
          setPrepareRound(null);
        }
        if (data.prepareForRound) {
          setPrepareRound(data.prepareForRound);
        }
      }
    };
    const onConnected = () => setConnected(true);
    peer = new PlayerPeer(roomId, {name, roomId}, onData, onConnected)
  }

  const choiceSelected = (choice) => {
    if (!peer.connections || !peer.connections[roomId]) {
      console.error(`Not sending choice, no connections for roomId ${roomId}`)
      return;
    }
    const send = (c) => c.send({ name: name, answer: choice, question: question.question });
    peer.connections[roomId].forEach(send);
  }
  return (
    <>{connected ||
      <Spinner animation="border" variant="primary" />}
      <h4>{connected ? "Joined" : "Joining"} room <Badge variant="secondary">{roomId}</Badge> {`as ${name}`}</h4>
      {connected && <p>Waiting for host to start the game.</p>}
      {!!prepareRound &&
        <>
          <Spinner animation="border" variant="primary" />
          <h5>Prepare for round {prepareRound}</h5>
        </>
      }
      {(question && !prepareRound) && <QuestionView question={question} onSelected={choiceSelected} />}
    </>
  );
}

export default Join;
