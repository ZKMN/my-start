import {
  createRequestAction,
  createActionType,
  XHRMethod,
} from "utils";

// ------------------------Action constants---------------
export const SOME_ACTION = createActionType("SOME_ACTION", XHRMethod.Get);

// ------------------------Action creators----------------
export const someActionGetRequest = createRequestAction(SOME_ACTION, "");