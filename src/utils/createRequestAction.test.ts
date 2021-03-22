import { createRequestAction } from "./createRequestAction";
import {
  createRequestActionTypes,
  XHRMethod,
} from "./createRequestActionTypes";

describe("createRequestAction", () => {
  it("should return function", () => {
    const requestActionTypes = createRequestActionTypes(XHRMethod.Get, "TEST");
    const requestAction = createRequestAction(requestActionTypes, "/test");

    expect(typeof requestAction).toEqual("function");
  });

  it("should return action with request meta", () => {
    const requestActionTypes = createRequestActionTypes(XHRMethod.Get, "TEST");
    const requestActionCreator = createRequestAction(requestActionTypes, "/test");
    const { failureAction, successAction, payload, type } = requestActionCreator(undefined);

    expect(type).toEqual("GET_TEST_REQUEST");
    expect(payload).toEqual(undefined);

    const success = successAction({ test: "test" });

    expect(success).toEqual({
      type: "GET_TEST_SUCCESS",
      payload: { test: "test" },
    });

    const failure = failureAction({ test: "failure" });

    expect(failure).toEqual({
      type: "GET_TEST_FAILURE",
      payload: { test: "failure" },
    });
  });
});
