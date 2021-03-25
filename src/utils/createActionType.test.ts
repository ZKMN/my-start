import {
  XHRMethod,
  createActionType,
  RequestStatuses,
} from "utils";

describe("createActionType", () => {
  it("should return object with right action types with failure", () => {
    const TEST = createActionType("TEST", XHRMethod.Get, true);

    expect(TEST).toEqual({
      REQUEST: `${XHRMethod.Get}_TEST_${RequestStatuses.Request}`,
      SUCCESS: `${XHRMethod.Get}_TEST_${RequestStatuses.Success}`,
      FAILURE: `${XHRMethod.Get}_TEST_${RequestStatuses.Failure}`,
    });
  });

  it("should return object with right action types withot failure", () => {
    const TEST = createActionType("TEST", XHRMethod.Get);

    expect(TEST).toEqual({
      REQUEST: `${XHRMethod.Get}_TEST_${RequestStatuses.Request}`,
      SUCCESS: `${XHRMethod.Get}_TEST_${RequestStatuses.Success}`,
    });
  });
});
