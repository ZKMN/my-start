import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AppRootComponent from './AppRootComponent';

let wrapper: any;

describe('AppRootComponent', () => {
  beforeEach(() => {
    wrapper = shallow(<AppRootComponent />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
