import { fork, put, all } from "redux-saga/effects";
import { showError } from "../actions/commonFlow";
import watchLastPutSagaAction from "./putSaga";
import watchLastPostSagaAction from "./postSaga";
import watchLastGetSagaAction from "./getSaga";
import watchLastDeleteSagaAction from "./deleteSaga";
import watchLastPatchSagaAction from "./patchSaga";

export default function* rootSaga() {
  try {
    yield all([
      fork(watchLastPutSagaAction),
      fork(watchLastPostSagaAction),
      fork(watchLastGetSagaAction),
      fork(watchLastDeleteSagaAction),
      fork(watchLastPatchSagaAction),
    ]);
  } catch (error) {
    yield put(showError(error));
  }
}
