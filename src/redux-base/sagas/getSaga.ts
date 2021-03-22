import { takeLatest, put, call } from "redux-saga/effects";
import { showError } from "redux-base/actions";
import apiClient from "api/apiClient";

import { IRequestAction, getActions, addParamsToURL } from "utils";

export function* getSaga(action: IRequestAction) {
  try {
    const url = addParamsToURL(action, action.endpoint);
    const response = yield call(apiClient.get, url);

    yield put(action.successAction(response));
  } catch (error) {
    yield put(action.failureAction(error));
  }
}

export default function* watchLastGetAction() {
  try {
    yield takeLatest(getActions, getSaga);
  } catch (error) {
    yield put(showError(error));
  }
}
