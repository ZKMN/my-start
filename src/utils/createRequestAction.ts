import { ICreateRequestActionTypes } from "./createRequestActionTypes";
import { StringifiableRecord } from 'query-string';

interface TActionCallbackResult {
  type: string | undefined;
  payload?: Record<string, unknown>;
}

interface IRequestPayload {
  payload?: any; 
  routeParams?: any;
  [key: string]: unknown; 
}

type TActionCallback = (payload: any) => TActionCallbackResult;

export interface IRequestAction {
  type: string | undefined;
  payload: Record<string, unknown>;
  endpoint: string;
  responseType?: string;
  queryParams?: StringifiableRecord;
  routeParams?: Record<string, unknown>;
  successCallback: TActionCallback;
  failureCallback?: TActionCallback;
}

export const createRequestAction = (
  actionType: ICreateRequestActionTypes,
  requestEndpoint: string,
  responseType?: string,
) => (
  requestPayload?: IRequestPayload,
): IRequestAction => {

  const { payload, routeParams, ...rest } = Object(requestPayload);

  const failureCallback = (payload: any) => ({
    type: actionType.FAILURE,
    payload,
  });
  const successCallback = (payload: any) => ({
    type: actionType.SUCCESS,
    payload,
  });

  const action: IRequestAction = {
    type: actionType.REQUEST,
    queryParams: { ...rest },
    routeParams,
    payload,
    endpoint: requestEndpoint,
    responseType,
    successCallback,
    ...(actionType.FAILURE && { failureCallback }),
  };

  return action;
};
