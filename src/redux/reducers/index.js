import {
  SET_CATEGORY,
  SET_CATEGORIES,
  SET_QUESTIONS,
  SET_CURRENT_QUESTION,
} from "../constants";

import {combineReducers} from "redux";

import user from "./user";

const initialState = {
  category: null,
  categories: [],
  questions: [],
  current_question: null,
};

function base(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CATEGORY:
      return {...state, category: action.category};
    case SET_CATEGORIES:
      return {...state, categories: action.categories};
    case SET_QUESTIONS:
      return {...state, questions: action.questions};
    case SET_CURRENT_QUESTION:
      return {...state, current_question: action.current_question};
    default:
      console.warn(`no reducer found for action type: ${action.type}`);
      return state;
  }
}

const rootReducer = combineReducers({
    user,
    base,
});
export default rootReducer;
