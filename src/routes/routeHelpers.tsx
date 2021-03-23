import React from 'react';
import {
  Route,
  RouteProps,
  RouteComponentProps, 
} from 'react-router-dom';

import ConnectedPrivateRoute from './PrivateRoute';
import {} from 'containers';
import { Pathnames } from 'links';

export const routesConfig = {
  privateRoutes: [],
  publicRoutes: [{
    path: '/',
    component: () => <div>Login page</div>,
  }, {
    path: Pathnames.Login,
    component: () => <div>Login page</div>,
  }],
};

interface IRouter extends RouteProps {
  path: string;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const getPublicRoutes = (routes: IRouter[]) => routes.map(({ path, component }: IRouter) => (
  <Route
    exact
    key={path}
    path={path}
    component={component}
  />
));

export const getPrivateRoutes = (routes: IRouter[]) => routes.map(({ path, component }: IRouter) => (
  <ConnectedPrivateRoute
    exact
    key={path}
    path={path}
    component={component}
  />
));
