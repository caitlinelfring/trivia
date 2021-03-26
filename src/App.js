import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import NoSleep from 'nosleep.js';

import Join from "./components/Join";
import Host from "./components/Host";
import JoinInput from "./components/JoinInput";
import { cleanUri, roomIdNumChars } from "./utils/helpers";
import { randStringToUpperCase } from "./utils/random";
import Logo from "./components/Logo.js";

const addAlertUserListener = () => {
  if (process.env.NODE_ENV === "production") {
    const alertUser = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }
};

const stopSleep = () => {
  // Stop the screen from going to sleep
  const noSleep = new NoSleep();
  document.addEventListener('click', function enableNoSleep() {
    document.removeEventListener('click', enableNoSleep, false);
    noSleep.enable();
  }, false);
};

export default function App() {
  // Clean the url in the browser bar.
  // This might need to go away if I ever want to auto-join from a fragment in the url
  window.history.replaceState({}, document.title, cleanUri());

  useEffect(addAlertUserListener, []);

  const [isPlayer, setIsPlayer] = useState(false);
  const [host, setHost] = useState(false);
  const [playerState, setPlayerState] = useState({roomId: "", name: ""});

  const join = (input) => {
    setIsPlayer(true);
    setPlayerState(input);
  };
  useEffect(() => {
    const infoFromStorage = JSON.parse(sessionStorage.getItem("roomInfo"));
    if (infoFromStorage) {
      join(infoFromStorage);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("host_room_id")) {
      setHost(true);
    }
  }, []);

  let ui;
  if (isPlayer) {
    stopSleep();
    ui = <>
      <Join {...playerState}/>
    </>;
  } else if (host) {
    stopSleep();
    const roomId = sessionStorage.getItem("host_room_id") || randStringToUpperCase(roomIdNumChars);
    sessionStorage.setItem("host_room_id", roomId);

    ui = <>
      <Host roomId={roomId}/>
    </>;
  } else {
    ui = <>
      <h4>Want to host a Trivia game? Start one now!</h4>
      <Button size="lg" variant="primary" onClick={() => setHost(true)}>Start</Button>
      <h4 className="pt-5">Or join a game someone's hosting</h4>
      <JoinInput onSubmit={join} />
    </>;
  }

  return (
    <Container fluid="md" className={"pt-4"}>
      <Row>
        <Col>
          <div className="logo mx-auto p-5">
            <Logo />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Body>
              {ui}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
