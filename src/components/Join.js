import React, { useState, useEffect } from "react";
import {
  Spinner,
  Badge,
} from "react-bootstrap";
import { PlayerPeer } from "../models/PeerJS";
import QuestionView from "./QuestionView";
import WinnerView from "./WinnerView";
import LeaveButton from "./LeaveButton";
import ErrorAlert from "./ErrorAlert";

const Join = ({ name, roomId }) => {
  const [connected, setConnected] = useState(false);
  const [question, setQuestion] = useState(null);
  const [prepareRound, setPrepareRound] = useState(null);
  const [gameComplete, setGameComplete] = useState(null);
  const [peer, setPeer] = useState(null);
  const [error, setError] = useState(null);

  const onData = (data) => {
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
  const onClose = () => {
    console.log("onClose");
    setConnected(false);
    setPrepareRound(null);
    setQuestion(null);
    setGameComplete(false);
  };

  useEffect(() => {
    !peer && setPeer(new PlayerPeer(roomId, { name, roomId }, onData, onConnected, onClose, setError));
  }, [name, roomId, peer]);

  const choiceSelected = (choice) => {
    if (!peer.connections || !peer.connections[roomId]) {
      console.error(`Not sending choice, no connections for roomId ${roomId}`);
      return;
    }
    const send = (c) => c.send({ answer: choice, question: question.question });
    peer.connections[roomId].forEach(send);
  };

  const showSpinner = !connected && !error;
  const spinner = <Spinner animation="border" variant="primary" />;

  return (
    <>
      {error && <ErrorAlert error={error} />}
      {showSpinner && spinner}
      <h4 className="m-5">{connected ? "Joined" : "Joining"} room <Badge variant="secondary">{roomId}</Badge> {`as ${name}`}</h4>
      {(!question && connected && !prepareRound) && <p>Waiting for host to start the game.</p>}
      {(!question && !prepareRound) && <LeaveButton />
      }
      {(!!prepareRound && !gameComplete) &&
        <>
          {spinner}
          <h5>Prepare for round {prepareRound}</h5>
        </>
      }
      {(question && !prepareRound && !gameComplete) && <QuestionView question={question} onSelected={choiceSelected} />}
      {(!prepareRound && gameComplete) && <WinnerView players={gameComplete} />}
    </>
  );
};

export default Join;
