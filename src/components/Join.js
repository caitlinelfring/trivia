import React, { useState, useEffect } from "react";
import {
  Spinner,
  Badge,
} from "react-bootstrap";
import { PlayerPeer } from "../models/PeerJS";
import QuestionView from "./QuestionView";
import WinnerView from "./WinnerView";
import LeaveButton from "./LeaveButton";

function Join(props) {
  const { name, roomId } = props;

  const [connected, setConnected] = useState(false);
  const [question, setQuestion] = useState(null);
  const [prepareRound, setPrepareRound] = useState(null);
  const [gameComplete, setGameComplete] = useState(null);
  const [peer, setPeer] = useState(null);

  const onData = (data) => {
    console.log(`got data: ${data}`);
    if (typeof data === "object") {
      if (data.newQuestion) {
        setPrepareRound(null);
        setQuestion(data.newQuestion);
      }
      if (data.prepareForRound) {
        setGameComplete(false);
        setPrepareRound(data.prepareForRound);
      }
      if (data.gameComplete) {
        setGameComplete(data.gameComplete);
      }
    }
  };
  const onConnected = () => setConnected(true);
  useEffect(() => {
    !peer && setPeer(new PlayerPeer(roomId, { name, roomId }, onData, onConnected));
  }, [name, roomId, peer]);


  const choiceSelected = (choice) => {
    if (!peer.connections || !peer.connections[roomId]) {
      console.error(`Not sending choice, no connections for roomId ${roomId}`);
      return;
    }
    const send = (c) => c.send({ name: name, answer: choice, question: question.question });
    peer.connections[roomId].forEach(send);
  };

  return (
    <>
      {connected || <Spinner animation="border" variant="primary" />}
      <h4 className="mb-5">{connected ? "Joined" : "Joining"} room <Badge variant="secondary">{roomId}</Badge> {`as ${name}`}</h4>
      {(!question && connected && !prepareRound) && <p>Waiting for host to start the game.</p>}
      {(!question && !prepareRound) && <LeaveButton />
      }
      {(!!prepareRound && !gameComplete) &&
        <>
          <Spinner animation="border" variant="primary" />
          <h5>Prepare for round {prepareRound}</h5>
        </>
      }
      {(question && !prepareRound && !gameComplete) && <QuestionView question={question} onSelected={choiceSelected} />}
      {(!prepareRound && gameComplete) && <WinnerView players={gameComplete} />}
    </>
  );
}

export default Join;
