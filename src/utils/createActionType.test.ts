import {
  XHRMethod,
  createActionType,
  RequestStatuses,
} from "utils";

describe("createActionType", () => {
  it("should return object with right action types with failure", () => {
    const requestActionTypesTest = createActionType(XHRMethod.Get, "TEST", true);

    expect(requestActionTypesTest).toEqual({
      REQUEST: `${XHRMethod.Get}_TEST_${RequestStatuses.Request}`,
      SUCCESS: `${XHRMethod.Get}_TEST_${RequestStatuses.Success}`,
      FAILURE: `${XHRMethod.Get}_TEST_${RequestStatuses.Failure}`,
    });
  });

  it("should return object with right action types withot failure", () => {
    const requestActionTypesTest = createActionType(XHRMethod.Get, "TEST");

    expect(requestActionTypesTest).toEqual({
      REQUEST: `${XHRMethod.Get}_TEST_${RequestStatuses.Request}`,
      SUCCESS: `${XHRMethod.Get}_TEST_${RequestStatuses.Success}`,
    });
  });
});
