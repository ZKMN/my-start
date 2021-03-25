import produce from "immer"
import {
  SOME_ACTION,

  SHOW_ERROR,
  RESET_REDUCER,
} from 'redux-base/actions';
import { IActionCallbackResult } from 'utils';

const INITIAL_STATE = {
  isLoading: false,
  someData: [],
};

const homePage = produce(
  (draft, action: IActionCallbackResult) => {
    switch (action.type) {
      case SOME_ACTION.REQUEST:
        draft.isLoading = true;
        break;
      case SOME_ACTION.SUCCESS:
        draft.isLoading = false;
        draft.someData = action.data.someData;
        break;
      case SHOW_ERROR:
        draft.isLoading = false;
        break;
      case RESET_REDUCER:
        return draft;
    }
  },
  INITIAL_STATE,
)

export default homePage;
