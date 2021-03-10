import React, { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Row,
  Col,
} from "react-bootstrap";

import { randStringToUpperCase} from "../utils/random";
import { roomIdNumChars } from "../utils/constants";
import Scoreboard from "./Scoreboard";
import { HostPeer } from "../models/PeerJS";

let peer;

export default function Host(props) {
  const roomId = randStringToUpperCase(roomIdNumChars);
  const [members, setMembers] = useState([]);

  const broadcast = (obj) => {
    if (!obj) { return; }

    members.forEach(m => m.send(obj));
  };

  useEffect(() => {
    const disconnect = () => {
      if (peer) {
        peer.disconnect();
      }
    };
    window.addEventListener("beforeunload", disconnect);
    return () => {
      window.removeEventListener("beforeunload", disconnect);
    };
  })

  if (!peer) {
    const onConnectionOpened = (player) => {
      setMembers(prevState => [...prevState, player]);

      // Receive messages
      broadcast({ players: members.map(m => m.name) });
    }
    const onData = (data) => {
      console.log('Received', data);

    }
    peer = new HostPeer(roomId, onData, onConnectionOpened);
  }
  // const onClick = () => {
  //   broadcast(members.map(m => m.name).join(", "));
  // }

  function start() {
    console.log("START!");
  }

  return (
    <>
      <Row>
        <Col xs={12} md={8}>
          <h3>
            Starting room <Badge variant="secondary">{roomId}</Badge>
          </h3>
          <p>Others can join your room by going to <code>{window.location.origin}</code> and joining this Room ID</p>
          {members.length > 0 && <Button variant="primary" onClick={() => start()}>Start</Button>
          }
        </Col>
        <Col xs={12} md={4}>
          <div className="pt-2">
            <h5>{members.length > 0 ? "Scoreboard" : "Waiting for Players..."}</h5>
            {members.length > 0 && <Scoreboard players={members} />}
          </div>
        </Col>
      </Row>
    </>
  )
}
