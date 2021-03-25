import produce from "immer"
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  SHOW_ERROR,

  RESET_REDUCER,
} from 'redux-base/actions';
import { IActionCallbackResult } from 'utils';

interface IState {
  error: any;
}

const INITIAL_STATE: IState = { error: [] };

const error = produce(
  (draft: IState, action: IActionCallbackResult) => {
    switch (action.type) {
      case SHOW_ERROR:
        draft.error = action.data;
        break;
      case LOCATION_CHANGE:
      case RESET_REDUCER:
        return draft;
    }
  }, 
  INITIAL_STATE,
)

export default error;
