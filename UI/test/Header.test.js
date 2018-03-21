import React from 'react';
import Header from '../src/components/Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';
import jsonwebtoken from 'jsonwebtoken';

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
