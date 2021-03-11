import Peer from 'peerjs';

import { errorAlert } from "../utils/constants";
import Player from "./Player";

const noop = () => { };

let peerConfig = {
  host: 'localhost',
  port: 9000,
  path: '/myapp',
  debug: 3,
};
if (process.env.NODE_ENV === "production") {
  // TODO: host my own
  peerConfig = {
    host: 'peerjs.92k.de',
    port: 443,
    secure: true,
    config: {
      'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
        { url: 'stun:stun1.l.google.com:19302' },
        { url: 'stun:stun2.l.google.com:19302' },
        { url: 'stun:stun3.l.google.com:19302' },
        { url: 'stun:stun4.l.google.com:19302' }
      ]
    },
    debug: 3,
  };
}

export function HostPeer(roomId, onData = noop, onConnectionOpened = noop) {
  const peer = new Peer(roomId, peerConfig);
  peer.on('error', (err) => {
    console.error(err.type);
    errorAlert(err);
  });
  peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    peer.on('connection', (conn) => {
      console.log(`peer connected: ${conn.peer} ${JSON.stringify(conn.metadata)}`);
      conn.on('destroy', () => {
        console.log(`peer destroyed: ${conn.peer} ${JSON.stringify(conn.metadata)}`);
      });
      conn.on('open', () => {
        const player = new Player(conn, conn.metadata.name);

        onConnectionOpened(player);
        conn.on('data', function (data) {
          console.log('Received', data);
          onData(data);
        });
      });
    });
  });
  return peer;
}

export function PlayerPeer(roomId, metadata = {}, onData = noop, onConnected = noop, onClose = noop) {
  // hacky re-connect logic when the host disconnects
  const newConnection = (p) => {
    let conn;
    conn = p.connect(roomId, { metadata });
    conn.on('open', function () {
      console.log(`open connection, connected: ${conn.open}`);
      onConnected();
      // Receive messages
      conn.on('data', function (data) {
        console.log('Received', data);
        onData(data);
      });
      conn.on('close', () => {
        console.log("connection closed");
        conn = newConnection(p);
        onClose();
      });
      conn.send('Hello!');
    });
    return conn;
  };

  const peer = new Peer(peerConfig);
  peer.on('error', (err) => {
    errorAlert(err);
  });

  peer.on('disconnected', () => {
    console.log("disconnected");
  });

  peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    newConnection(peer);
  });
  return peer;
}
