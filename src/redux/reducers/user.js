import {
  SET_USER_TYPE,
} from "../constants";

import {
  jsonParseSessionStorage,
} from "../../utils/helpers";

const initialState = {
  host: jsonParseSessionStorage("host_info"),
  player: jsonParseSessionStorage("player_info"),
  type: null,
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_TYPE:
      const { type, host, player } = action.payload;
      return {...state, type, host, player};
    default:
      return state;
  }
};

export default user;
