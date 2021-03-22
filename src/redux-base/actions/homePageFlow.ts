import {
  createRequestAction,
  createRequestActionTypes,
  addActionsToSagas,
  XHRMethod,
} from "utils";

// ------------------------Action constants---------------
export const SOME_ACTION = createRequestActionTypes(XHRMethod.Get, "SOME_ACTION");

// ------------------------Action creators----------------
export const someActionPostRequest = createRequestAction(SOME_ACTION, "");

addActionsToSagas([
  SOME_ACTION,
]);
