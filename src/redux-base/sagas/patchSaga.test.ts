import { takeLatest, put, call } from "redux-saga/effects";
import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import {
  createRequestActionTypes,
  createRequestAction,
  patchActions,
  XHRMethod,
} from "utils";
import watchLastDeleteAction, { patchSaga } from "./patchSaga";

const PATCH_ACTION = createRequestActionTypes(XHRMethod.Patch, "ACTION");
const patchRequest = createRequestAction(PATCH_ACTION, "/patch");

describe("patchSaga", () => {
  describe("watchLastDeleteAction", () => {
    it("listens patchSaga", () => {
      const gen = watchLastDeleteAction();

      expect(gen.next().value).toEqual(takeLatest(patchActions, patchSaga));
    });

    it("throw error", () => {
      const error = {
        response: {
          data: "some data",
        },
      };

      const gen = watchLastDeleteAction();

      gen.next();

      expect(gen.throw(error).value).toEqual(put(showError(error)));
    });
  });

  describe("testing patchSaga", () => {
    it("calls action.successCb", () => {
      const gen = patchSaga(patchRequest({ id: 10 }));

      expect(gen.next().value).toEqual(call(apiClient.patch, "/patch", { id: 10 }));

      expect(gen.next({ dataResponse: ["some data"] }).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: PATCH_ACTION.SUCCESS,
            payload: { dataResponse: ["some data"] },
            meta: undefined,
          },
        },
      });
    });

    it("fires error action if js error is thrown", () => {
      const gen = patchSaga(patchRequest({ id: 10 }));

      gen.next();

      gen.next();

      expect(
        gen.throw({
          message: "Something went wrong",
        }).value,
      ).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: PATCH_ACTION.FAILURE,
            payload: {
              message: "Something went wrong",
            },
            meta: undefined,
          },
        },
      });
    });

    it("returns error when js error is thrown with response", () => {
      const error = {
        response: {
          data: "some data",
        },
      };

      const gen = patchSaga(patchRequest({ id: 10 }));

      gen.next();

      expect(gen.throw(error).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: PATCH_ACTION.FAILURE,
            payload: {
              response: {
                data: "some data",
              },
            },
            meta: undefined,
          },
        },
      });
    });
  });
});
