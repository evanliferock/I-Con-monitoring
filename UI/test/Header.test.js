import React from 'react';
import Header from '../src/components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import { BrowserRouter, Redirect } from 'react-router-dom';
import jsonwebtoken from 'jsonwebtoken';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

jest.mock('jsonwebtoken');

test('Admin Header matches Snapshot', () => {
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const component = renderer.create(
    <MuiThemeProvider>
    <Header title={"Test"}/>
    </MuiThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Non Admin Header matches Snapshot', () => {
  jsonwebtoken.decode.mockReturnValue({admin:false});
  const component = renderer.create(
    <MuiThemeProvider>
    <Header title={"Test"}/>
    </MuiThemeProvider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Admin Header and Non Admin Header are differnt', () => {
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const admin = renderer.create(
    <MuiThemeProvider>
    <Header title={"Test"}/>
    </MuiThemeProvider>
  );
  let admin_tree = admin.toJSON();
  jsonwebtoken.decode.mockReturnValue({admin:false});
  const non_admin = renderer.create(
    <MuiThemeProvider>
    <Header title={"Test"}/>
    </MuiThemeProvider>
  );
  let non_admin_tree = non_admin.toJSON();
  expect(admin_tree).not.toEqual(non_admin_tree);
});

test('Complete Cancel top button redirects properly', () => {
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const header = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  header.find('#ccbutton').simulate('click');
  expect(window.location.pathname).toEqual('/CompleteCancel');
});

test('Upcoming top button redirects properly', () => {
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const header = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  header.find('#upcombutton').simulate('click');
  expect(window.location.pathname).toEqual('/UpcomingMaintenance');
});

test('Planning top button redirects properly', () => {
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const header = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  header.find('#planbutton').simulate('click');
  expect(window.location.pathname).toEqual('/MaintenancePlan');
});

// Can't seem to get access to MenuItems to check functionality :/
// test('Main Page menu button redirects properly', () => {
//   jsonwebtoken.decode.mockReturnValue({admin:true});
//   const header = mount(
//       <MuiThemeProvider>
//         <Header title={"Test"}/>
//       </MuiThemeProvider>
//   );
//   header.find(IconMenu).simulate('click');
//   console.log(JSON.stringify(header.find(IconMenu).children()));
//   //header.find(MenuItem).simulate('click');
//   //console.log(header.find(MenuItem));
//   expect(window.location.pathname).toEqual('/MainPage');
// });

function clickChecker(check,url){
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const header = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  header.find(check).simulate('click');
  expect(window.location.pathname).toEqual(url);
}
