import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { createBrowserHistory } from "history";
import { ConnectedRouter } from 'connected-react-router';
import { configureStore } from './redux-base/configureStore';
import { MainRoutes } from './routes/MainRoutes';

export const history = createBrowserHistory();
export const store = configureStore(history);

const AppRootComponent = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route
        render={({ location, history, match }) => (
          <MainRoutes
            location={location}
            history={history}
            match={match}
          />
        )}
      />
    </ConnectedRouter>
  </Provider>
);

export default AppRootComponent;
