import { takeLatest, put, call } from "redux-saga/effects";
import { showError } from "redux-base/actions";
import apiClient from "api/apiClient";

import { IRequestAction, putActions, addParamsToURL } from "utils";

export function* putSaga(action: IRequestAction) {
  try {
    const url = addParamsToURL(action, action.endpoint);
    const response = yield call(apiClient.put, url, action.payload);

    yield put(action.successAction(response));
  } catch (error) {
    yield put(action.failureAction(error));
  }
}

export default function* watchLastPutAction() {
  try {
    yield takeLatest(putActions, putSaga);
  } catch (error) {
    yield put(showError(error));
  }
}
