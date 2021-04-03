import { SET_USER_TYPE } from "../constants";

import { jsonParseSessionStorage, roomIdNumChars } from "../../utils/helpers";
import { randStringToUpperCase } from "../../utils/random";

export const setPlayer = (player) => {
  if (!player) {
    player = jsonParseSessionStorage("player_info");
  }
  sessionStorage.setItem("player_info", JSON.stringify(player));
  return { type: SET_USER_TYPE, payload: {type: "player", player: player} };
};

export const setHost = (roomId) => {
  if (!roomId) {
    const fromStorage = jsonParseSessionStorage("host_info");
    roomId = (fromStorage && fromStorage.roomId) ?
      fromStorage.roomId :
      randStringToUpperCase(roomIdNumChars);
  }
  sessionStorage.setItem("host_info", JSON.stringify({ roomId }));
  return { type: SET_USER_TYPE, payload: {type: "host", host: { roomId }} };
};
