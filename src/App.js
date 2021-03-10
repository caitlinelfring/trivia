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
import QuestionView from "./components/QuestionView";
import {getQuestions} from "./models/Manager";

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
  const [questions, setQuestions] = useState(null);

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

  useEffect(() => {
    getQuestions(2).then(setQuestions);
  }, []);
  // console.log(questions.results[0]);
  return (
  <>
    <Container fluid="md" className={"pt-4"}>
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Header>Trivia Night</Card.Header>
            <Card.Body>
              {/* {ui} */}
              {(questions && questions.length > 0) &&
                <QuestionView question={questions[0]} isHost={true} />
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  )
}
