import {
  createRequestAction,
  createActionType,
  XHRMethod,
} from "utils";

// ------------------------Action constants---------------
export const SOME_ACTION = createActionType(XHRMethod.Get, "SOME_ACTION");

// ------------------------Action creators----------------
export const someActionGetRequest = createRequestAction(SOME_ACTION, "");