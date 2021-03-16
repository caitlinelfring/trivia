import {
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import { random } from '../utils/random';

const placeholders = [
  "Moira Rose",
  "Johnny Rose",
  "David Rose",
  "Alexis Rose",
  "Stevie Budd",
  "Patrick Brewer",
  "Ted Mullens",
  "Roland Schitt",
  "Jocelyn Schitt",
];

const NameModal = ({show = false, onSubmit = () => { }, onClose = () => { }}) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    value.length > 0 && onSubmit(value);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>What's your name?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder={random(placeholders)} />
            </Form.Group>
            <div className={"mx-auto text-center"}>
              <Button type="submit">Join</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NameModal;
