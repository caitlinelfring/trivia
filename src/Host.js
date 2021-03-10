import React, { useState } from "react";

import {
  Badge,
  ListGroup,
  Button,
} from "react-bootstrap";
import Peer from 'peerjs';

import { randStringToUpperCase} from "./random";
import { roomIdNumChars, peerConfig, errorAlert } from "./constants";
import Player from "./Player";

let peer;

export default function Host(props) {
  const roomId = randStringToUpperCase(roomIdNumChars);
  const [members, setMembers] = useState([]);

  const broadcast = (obj) => {
    if (!obj) { return; }
    members.forEach(m => m.send(obj));
  };

  if (!peer) {
    peer = new Peer(roomId, peerConfig);
    peer.on('error', errorAlert);
    peer.on('open', function (id) {
      console.log('My peer ID is: ' + id);
      peer.on('connection', (conn) => {
        console.log(`peer connected: ${conn.peer} ${JSON.stringify(conn.metadata)}`);
        conn.on('open', () => {
          const player = new Player(conn, conn.metadata.name);
          setMembers(prevState => [...prevState, player]);

          // Receive messages
          broadcast({players: members.map(m => m.name)});
          conn.on('data', function (data) {
            console.log('Received', data);
          });
        });
      });
    });
  }
  // const onClick = () => {
  //   broadcast(members.map(m => m.name).join(", "));
  // }

  const start = () => {
    console.log("START!");
  }

  return (
    <>
      <h3>
        Starting room <Badge variant="secondary">{roomId}</Badge>
      </h3>
      <p>Others can join your room by going to <code>{window.location.origin}</code> and joining this Room ID</p>
      {members.length > 0 && <Button variant="primary" onClick={() => start()}>Start</Button>
      }
      <hr />
      <div className="pt-2">
        <h5>{members.length > 0 ? "Players Ready" : "Waiting for Players..."}</h5>
      <ListGroup>
        {members.map((member, index) => (
          <ListGroup.Item key={index}>{member.name}</ListGroup.Item>
          ))}
      </ListGroup>
      </div>
    </>
  )
}
