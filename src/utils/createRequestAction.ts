import { StringifiableRecord } from "query-string";
import { addActionToSagas, createActionType } from "utils";

export interface IActionCallbackResult {
  type: string | undefined;
  data: any;
}

interface IRequestPayload {
  payload?: Record<string, unknown>; 
  routeParams?: Record<string, unknown>;
  [key: string]: unknown; 
}

export interface IRequestAction {
  type: string | undefined;
  payload: Record<string, unknown>;
  endpoint: string;
  responseType?: string;
  queryParams?: StringifiableRecord;
  routeParams?: Record<string, unknown>;
  successCallback: (response: unknown) => IActionCallbackResult;
  failureCallback?: (response: unknown) => IActionCallbackResult;
}

export const createRequestAction = (
  actionType: ReturnType<typeof createActionType>,
  endpoint: string,
  responseType?: string,
) => (
  requestPayload?: IRequestPayload,
): IRequestAction => {

  const { payload, routeParams, ...rest } = Object(requestPayload);

  addActionToSagas(actionType);

  const failureCallback = (response: unknown) => ({
    type: actionType.FAILURE,
    data: response,
  });
  const successCallback = (response: unknown) => ({
    type: actionType.SUCCESS,
    data: response,
  });

  const action: IRequestAction = { 
    type: actionType.REQUEST,
    queryParams: { ...rest },
    routeParams,
    payload,
    endpoint,
    responseType,
    successCallback,
    ...(actionType.FAILURE && { failureCallback }), 
  };

  return action;
};
