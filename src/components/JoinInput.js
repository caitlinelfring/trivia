import React, { useState } from "react";
import {Form, Button} from "react-bootstrap";
import { roomIdNumChars } from "../utils/constants";
import { randString } from "../utils/random";

export default function JoinInput(props) {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  // const [roomIdIsInvalid, setRoomIdIsInvalid] = useState(false);

  // const roomIsValid = (e) => e.length === roomIdNumChars;
  const handleRoomChange = (e) => {
    const { value } = e.target;
    // setRoomIdIsInvalid(false);
    setRoomId(value.substring(0, roomIdNumChars).toUpperCase());
  }

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (!roomIsValid(roomId)) {
    //   setRoomIdIsInvalid(true);
    //   return;
    // }
    console.log(`Submitting name: ${name}, roomId: ${roomId}`);
    if (props.onSubmit) {
      // props.onSubmit({roomId: roomId, name: name});
      props.onSubmit({roomId: "XYZH", name: randString(5)});
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label>Game ID</Form.Label>

      <Form.Control
        // required
        // isInvalid={!!roomIdIsInvalid}
        id="roomId"
        type="text"
        placeholder="XXXX"
        style={{ textTransform: "uppercase" }}
        maxLength={roomIdNumChars}
        onChange={handleRoomChange}
      />
      <Form.Control.Feedback type="invalid">
        {`Game ID should be ${roomIdNumChars} characters.`}
      </Form.Control.Feedback>
    </Form.Group>
      <Form.Group>
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          // required
          id="name"
          type="text"
          placeholder="Moira Rose"
          maxLength="20"
          onChange={handleNameChange}
        />
      </Form.Group>
      <Button type="submit">Join</Button>
    </Form>
  )
}
