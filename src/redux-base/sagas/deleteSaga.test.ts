import { takeLatest, put, call } from 'redux-saga/effects';
import apiClient from 'api/apiClient';
import { showError } from 'redux-base/actions';
import {
  createActionType,
  createRequestAction,
  deleteActions,
  XHRMethod,
} from 'utils';
import watchLastDeleteAction, { deleteSaga } from './deleteSaga';

const DELETE_ACTION = createActionType('ACTION', XHRMethod.Delete, true);
const deleteRequest = createRequestAction(DELETE_ACTION, '/delete/:id/');

describe('deleteSaga', () => {
  describe('watchLastDeleteAction', () => {
    it('listens deleteSaga', () => {
      const gen = watchLastDeleteAction();

      expect(gen.next().value).toEqual(takeLatest(deleteActions, deleteSaga));
    });

    it('throw error', () => {
      const error = { response: { data: 'some data' } };

      const gen = watchLastDeleteAction();

      gen.next();

      expect(gen.throw(error).value).toEqual(put(showError(error)));
    });
  });

  describe('testing deleteSaga', () => {
    it('calls action.successCb', () => {
      const gen = deleteSaga(deleteRequest({ query: 10, routeParams: { id: 15 }, payload: { id: 10 } }));

      expect(gen.next().value).toEqual(call(apiClient.delete, '/delete/15/?query=10', { id: 10 }));

      const response = {
        data: ['some data'],
        status: 200,
        statusText: 'ok',
        headers: {},
        config: {}, 
      };
      
      expect(gen.next(response).value).toEqual({
        '@@redux-saga/IO': true,
        combinator: false,
        type: 'PUT',
        payload: {
          channel: undefined,
          action: {
            type: DELETE_ACTION.SUCCESS,
            data: response,
          },
        },
      });
    });

    it('fires error action if js error is thrown', () => {
      const gen = deleteSaga(deleteRequest({ routeParams: { id: 15 }, id: 10 }));

      gen.next();

      gen.next();

      expect(
        gen.throw({ message: 'Something went wrong' }).value,
      ).toEqual({
        '@@redux-saga/IO': true,
        combinator: false,
        type: 'PUT',
        payload: {
          channel: undefined,
          action: {
            type: DELETE_ACTION.FAILURE,
            data: { message: 'Something went wrong' },
          },
        },
      });
    });

    it('returns error when js error is thrown with response', () => {
      const error = { response: { data: 'some data' } };

      const gen = deleteSaga(deleteRequest({ routeParams: { id: 15 }, id: 10 }));

      gen.next();

      expect(gen.throw(error).value).toEqual({
        '@@redux-saga/IO': true,
        combinator: false,
        type: 'PUT',
        payload: {
          channel: undefined,
          action: {
            type: DELETE_ACTION.FAILURE,
            data: { response: { data: 'some data' } },
          },
        },
      });
    });
  });
});
