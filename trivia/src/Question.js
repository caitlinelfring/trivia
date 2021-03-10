import {
  Col,
  Container,
  Row,
  Button,
} from "react-bootstrap";

export default function Question(props) {
  const { question, answers } = props;
  const clickHandler = (e) => {
    console.log(e.target.id);
  }
  return (
    <>
      <Container fluid>
        <h2 className="pb-3">{question}</h2>
        <Row xs={1} lg={2} className="justify-content-center">
          <Col>
            {answers.map((a, i) => (
              <Button
                variant="outline-secondary"
                size="lg"
                key={i}
                id={i}
                onClick={clickHandler}
                block
              >
                {a}
              </Button>
            ))}
          </Col>
          </Row>
      </Container>
    </>
  )
}
