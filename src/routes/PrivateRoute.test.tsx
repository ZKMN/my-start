import React from 'react';
import { shallow } from 'enzyme';
import { PrivateRoute } from './PrivateRoute';

let wrapper: any;

const props = {
  component: () => <div />,
  path: '/',
  isLoggedIn: false,
  user: {},
};

describe('PrivateRoute', () => {
  beforeEach(() => {
    wrapper = shallow(<PrivateRoute {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
