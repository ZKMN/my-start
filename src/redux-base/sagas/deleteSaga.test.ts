import { takeLatest, put, call } from "redux-saga/effects";
import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import {
  createRequestActionTypes,
  createRequestAction,
  deleteActions,
  XHRMethod,
} from "utils";
import watchLastDeleteAction, { deleteSaga } from "./deleteSaga";

const DELETE_ACTION = createRequestActionTypes(XHRMethod.Delete, "ACTION");
const deleteRequest = createRequestAction(DELETE_ACTION, "/delete");

describe("deleteSaga", () => {
  describe("watchLastDeleteAction", () => {
    it("listens deleteSaga", () => {
      const gen = watchLastDeleteAction();

      expect(gen.next().value).toEqual(takeLatest(deleteActions, deleteSaga));
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

  describe("testing deleteSaga", () => {
    it("calls action.successCb", () => {
      const gen = deleteSaga(deleteRequest({ id: 10 }));

      expect(gen.next().value).toEqual(call(apiClient.delete, "/delete", { id: 10 }));

      expect(gen.next({ dataResponse: ["some data"] }).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: DELETE_ACTION.SUCCESS,
            payload: { dataResponse: ["some data"] },
            meta: undefined,
          },
        },
      });
    });

    it("fires error action if js error is thrown", () => {
      const gen = deleteSaga(deleteRequest({ id: 10 }));

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
            type: DELETE_ACTION.FAILURE,
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

      const gen = deleteSaga(deleteRequest({ id: 10 }));

      gen.next();

      expect(gen.throw(error).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: DELETE_ACTION.FAILURE,
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
