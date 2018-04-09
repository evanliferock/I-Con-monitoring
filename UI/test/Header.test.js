import React from 'react';
import Header from '../src/components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import jsonwebtoken from 'jsonwebtoken';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import PATHS from '../src/global/paths';
import NAMES from '../src/global/page_names';

jest.mock('jsonwebtoken');

beforeEach(() => {
  localStorage.clear();
  window.location.pathname = "/";
});

test('Non_admin header has 6 menu items', () => {
  jsonwebtoken.decode.mockReturnValue({admin:false});
  const non_admin = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  non_admin.find(Drawer).simulate('click');
  expect(non_admin.find(MenuItem).length).toBe(6);
});

test('Admin header to have one more item than non admin header', ()=>{
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const admin = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  jsonwebtoken.decode.mockReturnValue({admin:false});
  const non_admin = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  admin.find(Drawer).simulate('click');
  non_admin.find(Drawer).simulate('click');
  expect(admin.find(MenuItem).length).toBe(non_admin.find(MenuItem).length + 1);
});

test('Complete Cancel top button redirects properly', () => {
  buttonClickChecker('#ccbutton', PATHS.COMPLETE_CANCEL);
});

test('Upcoming top button redirects properly', () => {
  buttonClickChecker('#upcombutton', PATHS.UPCOMING);
});

test('Planning top button redirects properly', () => {
  buttonClickChecker('#planbutton', PATHS.PLAN);
});

function buttonClickChecker(check,url){
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const header = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  header.find(check).simulate('click');
  expect(window.location.pathname).toEqual(url);
}

test('Main Page menu button redirects properly', () => {
  menuClickChecker('#main_menu_item', PATHS.MAIN)
});

test('Plan page menu button redirects properly', () =>{
  menuClickChecker('#plan_menu_item', PATHS.PLAN);
});

test('Upcoming page menu button redirects properly', () =>{
  menuClickChecker('#upcoming_menu_item', PATHS.UPCOMING);
});

test('Complete Cancel page menu button redirects properly', () =>{
  menuClickChecker('#cc_menu_item', PATHS.COMPLETE_CANCEL);
});

test('Profile page menu button redirects properly', () =>{
  menuClickChecker('#profile_menu_item', PATHS.PROFILE);
});

test('Admin page menu button redirects properly', () =>{
  menuClickChecker('#admin_menu_item', PATHS.ADMIN_PATHS.ADMIN);
});

test('Sign out menu button logs out', () =>{
  menuClickChecker('#sign_out_menu_item', PATHS.LOGIN);
  expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
});

function menuClickChecker(check,url){
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const header = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  header.find(Drawer).simulate('click');
  header.find(check).last().simulate('click');
  expect(window.location.pathname).toEqual(url);
}
