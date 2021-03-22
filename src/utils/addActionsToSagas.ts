import { XHRMethod, ICreateRequestActionTypes } from "./createRequestActionTypes";

export const getActions = [] as string[];
export const postActions = [] as string[];
export const putActions = [] as string[];
export const patchActions = [] as string[];
export const deleteActions = [] as string[];
export const commonActions = [] as string[];

export const addActionsToSagas = (actionTypes: ICreateRequestActionTypes[]) => {
  actionTypes.forEach((actionType: ICreateRequestActionTypes) => {
    if (actionType.REQUEST.includes(XHRMethod.Get)) return getActions.push(actionType.REQUEST);
    if (actionType.REQUEST.includes(XHRMethod.Post)) return postActions.push(actionType.REQUEST);
    if (actionType.REQUEST.includes(XHRMethod.Put)) return putActions.push(actionType.REQUEST);
    if (actionType.REQUEST.includes(XHRMethod.Patch)) return patchActions.push(actionType.REQUEST);
    if (actionType.REQUEST.includes(XHRMethod.Delete)) return deleteActions.push(actionType.REQUEST);
    return null;
  });
};
