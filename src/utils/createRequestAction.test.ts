import {
  XHRMethod,
  createActionType,
  createRequestAction, 
} from "utils";

describe("createRequestAction", () => {
  it("should return function", () => {
    const requestActionTypes = createActionType(XHRMethod.Get, "TEST");
    const requestAction = createRequestAction(requestActionTypes, "/test");

    expect(typeof requestAction).toEqual("function");
  });

  it("should return action with payload", () => {
    const requestActionTypes = createActionType(XHRMethod.Get, "TEST");
    const requestActionCreator = createRequestAction(requestActionTypes, "/test");
    const { successCallback, payload, type } = requestActionCreator({ payload: { id: 1 } });

    expect(type).toEqual("GET_TEST_REQUEST");
    expect(payload).toEqual({ id: 1 });

    const success = successCallback({ test: "test" });

    expect(success).toEqual({
      type: "GET_TEST_SUCCESS",
      data: { test: "test" },
    });
  });
});
