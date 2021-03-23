import { takeLatest, put, call } from "redux-saga/effects";
import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import {
  createRequestActionTypes,
  createRequestAction,
  getActions,
  XHRMethod,
} from "utils";
import watchLastDeleteAction, { getSaga } from "./getSaga";

const GET_ACTIONS = createRequestActionTypes(XHRMethod.Get, "ACTION", true);
const getRequest = createRequestAction(GET_ACTIONS, "/get");

describe("getSaga", () => {
  describe("watchLastDeleteAction", () => {
    it("listens getSaga", () => {
      const gen = watchLastDeleteAction();

      expect(gen.next().value).toEqual(takeLatest(getActions, getSaga));
    });

    it("throw error", () => {
      const error = { response: { data: "some data" } };

      const gen = watchLastDeleteAction();

      gen.next();

      expect(gen.throw(error).value).toEqual(put(showError(error)));
    });
  });

  describe("testing getSaga", () => {
    it("calls action.successCb", () => {
      const gen = getSaga(getRequest());

      expect(gen.next().value).toEqual(
        call(apiClient.get, "/get"),
      );

      expect(gen.next({ dataResponse: ["some data"] }).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: GET_ACTIONS.SUCCESS,
            payload: { dataResponse: ["some data"] },
            meta: undefined,
          },
        },
      });
    });

    it("fires error action if js error is thrown", () => {
      const gen = getSaga(getRequest({ id: 10 }));

      gen.next();

      gen.next();

      expect(
        gen.throw({ message: "Something went wrong" }).value,
      ).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: GET_ACTIONS.FAILURE,
            payload: { message: "Something went wrong" },
            meta: undefined,
          },
        },
      });
    });

    it("returns error when js error is thrown with response", () => {
      const error = { response: { data: "some data" } };

      const gen = getSaga(getRequest({ id: 10 }));

      gen.next();

      expect(gen.throw(error).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: GET_ACTIONS.FAILURE,
            payload: { response: { data: "some data" } },
            meta: undefined,
          },
        },
      });
    });
  });
});
