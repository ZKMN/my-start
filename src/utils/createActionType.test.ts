import {
  XHRMethod,
  createActionType,
  RequestStatuses,
} from "utils";

describe("createActionType", () => {
  it("should return object with right action types with failure", () => {
    const TEST = createActionType("TEST", XHRMethod.Get, true);

    expect(TEST).toEqual({
      REQUEST: `TEST_${XHRMethod.Get}_${RequestStatuses.Request}`,
      SUCCESS: `TEST_${XHRMethod.Get}_${RequestStatuses.Success}`,
      FAILURE: `TEST_${XHRMethod.Get}_${RequestStatuses.Failure}`,
    });
  });

  it("should return object with right action types without failure", () => {
    const TEST = createActionType("TEST", XHRMethod.Get);

    expect(TEST).toEqual({
      REQUEST: `TEST_${XHRMethod.Get}_${RequestStatuses.Request}`,
      SUCCESS: `TEST_${XHRMethod.Get}_${RequestStatuses.Success}`,
    });
  });
});
