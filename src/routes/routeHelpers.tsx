import React from 'react';
import {
  Route,
  RouteProps,
  RouteComponentProps, 
} from 'react-router-dom';

import ConnectedPrivateRoute from './PrivateRoute';
import { Login } from 'containers';
import Links from 'links';

export const routesConfig = {
  privateRoutes: [],
  publicRoutes: [{
    path: '/',
    component: Login,
  }, {
    path: Links.Login,
    component: Login,
  }],
};

export interface IAppRoute extends RouteProps {
  component: React.FC<RouteComponentProps>;
  path: string;
}

export const getPublicRoutes = (routes: IAppRoute[]) => routes.map(({ path, component }: IAppRoute) => (
  <Route
    exact
    key={path}
    path={path}
    component={component}
  />
));

export const getPrivateRoutes = (routes: IAppRoute[]) => routes.map(({ path, component }: IAppRoute) => (
  <ConnectedPrivateRoute
    exact
    key={path}
    path={path}
    component={component}
  />
));
