import { SET_USER_TYPE } from "../constants";

import { roomIdNumChars } from "../../utils/helpers";
import { randStringToUpperCase } from "../../utils/random";

export const setPlayer = (player) => {
  if (!player) {
    player = JSON.parse(sessionStorage.getItem("player_info") || "{}");
  }
  sessionStorage.setItem("player_info", JSON.stringify(player));

  // sessionStorage.setItem(HOST_INFO, JSON.stringify({ roomId }));
  return { type: SET_USER_TYPE, payload: {type: "player", player: player} };
};

const HOST_INFO = "host_info";
export const setHost = (roomId) => {
  if (!roomId) {
    roomId = JSON.parse(sessionStorage.getItem(HOST_INFO) || "{}").roomId || randStringToUpperCase(roomIdNumChars);
  }
  sessionStorage.setItem(HOST_INFO, JSON.stringify({ roomId }));
  console.log({ type: SET_USER_TYPE, payload: {type: "host", host: { roomId }} });
  return { type: SET_USER_TYPE, payload: {type: "host", host: { roomId }} };
};
