import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MainRoutes } from './MainRoutes';

let wrapper: any;

const props: any = {
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
