import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Row,
  Col,
  Spinner,
  ProgressBar,
} from "react-bootstrap";

import { randStringToUpperCase} from "../utils/random";
import { roomIdNumChars } from "../utils/constants";
import Scoreboard from "./Scoreboard";
import { HostPeer } from "../models/PeerJS";
import QuestionView from "./QuestionView";
import Manager from "../models/Manager";

let peer;

export default function Host(props) {
  const roomId = randStringToUpperCase(roomIdNumChars);
  const [players, setPlayers] = useState([]);
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState(null);
  const [prepareRound, setPrepareRound] = useState(null);

  useEffect(() => {
    const disconnect = () => {
      if (peer) {
        peer.disconnect();
      }
    };
    window.addEventListener("beforeunload", disconnect);
  })

  if (!peer) {
    const onConnectionOpened = (player) => {
      setPlayers(prevState => [...prevState, player]);
      Manager.instance.addPlayer(player);
    }
    const onData = (data) => {
      console.log('Received', data);
    }
    peer = new HostPeer(roomId, onData, onConnectionOpened);
  }

  const start = () => {
    setStarted(true);
    Manager.instance.prepareNextRound()
  }

  Manager.instance.onRoundComplete = () => {
    setPrepareRound(Manager.instance.round);
    setPlayers(Manager.instance.players);
  }
  Manager.instance.onNewQuestion = (q) => {
    setPrepareRound(null);
    setQuestion(q);
  }
  return (
    <>
      <Row>
        <Col xs={12} md={8}>
          <h3>
            Trivia Game <Badge variant="secondary">{roomId}</Badge>
          </h3>
          <p>Others can join this game by going to <code>{window.location.origin}</code> and joining this Game ID</p>
          {(players.length > 0 && !started) && <Button variant="primary" onClick={() => start()}>Start</Button>}
          {!!prepareRound &&
            <>
              <Spinner animation="border" variant="primary" />
              <h5>Prepare for round {prepareRound}</h5>
            </>
          }
          {(question && !prepareRound) && (
            <>
            <QuestionView question={question} isHost={true} />
            <ProgressBar
              className={"mt-5"} animated
              now={Manager.instance.round}
              label={Manager.instance.round}
              max={Manager.instance.questions.length}
            />
            </>
          )}


        </Col>
        <Col xs={12} md={4}>
          <div className="pt-2">
            <h5>{players.length > 0 ? "Scoreboard" : "Waiting for Players..."}</h5>
            {players.length > 0 && <Scoreboard players={players} />}
          </div>
        </Col>
      </Row>
    </>
  )
}
