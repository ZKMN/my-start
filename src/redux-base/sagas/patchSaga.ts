import { takeLatest, put, call } from "redux-saga/effects";
import { showError } from "redux-base/actions";
import apiClient from "api/apiClient";

import { IRequestAction, patchActions, addParamsToURL } from "utils";

export function* patchSaga(action: IRequestAction) {
  try {
    const url = addParamsToURL(action);
    const response: unknown = yield call(apiClient.patch, url, action.payload);

    yield put(action.successCallback(response));
  } catch (error) {
    if (action.failureCallback) {
      yield put(action.failureCallback(error));
    } else {
      yield put(showError(error));
    }
  }
}

export default function* watchLastPatchAction() {
  try {
    yield takeLatest(patchActions, patchSaga);
  } catch (error) {
    yield put(showError(error));
  }
}
