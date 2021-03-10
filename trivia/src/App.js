import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import Join from "./Join";
import Host from "./Host";

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
  useEffect(addAlertUserListener, []);

  const [showJoinInput, setShowJoinInput] = useState(false);
  const [host, setHost] = useState(false);

  let ui = <>
    <Button variant="primary" onClick={() => setHost(true)}>Host</Button>{' '}
    <Button variant="secondary" onClick={() => setShowJoinInput(true)}>Join</Button>
  </>;
  if (showJoinInput) {
    ui = <>
      <Join />
    </>
  } else if (host) {
    ui = <>
      <Host />
    </>
  }
  return (
    <Container fluid="md" className={"pt-4"}>
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Header>Trivia Night</Card.Header>
            <Card.Body>
              {ui}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
