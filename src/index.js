import React from "react";
import { render } from "react-dom";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";

import "./index.css";
import App from "./App";
import { gaMiddleware } from "./redux/tracking";
import reportWebVitals from "./reportWebVitals";

const reactDevTool = (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__)
  && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  reactDevTool,
  applyMiddleware(gaMiddleware),
);

Sentry.init({
  dsn: "https://400b3d8320a34a5581033ea92e0a0285@o208232.ingest.sentry.io/5711082",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

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
