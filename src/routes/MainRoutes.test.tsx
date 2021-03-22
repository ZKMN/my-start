import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MainRoutes } from './MainRoutes';

let wrapper: JSX.Element;

const props = {
  location: {},
  history: {},
  match: {},
};

describe('MainRoutes', () => {
  beforeEach(() => {
    wrapper = shallow(<MainRoutes {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
