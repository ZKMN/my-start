import {
  XHRMethod,
  createActionType,
  createRequestAction, 
} from "utils";

describe("createRequestAction", () => {
  it("should return function", () => {
    const TEST = createActionType("TEST", XHRMethod.Get);
    const requestAction = createRequestAction(TEST, "/test");

    expect(typeof requestAction).toEqual("function");
  });

  it("should return action with payload", () => {
    const TEST = createActionType("TEST", XHRMethod.Get);
    const requestActionCreator = createRequestAction(TEST, "/test");
    const { successCallback, payload, type } = requestActionCreator({ payload: { id: 1 } });

    expect(type).toEqual(TEST.REQUEST);
    expect(payload).toEqual({ id: 1 });

    const success = successCallback({ test: "test" });

    expect(success).toEqual({
      type: TEST.SUCCESS,
      data: { test: "test" },
    });
  });
});
