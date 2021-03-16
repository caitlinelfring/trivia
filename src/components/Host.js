import React, { useState, useEffect } from "react";
import {
  Badge,
  Row,
  Col,
  Spinner,
  ProgressBar,
} from "react-bootstrap";

import Scoreboard from "./Scoreboard";
import WinnerView from "./WinnerView";
import { HostPeer } from "../models/PeerJS";
import LeaveButton from "./LeaveButton";
import StartButton from "./StartButton";
import QuestionView from "./QuestionView";
import Manager from "../models/Manager";
import { cleanUri } from "../utils/helpers";
import { CategoryDropDown } from "./CategoryDropdown";

const manager = new Manager();

export default function Host(props) {
  const { roomId } = props;
  manager.roomId = roomId;
  const [players, setPlayers] = useState([]);
  const [started, setStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [question, setQuestion] = useState(null);
  const [prepareRound, setPrepareRound] = useState(null);
  const [peer, setPeer] = useState(null);
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [winners, setWinners] = useState(null);

  manager.onRoundComplete = () => {
    setPrepareRound(manager.round);
    // TODO: update players correctly
    setPlayers([]);
    setPlayers(manager.players);
  };
  manager.onNewQuestion = (q) => {
    setPrepareRound(null);
    setQuestion(q);
  };
  manager.onGameComplete = () => {
    setGameComplete(true);
    setPrepareRound(null);
  };

  // FIXME: is there a better way to ensure WinnerView is only rendered once when the round completes?
  useEffect(() => {
    setWinners(gameComplete ? <WinnerView players={players} isHost={true} questions={manager.questions()} /> : null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameComplete]);

  useEffect(() => {
    const onConnectionOpened = (player) => {
      console.log(`connection closed: ${player.connectionId}`);
      manager.addPlayer(player);
      // TODO: update players correctly
      setPlayers([]);
      setPlayers(manager.players);
    };
    const onConnectionClosed = (id) => {
      console.log(`connection closed: ${id}`);
      manager.removeId(id);
      // TODO: update players correctly
      setPlayers([]);
      setPlayers(manager.players);
    };

    if (!peer || peer.id !== roomId) {
      setPeer(new HostPeer(roomId, onConnectionOpened, onConnectionClosed));
    }

    const disconnect = () => {
      console.log("Triggered disconnect");
      if (peer) {
        manager.reset();
        peer.disconnect();
      }
    };
    window.addEventListener("beforeunload", disconnect);
    return () => window.removeEventListener("beforeunload", disconnect);
  }, [roomId, peer]);

  useEffect(() => {
    if (manager.questionManager) {
      manager.questionManager.selectedCategory = category;
    }
  }, [category]);

  useEffect(() => {
    manager.questionManager.populateCategories().then(() => {
      setCategories(manager.questionManager.categories);
    });
  }, []);

  useEffect(() => {
    started && manager.questionManager.populateQuestions().then(() => {
      manager.prepareNextRound();
    });
  }, [started]);

  const newGame = () => {
    console.log("new game");
    manager.newGame().then(() => {
      setGameComplete(false);
      setStarted(true);
      manager.prepareNextRound();
    });
  };

  return (
    <Row>
      <Col xs={12} md={8}>
        <div className="mb-5">
          <h3>
            Trivia Game <Badge variant="secondary">{roomId}</Badge>
          </h3>
          <p>Others can join this game by going to <code>{cleanUri()}</code> and joining this Game ID</p>
        </div>
        {(!started) && (
          <>
            <CategoryDropDown categories={categories} onSelect={setCategory} />
            <StartButton isLoading={players.length === 0} onClick={() => setStarted(true)} />
            <LeaveButton />
          </>
        )}
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
            className={"mt-5"}
            style={{height: "1.75rem"}}
            animated
            now={manager.round}
            label={`${manager.round} / ${manager.questions().length}`}
            max={manager.questions().length}
          />
          </div>
        )}
        {(started && gameComplete) && <>
          {winners}
          <StartButton onClick={() => newGame()} text={"New Game"} isLoading={false} />
          <LeaveButton />
        </>}
      </Col>
      <Col xs={12} md={4}>
        <div className="pt-2">
          {players.length > 0 && <Scoreboard players={players} round={prepareRound} />}
        </div>
      </Col>
    </Row>
  );
}
