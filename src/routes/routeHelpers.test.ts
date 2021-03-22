import {
  routesConfig,
  getPublicRoutes,
  getPrivateRoutes,
} from './routeHelpers';

describe('routeHelpers', () => {
  it('matches snapshot routesConfig', () => {
    expect(routesConfig).toMatchSnapshot();
  });

  it('testing getPublicRoutes', () => {
    const result = getPublicRoutes([{
      path: '/sessionLimit',
      component: 'SessionLimit',
    }]);

    expect(result).toMatchSnapshot();
  });

  it('testing getPrivateRoutes', () => {
    const result = getPrivateRoutes([{
      path: '/profile',
      component: 'Profile',
    }]);

    expect(result).toMatchSnapshot();
  });
});
