// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

Object.defineProperty(window.location, 'pathname', {
    writable: true,
    value: 'some url'
  });
  