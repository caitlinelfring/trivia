import React, { useState, useEffect } from "react";
import {
  Spinner,
  Badge,
} from "react-bootstrap";
import { PlayerPeer } from "../models/PeerJS";
import QuestionView from "./QuestionView";
import WinnerView from "./WinnerView";
import { getWinners } from "../utils/helpers";

// Global state to avoid reconnect errors when the property is re
let peer;

function Join(props) {
  const { name, roomId } = props;

  const [connected, setConnected] = useState(false);
  const [question, setQuestion] = useState(null);
  const [prepareRound, setPrepareRound] = useState(null);
  const [gameComplete, setGameComplete] = useState(null);
  useEffect(() => {
    const onData = (data) => {
      console.log(`got data: ${data}`);
      if (typeof data === "object") {
        if (data.newQuestion) {
          setQuestion(data.newQuestion);
          setPrepareRound(null);
        }
        if (data.prepareForRound) {
          setPrepareRound(data.prepareForRound);
        }
        if (data.gameComplete) {
          setGameComplete(data.gameComplete);
        }
      }
    };
    const onConnected = () => setConnected(true);
    // wow... this is bad, but best reconnect logic i can handle right now
    if (!peer) {
      peer = new PlayerPeer(roomId, { name, roomId }, onData, onConnected);
    }
  }, [name, roomId]);


  const choiceSelected = (choice) => {
    if (!peer.connections || !peer.connections[roomId]) {
      console.error(`Not sending choice, no connections for roomId ${roomId}`);
      return;
    }
    const send = (c) => c.send({ name: name, answer: choice, question: question.question });
    peer.connections[roomId].forEach(send);
  };

  return (
    <>{connected ||
      <Spinner animation="border" variant="primary" />}
      <h4>{connected ? "Joined" : "Joining"} room <Badge variant="secondary">{roomId}</Badge> {`as ${name}`}</h4>
      {(!question && connected) && <p>Waiting for host to start the game.</p>}
      {(!!prepareRound && !gameComplete) &&
        <>
          <Spinner animation="border" variant="primary" />
          <h5>Prepare for round {prepareRound}</h5>
        </>
      }
      {(question && !prepareRound && !gameComplete) && <QuestionView question={question} onSelected={choiceSelected} />}
      {gameComplete && <WinnerView winners={getWinners(gameComplete)} />}
    </>
  );
}

export default Join;
