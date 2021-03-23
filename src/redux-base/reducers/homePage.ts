import {
  SOME_ACTION,

  RESET_REDUCER,
} from 'redux-base/actions';
import { IRequestAction } from 'utils';

const initialState = { isLoading: false };

const homePageReducer = (state = initialState, action: IRequestAction) => {
  switch (action.type) {
    case SOME_ACTION.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SOME_ACTION.SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case RESET_REDUCER:
      return state;
    default:
      return state;
  }
};

export default homePageReducer;
