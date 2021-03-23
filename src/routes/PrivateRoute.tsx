import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Pathnames } from 'links';

interface IPrivateRoute extends RouteProps {
  isLoggedIn?: boolean;
  user?: Record<string, unknown>;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
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
              pathname: Pathnames.Login,
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

export default connect(state => ({}))(PrivateRoute);
