import { takeLatest, put, call } from "redux-saga/effects";
import { showError } from "redux-base/actions";
import apiClient from "api/apiClient";

import { IRequestAction, postActions, addParamsToURL } from "utils";

export function* postSaga(action: IRequestAction) {
  try {
    const url = addParamsToURL(action);
    const response: unknown = yield call(apiClient.post, url, action.payload);

    yield put(action.successCallback(response));
  } catch (error) {
    if (action.failureCallback) {
      yield put(action.failureCallback(error));
    } else {
      yield put(showError(error));
    }
  }
}

export default function* watchLastPostAction() {
  try {
    yield takeLatest(postActions, postSaga);
  } catch (error) {
    yield put(showError(error));
  }
}
