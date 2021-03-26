import React, { useState } from "react";
import {
  Form,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { SET_ROOM_ID } from "../redux/constants";

import { roomIdNumChars } from "../utils/helpers";
import NameModal from "./NameModal";

const JoinInput = ({ onSubmit = () => {}}) => {
  const [roomId, setRoomId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [roomIdIsInvalid, setRoomIdIsInvalid] = useState(false);
  console.log(useSelector(state => state.roomId));

  const dispatch = useDispatch();

  const roomIsValid = (e) => e.length === roomIdNumChars;
  const handleInputChangeRoom = (e) => {
    const { value } = e.target;
    setRoomIdIsInvalid(false);
    setRoomId(value.substring(0, roomIdNumChars).toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomIsValid(roomId)) {
      setRoomIdIsInvalid(true);
      return;
    }
    setShowModal(true);
    dispatch({ type: SET_ROOM_ID, roomId });
  };

  const handleNameSubmit = (name) => {
    setShowModal(false);
    console.log(`Submitting name: ${name}, roomId: ${roomId}`);
    onSubmit({ roomId, name });
    sessionStorage.setItem("roomInfo", JSON.stringify({ roomId, name }));
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Game ID</Form.Label>

          <Form.Control
            required
            isInvalid={!!roomIdIsInvalid}
            id="roomId"
            type="text"
            placeholder="XXXX"
            className="mx-auto"
            style={{textTransform: "uppercase", width: "7ch", fontSize: "4em", letterSpacing: "0.1em", textAlign: "center"}}
            maxLength={roomIdNumChars}
            onChange={handleInputChangeRoom}
          />
          <Form.Control.Feedback type="invalid">
            {`Game ID should be ${roomIdNumChars} characters.`}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Join</Button>
      </Form>
      <NameModal show={showModal} onSubmit={handleNameSubmit} onClose={() => setShowModal(false)}/>
    </>
  );
};
export default JoinInput;
