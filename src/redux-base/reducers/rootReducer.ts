import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { BrowserHistory } from "history";
import homePage from "./homePage";
import error from "./error";

const rootReducer = (history: BrowserHistory) => combineReducers({
  router: connectRouter(history),
  homePage,
  error,
});

export default rootReducer;
