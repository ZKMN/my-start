import { takeLatest, put, call } from "redux-saga/effects";
import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import {
  createRequestActionTypes,
  createRequestAction,
  putActions,
  XHRMethod,
} from "utils";
import watchLastDeleteAction, { putSaga } from "./putSaga";

const PUT_ACTION = createRequestActionTypes(XHRMethod.Put, "ACTION", true);
const putRequest = createRequestAction(PUT_ACTION, "/put/:id/");

describe("putSaga", () => {
  describe("watchLastDeleteAction", () => {
    it("listens putSaga", () => {
      const gen = watchLastDeleteAction();

      expect(gen.next().value).toEqual(takeLatest(putActions, putSaga));
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

  describe("testing putSaga", () => {
    it("calls action.successCb", () => {
      const gen = putSaga(putRequest({ query: 10, routeParams: { id: 15 }, payload: { id: 10 } }));

      expect(gen.next().value).toEqual(call(apiClient.put, "/put/15/?query=10", { id: 10 }));

      expect(gen.next({ dataResponse: ["some data"] }).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: PUT_ACTION.SUCCESS,
            payload: { dataResponse: ["some data"] },
          },
        },
      });
    });

    it("fires error action if js error is thrown", () => {
      const gen = putSaga(putRequest({ query: 10, routeParams: { id: 15 }, payload: { id: 10 } }));

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
            type: PUT_ACTION.FAILURE,
            payload: {
              message: "Something went wrong",
            },
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

      const gen = putSaga(putRequest({ query: 10, routeParams: { id: 15 }, payload: { id: 10 } }));

      gen.next();

      expect(gen.throw(error).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: PUT_ACTION.FAILURE,
            payload: {
              response: {
                data: "some data",
              },
            },
          },
        },
      });
    });
  });
});
