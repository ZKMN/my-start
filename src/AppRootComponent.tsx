import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { createBrowserHistory } from "history";
import { ConnectedRouter } from 'connected-react-router';

import { configureStore } from './redux-base/configureStore';
import { MainRoutes } from './routes/MainRoutes';

const history = createBrowserHistory();
const store = configureStore(history);

export type RootState = ReturnType<typeof store.getState>;

export const AppRootComponent = () => (
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
