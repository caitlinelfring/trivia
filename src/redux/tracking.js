import { createMiddleware } from "redux-beacon";
import GoogleAnalytics, { trackEvent } from "@redux-beacon/google-analytics";
import logger from "@redux-beacon/logger"; // optional
import { SET_CATEGORY, SET_USER_TYPE } from "./constants";

// Match the event definition to a Redux action:
const eventsMap = {};
eventsMap[SET_USER_TYPE] = trackEvent(action => ({
  category: "User",
  action: action.payload.type,
}));
eventsMap[SET_CATEGORY] = trackEvent(action => ({
  category: "Category",
  action: "selected",
  label: action.category.name,
}));

// Create the middleware
const ga = GoogleAnalytics();
export const gaMiddleware = createMiddleware(eventsMap, ga, { logger });
