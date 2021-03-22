import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { BrowserHistory } from "history";
import homePageReducer from "./homePage";

const createRootReducer = (history: BrowserHistory) => combineReducers({
  router: connectRouter(history),
  homePageReducer,
});

export default createRootReducer;
