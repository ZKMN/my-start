import { takeLatest, put, call } from "redux-saga/effects";
import apiClient from "api/apiClient";

import { showError } from "redux-base/actions/commonFlow";

import { IRequestAction, deleteActions, addParamsToURL } from "utils";

export function* deleteSaga(action: IRequestAction) {
  try {
    const url = addParamsToURL(action, action.endpoint);
    const response = yield call(apiClient.delete, url, action.payload);

    yield put(action.successAction(response));
  } catch (error) {
    yield put(action.failureAction(error));
  }
}

export default function* watchLastDeleteAction() {
  try {
    yield takeLatest(deleteActions, deleteSaga);
  } catch (error) {
    yield put(showError(error));
  }
}
