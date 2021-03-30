import { SET_HOST, SET_PLAYER, SET_USER_TYPE, SET_CATEGORY } from "../constants";

const initialState = {
  host: sessionStorage.getItem("host_info"),
  player: sessionStorage.getItem("player_info"),
  user_type: null,
  category: null,
};

function rootReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_PLAYER:
      return {...state, player: action.player};
    case SET_HOST:
      return {...state, host: action.host};
    case SET_CATEGORY:
      return {...state, category: action.category};
    case SET_USER_TYPE:
      return {...state, user_type: action.user_type};
    default:
      console.warn(`no reducer found for action type: ${action.type}`);
      return state;
  }
}

export default rootReducer;
