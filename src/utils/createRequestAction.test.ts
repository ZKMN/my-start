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

  it("should return action with payload", () => {
    const requestActionTypes = createRequestActionTypes(XHRMethod.Get, "TEST");
    const requestActionCreator = createRequestAction(requestActionTypes, "/test");
    const { successCallback, payload, type } = requestActionCreator(undefined);

    expect(type).toEqual("GET_TEST_REQUEST");
    expect(payload).toEqual(undefined);

    const success = successCallback({ test: "test" });

    expect(success).toEqual({
      type: "GET_TEST_SUCCESS",
      payload: { test: "test" },
    });
  });
});
