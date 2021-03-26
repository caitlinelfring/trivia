import { SET_ROOM_ID } from "../constants";

const initialState = {
  roomId: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOM_ID:
      return {...state, roomId: action.roomId};
    default:
      return state;
  }
}

export default rootReducer;
