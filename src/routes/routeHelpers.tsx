import React from 'react';
import { Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import ConnectedPrivateRoute from './PrivateRoute';
import { Pathnames } from 'links';
import {} from 'containers';

export const routesConfig = {
  privateRoutes: [{
    path: '/',
    component: () => <div />,
  }],
  publicRoutes: [{
    path: '/',
    component: () => <div />,
  }, {
    path: Pathnames.Login,
    component: () => <div />,
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
