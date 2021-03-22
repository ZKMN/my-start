import React from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import ConnectedPrivateRoute from './PrivateRoute';
import { Pathnames } from 'links';
import {} from 'containers';

export const routesConfig = {
  privateRoutes: [{
    path: '/',
    key: '/',
    component: () => <div />,
  }],
  publicRoutes: [{
    path: '/',
    key: '/',
    component: () => <div />,
  }, {
    path: Pathnames.Login,
    key: Pathnames.Login,
    component: () => <div />,
  }],
};


interface IRouter extends RouteProps {
  key?: React.Key;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const getPublicRoutes = (routes: IRouter[]) => routes.map(({ path, component, key }: IRouter) => (
  <Route
    exact
    key={key}
    path={path}
    component={component}
  />
));

export const getPrivateRoutes = (routes: IRouter[]) => routes.map(({ path, component, key }: IRouter) => (
  <ConnectedPrivateRoute
    exact
    key={key}
    path={path}
    component={component}
  />
));
