import { takeLatest, put, call } from "redux-saga/effects";
import { showError } from "redux-base/actions";
import apiClient from "api/apiClient";

import { IRequestAction, putActions, addParamsToURL } from "utils";

export function* putSaga(action: IRequestAction) {
  try {
    const url = addParamsToURL(action);
    const response: unknown = yield call(apiClient.put, url, action.payload);

    yield put(action.successCallback(response));
  } catch (error) {
    if (action.failureCallback) {
      yield put(action.failureCallback(error));
    } else {
      yield put(showError(error));
    }
  }
}

export default function* watchLastPutAction() {
  try {
    yield takeLatest(putActions, putSaga);
  } catch (error) {
    yield put(showError(error));
  }
}
