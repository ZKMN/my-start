import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { BrowserHistory } from "history";
import homePageReducer from "./homePage";

export interface IApplicationState {
  router: RouterState;
}

const createRootReducer = (history: BrowserHistory) => combineReducers({
  router: connectRouter(history),
  homePageReducer,
});

export default createRootReducer;
