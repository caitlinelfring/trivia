import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Row,
  Col,
  Spinner,
  ProgressBar,
} from "react-bootstrap";

import Scoreboard from "./Scoreboard";
import WinnerView from "./WinnerView";
import { HostPeer } from "../models/PeerJS";
import QuestionView from "./QuestionView";
import Manager from "../models/Manager";
import { cleanUri } from "../utils/helpers";

export default function Host(props) {
  const { roomId } = props;
  const [players, setPlayers] = useState([]);
  const [started, setStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [question, setQuestion] = useState(null);
  const [prepareRound, setPrepareRound] = useState(null);
  const [peer, setPeer] = useState(null);

  Manager.instance.onRoundComplete = () => {
    setPrepareRound(Manager.instance.round);
    // TODO: update players correctly
    setPlayers([]);
    setPlayers(Manager.instance.players);
  };
  Manager.instance.onNewQuestion = (q) => {
    setPrepareRound(null);
    setQuestion(q);
  };
  Manager.instance.onGameComplete = () => {
    setGameComplete(true);
    setPrepareRound(null);
  };

  useEffect(() => {
    const onConnectionOpened = (player) => {
      Manager.instance.addPlayer(player);
      // TODO: update players correctly
      setPlayers([]);
      setPlayers(Manager.instance.players);
    };
    const onConnectionClosed = (id) => {
      Manager.instance.removeId(id);
      // TODO: update players correctly
      setPlayers([]);
      setPlayers(Manager.instance.players);
    };

    if (!peer) {
      setPeer(new HostPeer(roomId, onConnectionOpened, onConnectionClosed));
    }

    const disconnect = () => {
      console.log("Triggered disconnect");
      if (peer) {
        Manager.instance.players = [];
        Manager.instance.onRoundComplete = () => {};
        Manager.instance.onNewQuestion = () => {};
        Manager.instance.onGameComplete = () => {};
        peer.destroy();
      }
    };
    window.addEventListener("beforeunload", disconnect);
    return () => window.removeEventListener("beforeunload", disconnect);
  }, [roomId, peer]);

  const start = () => {
    setStarted(true);
    Manager.instance.prepareNextRound();
  };

  function newGame() {
    Manager.instance.newGame();
    setGameComplete(false);
    start();
  }

  return (
    <>
      <Row>
        <Col xs={12} md={8}>
          <div className="mb-5">
            <h3>
              Trivia Game <Badge variant="secondary">{roomId}</Badge>
            </h3>
            <p>Others can join this game by going to <code>{cleanUri()}</code> and joining this Game ID</p>
          </div>
          {(players.length > 0 && !started) && <Button variant="primary" onClick={() => start()}>Start</Button>}
          {(!!prepareRound && !gameComplete) &&
            <>
              <Spinner animation="border" variant="primary" />
              <h5>Prepare for round {prepareRound}</h5>
            </>
          }
          {(question && !prepareRound && !gameComplete) && (
            <div>
            <QuestionView question={question} isHost={true} />
            <ProgressBar
              className={"mt-5"} animated
              now={Manager.instance.round}
              label={Manager.instance.round}
              max={Manager.instance.questions.length}
            />
            </div>
          )}
          {(started && gameComplete) && <>
            <WinnerView players={players} />
            <Button variant="primary" onClick={() => newGame()}>New Game</Button>
          </>}
        </Col>
        <Col xs={12} md={4}>
          <div className="pt-2">
            {players.length > 0 ? <Scoreboard players={players} /> : <h5>Waiting for Players...</h5>}
          </div>
        </Col>
      </Row>
    </>
  );
}
