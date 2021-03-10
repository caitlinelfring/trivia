import { useState } from 'react';
import {
  Col,
  Container,
  Row,
  Button,
  Card,
} from "react-bootstrap";


export default function QuestionView(props) {
  const { question, isHost } = props;

  const [selected, setSelected] = useState(null);
  const selectionVariant = (i) => {
    if (isHost) {
      return "secondary";
    }
    return selected === i ? "info" : "outline-secondary";
  }
  const clickHandler = (e) => setSelected(Number(e.target.id));

  return (
    <Container fluid>
      <Card>
        <Card.Body>
          <Card.Title className="pb-3">{question.question}</Card.Title>
          <Card.Text>
            <Row xs={1} lg={2} className="justify-content-center">
              <Col>
                {question.map((a, i) => (
                  <Button
                    variant={selectionVariant(i)}
                    size="lg"
                    disabled={!!selected}
                    key={i}
                    id={i}
                    onClick={isHost && clickHandler}
                    block
                    style={{ pointerEvents: isHost ? "none" : "auto" }}
                  >
                    {a}
                  </Button>
                ))}
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{question.category}</Card.Footer>
      </Card>
    </Container>
  )
}
