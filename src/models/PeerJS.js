// Relevant issues
// https://github.com/peers/peerjs/issues/608
// https://github.com/peers/peerjs/issues/671#issuecomment-657085176

import Peer from "peerjs";
import Player from "./Player";

const noop = () => { };

const peerConfig = (process.env.NODE_ENV === "production") ?
  // Use default peerjs server
  {} :
  // Use local peerjs server for local dev
  {
    host: "localhost",
    port: 9000,
    path: "/myapp",
    // debug: 3,
  };

export function HostPeer(roomId, onConnectionOpened = noop, onConnectionClosed = noop, onError = noop) {
  const peer = new Peer(roomId, peerConfig);
  peer.on("error", (err) => {
    console.error(err);
    console.error(err.type);
    onError(err);
  });

  peer.on("open", function (id) {
    console.log("My peer ID is: " + id);
    peer.on("connection", (conn) => {
      console.log(`peer connected: ${conn.peer} ${JSON.stringify(conn.metadata)}`);

      conn.on("destroy", () => {
        console.log(`conn destroyed: ${conn.peer} ${JSON.stringify(conn.metadata)}`);
      });

      conn.on("close", () => {
        console.log(`conn closed: ${conn.peer} ${JSON.stringify(conn.metadata)}`);
        onConnectionClosed(conn.connectionId);
      });

      conn.on("open", () => {
        console.log(`conn open: ${conn.peer} ${JSON.stringify(conn.metadata)}`);
        onConnectionOpened(new Player(conn, conn.metadata.name));
      });
    });
  });
  return peer;
}

export function PlayerPeer(roomId, metadata = {}, onData = noop, onConnected = noop, onClose = noop, onError = noop) {
  // hacky re-connect logic when the host disconnects
  let conn;
  const newConnection = (p) => {
    let retryTimeout;

    conn = p.connect(roomId, { metadata });

    conn.on("open", function () {
      console.log(`open connection, connected: ${conn.open}`);
      clearTimeout(retryTimeout);
      onConnected();

      conn.on("data", function (data) {
        console.log("Received", data);
        onData(data);
      });

      conn.on("close", () => {
        console.log("connection closed");
        newConnection(p);
        onClose();
      });
    });

    retryTimeout = setTimeout(() => {
      clearTimeout(retryTimeout);
      (conn && !conn.open) && newConnection(p);
    }, 2*1000); // TODO: expontential backoff
  };

  const peer = new Peer(sessionStorage.getItem("peer_id"), peerConfig);
  peer.on("error", (err) => {
    // https://peerjs.com/docs.html#peeron-error
    sessionStorage.removeItem("peer_id");
    onError(err);
  });

  peer.on("disconnected", () => {
    console.log("disconnected");
  });

  peer.on("open", function (id) {
    console.log("My peer ID is: " + id);
    sessionStorage.setItem("peer_id", id);
    newConnection(peer);
  });
  return peer;
}
