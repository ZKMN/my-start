import { takeLatest, put, call } from "redux-saga/effects";
import apiClient from "api/apiClient";

import { showError } from "redux-base/actions";

import { IRequestAction, deleteActions, addParamsToURL } from "utils";

export function* deleteSaga(action: IRequestAction) {
  try {
    const url = addParamsToURL(action);
    const response: unknown = yield call(apiClient.delete, url, action.payload);

    yield put(action.successCallback(response));
  } catch (error) {
    if (action.failureCallback) {
      yield put(action.failureCallback(error));
    } else {
      yield put(showError(error));
    }
  }
}

export default function* watchLastDeleteAction() {
  try {
    yield takeLatest(deleteActions, deleteSaga);
  } catch (error) {
    yield put(showError(error));
  }
}
