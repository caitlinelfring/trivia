import React, { useState } from "react";
// import {
//   // BrowserRouter as Router,
//   HashRouter,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
//   useParams
// } from "react-router-dom";
// import {
//   Button,
//   Tooltip,
//   Grid,
//   Paper,
//   Input,
// } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCopy } from '@fortawesome/free-solid-svg-icons';

// import Peer from 'peerjs';

// import { randString } from "./random";

import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';
import Join from "./Join";

export default function App() {
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
      <Spinner animation="border" variant="primary" /><p>{`Hosting room TODO`}</p>
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
