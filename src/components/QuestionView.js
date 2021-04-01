import { useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
} from "react-bootstrap";


export default function QuestionView(props) {
  const { question, isHost = false, onSelected = () => {}} = props;

  const [selected, setSelected] = useState(null);
  const selectionVariant = (i) => {
    if (isHost) {
      return "secondary";
    }
    return selected === i ? "info" : "outline-secondary";
  };
  const clickHandler = (e) => {
    setSelected(Number(e.target.id));
    onSelected(Number(e.target.id));
  };

  return (
    <Container fluid>
      <Card>
        <Card.Header>{question.category}</Card.Header>
        <Card.Body>
          <Card.Title className="pb-3">{question.question}</Card.Title>
          <Row xs={1} lg={2} className="justify-content-center">
            <Col>
              {question.answers.map((a, i) => (
                <Button
                  variant={selectionVariant(i)}
                  size="lg"
                  disabled={!!selected}
                  key={a}
                  id={i}
                  onClick={clickHandler}
                  block
                  style={{ pointerEvents: isHost ? "none" : "auto" }}
                >
                  {a}
                </Button>
              ))}
            </Col>
          </Row>
        </Card.Body>
        {isHost && <Card.Footer className="text-muted blockquote-footer">This is a read-only view of the question for the host</Card.Footer>}
      </Card>
    </Container>
  );
}
