import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import { IAppRoute } from './routeHelpers';
import { RootState } from 'AppRootComponent';

import Links from 'links';

interface IPrivateRoute extends IAppRoute {
  isLoggedIn: boolean;
  user: Record<string, unknown>;
}

export const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  user,
  path,
  ...rest
}: IPrivateRoute) => (
  <Route
    {...rest}
    path={path}
    render={({
      location,
      match,
      history,
    }) => {
      if (!isLoggedIn && !user) {
        // not loggedIn - redirect to login page
        return (
          <Redirect
            to={{
              pathname: Links.Login,
              state: { redirectFrom: location.pathname },
            }}
          />
        );
      }

      return (
        <Component
          key={location.key} // leave key for update component when you click on same link in navigaton
          location={location}
          match={match}
          history={history}
        />
      );
    }}
  />
);

export default connect((state: RootState) => ({
  isLoggedIn: true,
  user: {},
}))(PrivateRoute);
