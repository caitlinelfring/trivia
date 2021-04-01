import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./redux/reducers";

const reactDevTool = (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__)
  && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  reactDevTool,
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
