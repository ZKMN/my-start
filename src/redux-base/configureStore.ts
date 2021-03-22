import {
  createStore, applyMiddleware,
} from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "react-router-redux";
import { BrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootSaga from "./sagas/rootSaga";
import createRootReducer from "./reducers/rootReducer";

export const configureStore = (history: BrowserHistory) => {
  const sagaMiddleware = createSagaMiddleware();
  const reduxRouterMiddleware = routerMiddleware(history);
  const rootReducer = createRootReducer(history);
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        reduxRouterMiddleware,
        sagaMiddleware,
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
