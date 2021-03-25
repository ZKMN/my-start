import { takeLatest, put, call } from "redux-saga/effects";
import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import {
  createActionType,
  createRequestAction,
  postActions,
  XHRMethod,
} from "utils";
import watchLastDeleteAction, { postSaga } from "./postSaga";

const POST_ACTION = createActionType("ACTION", XHRMethod.Post, true);
const postRequest = createRequestAction(POST_ACTION, "/post/:id/");

describe("postSaga", () => {
  describe("watchLastDeleteAction", () => {
    it("listens postSaga", () => {
      const gen = watchLastDeleteAction();

      expect(gen.next().value).toEqual(takeLatest(postActions, postSaga));
    });

    it("throw error", () => {
      const error = { response: { data: "some data" } };

      const gen = watchLastDeleteAction();

      gen.next();

      expect(gen.throw(error).value).toEqual(put(showError(error)));
    });
  });

  describe("testing postSaga", () => {
    it("calls action.successCb", () => {
      const gen = postSaga(postRequest({ query: 10, routeParams: { id: 15 }, payload: { id: 10 } }));

      expect(gen.next().value).toEqual(call(apiClient.post, "/post/15/?query=10", { id: 10 }));

      const response = {
        data: ['some data'],
        status: 200,
        statusText: 'ok',
        headers: {},
        config: {}, 
      };

      expect(gen.next(response).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: POST_ACTION.SUCCESS,
            data: response,
          },
        },
      });
    });

    it("fires error action if js error is thrown", () => {
      const gen = postSaga(postRequest({ query: 10, routeParams: { id: 15 }, payload: { id: 10 } }));

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
            type: POST_ACTION.FAILURE,
            data: { message: "Something went wrong" },
          },
        },
      });
    });

    it("returns error when js error is thrown with response", () => {
      const error = { response: { data: "some data" } };

      const gen = postSaga(postRequest({ query: 10, routeParams: { id: 15 }, payload: { id: 10 } }));

      gen.next();

      expect(gen.throw(error).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: POST_ACTION.FAILURE,
            data: { response: { data: "some data" } },
          },
        },
      });
    });
  });
});
