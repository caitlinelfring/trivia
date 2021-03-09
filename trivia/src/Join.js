import React, { useState } from "react";
import {
  Spinner,
  Badge,
} from "react-bootstrap";
import JoinInput from "./JoinInput";

function Join(props) {
  const [state, setState] = useState({
    roomId: "",
    name: ""
  })

  if (state.roomId === "" || state.name === "") {
    return <JoinInput onSubmit={setState} />
  }
  return (
    <>
      <Spinner animation="border" variant="primary" />
      <p>Joining room <Badge variant="secondary">{state.roomId}</Badge> {`as ${state.name}`}</p>
    </>
  );
}

export default Join;
