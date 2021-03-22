import { takeLatest, put, call } from "redux-saga/effects";
import apiClient from "api/apiClient";
import { showError } from "redux-base/actions";
import {
  createRequestActionTypes,
  createRequestAction,
  postActions,
  XHRMethod,
} from "utils";
import watchLastDeleteAction, { postSaga } from "./postSaga";

const POST_ACTION = createRequestActionTypes(XHRMethod.Post, "ACTION");
const postRequest = createRequestAction(POST_ACTION, "/post");

describe("postSaga", () => {
  describe("watchLastDeleteAction", () => {
    it("listens postSaga", () => {
      const gen = watchLastDeleteAction();

      expect(gen.next().value).toEqual(takeLatest(postActions, postSaga));
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

  describe("testing postSaga", () => {
    it("calls action.successCb", () => {
      const gen = postSaga(postRequest({ id: 10 }));

      expect(gen.next().value).toEqual(call(apiClient.post, "/post", { id: 10 }));

      expect(gen.next({ dataResponse: ["some data"] }).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: POST_ACTION.SUCCESS,
            payload: { dataResponse: ["some data"] },
            meta: undefined,
          },
        },
      });
    });

    it("fires error action if js error is thrown", () => {
      const gen = postSaga(postRequest({ id: 10 }));

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
            type: POST_ACTION.FAILURE,
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

      const gen = postSaga(postRequest({ id: 10 }));

      gen.next();

      expect(gen.throw(error).value).toEqual({
        "@@redux-saga/IO": true,
        combinator: false,
        type: "PUT",
        payload: {
          channel: undefined,
          action: {
            type: POST_ACTION.FAILURE,
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
