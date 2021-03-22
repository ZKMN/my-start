import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

let wrapper: React.ReactElement;

const props = {
  component: () => 'some comp',
  path: '/',
};

describe('PrivateRoute', () => {
  beforeEach(() => {
    wrapper = shallow(<PrivateRoute {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('matches snapshot if isLoggedIn && commonDataLoaded && user && !user.hasFullAccess', () => {
    wrapper.setProps({
      user: { hasFullAccess: false },
      isLoggedIn: true,
      commonDataLoaded: true,
    });

    const result = wrapper
      .find(Route)
      .at(0)
      .props()
      .render({
        location: {},
        match: {},
        history: {},
      });

    expect(result).toMatchSnapshot();
  });

  it('matches snapshot if isLoggedIn && user && !commonDataLoaded', () => {
    wrapper.setProps({
      isLoggedIn: true,
      commonDataLoaded: false,
      user: { hasFullAccess: true },
    });

    const result = wrapper
      .find(Route)
      .at(0)
      .props()
      .render({
        location: {},
        match: {},
        history: {},
      });

    expect(result).toMatchSnapshot();
  });

  it('matches snapshot if !isLoggedIn && !user', () => {
    wrapper.setProps({
      isLoggedIn: false,
      user: null,
    });

    const result = wrapper
      .find(Route)
      .at(0)
      .props()
      .render({
        location: {},
        match: {},
        history: {},
      });

    expect(result).toMatchSnapshot();
  });
});
