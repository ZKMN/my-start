export enum RequestStatuses {
  Request = "REQUEST",
  Success = "SUCCESS",
  Failure = "FAILURE",
}
export enum XHRMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
}

export const createActionType = (
  method: XHRMethod,
  actionName: string,
  addFailureType?: boolean,
) => {
  const actionTypes = {
    REQUEST: `${method}_${actionName}_${RequestStatuses.Request}`,
    SUCCESS: `${method}_${actionName}_${RequestStatuses.Success}`,
    ...(addFailureType && { FAILURE: `${method}_${actionName}_${RequestStatuses.Failure}` }),
  }

  return actionTypes;
};
