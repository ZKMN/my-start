import { takeLatest, put, call } from "redux-saga/effects";
import { showError } from "redux-base/actions";
import apiClient from "api/apiClient";

import { IRequestAction, postActions, addParamsToURL } from "utils";

export function* postSaga(action: IRequestAction) {
  try {
    const url = addParamsToURL(action, action.endpoint);
    const response = yield call(apiClient.post, url, action.payload);

    yield put(action.successAction(response));
  } catch (error) {
    yield put(action.failureAction(error));
  }
}

export default function* watchLastPostAction() {
  try {
    yield takeLatest(postActions, postSaga);
  } catch (error) {
    yield put(showError(error));
  }
}
