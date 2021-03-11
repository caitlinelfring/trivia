import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import Join from "./components/Join";
import Host from "./components/Host";
import JoinInput from "./components/JoinInput";
import { cleanUri } from "./utils/constants";

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

export default function App() {
  // Clean the url in the browser bar.
  // This might need to go away if I ever want to auto-join from a fragment in the url
  window.history.replaceState({}, document.title, cleanUri());

  useEffect(addAlertUserListener, []);

  const [isPlayer, setIsPlayer] = useState(false);
  const [host, setHost] = useState(false);
  const [playerState, setPlayerState] = useState({roomId: "", name: ""});

  let ui;

  if (isPlayer) {
    ui = <>
      <Join {...playerState}/>
    </>
  } else if (host) {
    ui = <>
      <Host />
    </>
  } else {
    ui = <>
      <h4>Want to host a Trivia game? Click the "Host" Button</h4>
      <Button size="lg" variant="primary" onClick={() => setHost(true)}>Host</Button>
      <h4 className="pt-5">Or join a game someone's hosting</h4>
      <JoinInput onSubmit={(input) => {
        console.log(input);
        setIsPlayer(true);
        setPlayerState(input);
      }} />
    </>;
  }

  return (
  <>
    <Container fluid="md" className={"pt-4"}>
      <Row>
        <Col>
          <Card className="text-center">
            {/* <Card.Header>Trivia Night</Card.Header> */}
            <Card.Body>
              {ui}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}
