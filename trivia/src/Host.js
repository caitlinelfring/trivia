import React, { useState } from "react";

import {
  Badge,
} from "react-bootstrap";

import { randStringToUpperCase} from "./random";
import { roomIdNumChars } from "./constants";

export default function Host(props) {
  const roomId = randStringToUpperCase(roomIdNumChars);

  // const [id, setId] = useState("");
  // const handleChange = (e) => {
  //   const { value } = e.target
  //   setId(value.substring(0, 4).toUpperCase())
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (props.onSubmit) {
  //     props.onSubmit(id);
  //   }
  // };
  console.log(window.location);
  return (
    <>
      <h3>
        Starting room <Badge variant="secondary">{roomId}</Badge>
      </h3>
      <p>Others can join your room by going to <code>{window.location.origin}</code> and joining this Room ID</p>
    </>
  )
}
