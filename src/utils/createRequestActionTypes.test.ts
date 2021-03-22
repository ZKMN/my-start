import {
  createRequestActionType,
  createRequestActionTypes,
  XHRMethod,
  RequestActionStatuses,
} from "./createRequestActionTypes";

describe("createRequestActionTypes", () => {
  it("should return object with right action types", () => {
    const requestActionTypesTest = createRequestActionTypes(XHRMethod.Get, "TEST");

    expect(requestActionTypesTest).toEqual({
      REQUEST: `${XHRMethod.Get}_TEST_${RequestActionStatuses.Request}`,
      SUCCESS: `${XHRMethod.Get}_TEST_${RequestActionStatuses.Success}`,
      FAILURE: `${XHRMethod.Get}_TEST_${RequestActionStatuses.Failure}`,
    });
  });
});

describe("createRequestActionType", () => {
  it("should return right action type", () => {
    const requestActionTypeTest = createRequestActionType(XHRMethod.Get, "TEST");

    expect(requestActionTypeTest).toEqual(`${XHRMethod.Get}_TEST`);
  });
});
