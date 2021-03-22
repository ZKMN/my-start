import { ICreateRequestActionTypes } from "./createRequestActionTypes";

interface TActionCallbackResult {
  type: string;
  payload?: object;
  meta?: object;
}

interface IRequestPayload {
  payload?: any; 
  routeParams?: any;
  [key: string]: unknown; 
}

type TActionCallback = (
  successPayload: any,
  successMeta?: object,
) => TActionCallbackResult;

export interface IRequestAction {
  type: string;
  payload: any;
  endpoint: string;
  responseType?: string;
  queryParams?: Record<string, unknown>;
  routeParams?: Record<string, unknown>;
  failureAction: TActionCallback;
  successAction: TActionCallback;
}

export const createRequestAction = (
  actionType: ICreateRequestActionTypes,
  requestEndpoint: string,
  responseType?: string,
) => (
  requestPayload?: IRequestPayload,
) => {

  const { payload, routeParams, ...rest } = Object(requestPayload);

  const failureAction = (failurePayload: any) => ({
    type: actionType.FAILURE,
    payload: failurePayload,
  });
  const successAction = (successPayload: any) => ({
    type: actionType.SUCCESS,
    payload: successPayload,
  });

  const action: IRequestAction = {
    type: actionType.REQUEST,
    queryParams: { ...rest },
    routeParams,
    payload: requestPayload,
    endpoint: requestEndpoint,
    responseType,
    failureAction,
    successAction,
  };

  return action;
};
