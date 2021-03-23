export enum RequestActionStatuses {
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
export interface ICreateRequestActionTypes {
  REQUEST: string;
  SUCCESS: string;
  FAILURE?: string;
}

export const createRequestActionType = (method: XHRMethod, actionName: string) => `${method}_${actionName}`;

export const createRequestActionTypes = (method: XHRMethod, actionName: string, addFailureType?: boolean) => {
  const actionTypes = {
    REQUEST: `${createRequestActionType(method, actionName)}_${RequestActionStatuses.Request}`,
    SUCCESS: `${createRequestActionType(method, actionName)}_${RequestActionStatuses.Success}`,
    ...(addFailureType && { FAILURE: `${createRequestActionType(method, actionName)}_${RequestActionStatuses.Failure}` }),
  }

  return actionTypes;
};
