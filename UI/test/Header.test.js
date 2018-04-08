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

// // Snapshot testing blocked by buttonEl.blur (I believe this comes from our crazy theme files)
// test('Admin Header matches Snapshot', () => {
//   jsonwebtoken.decode.mockReturnValue({admin:true});
//   const component = renderer.create(
//     <MuiThemeProvider>
//     <Header title={"Test"}/>
//     </MuiThemeProvider>
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('Non Admin Header matches Snapshot', () => {
//   jsonwebtoken.decode.mockReturnValue({admin:false});
//   const component = renderer.create(
//     <MuiThemeProvider>
//     <Header title={"Test"}/>
//     </MuiThemeProvider>
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('Admin Header and Non Admin Header are differnt', () => {
//   jsonwebtoken.decode.mockReturnValue({admin:true});
//   const admin = renderer.create(
//     <MuiThemeProvider>
//     <Header title={"Test"}/>
//     </MuiThemeProvider>
//   );
//   let admin_tree = admin.toJSON();
//   jsonwebtoken.decode.mockReturnValue({admin:false});
//   const non_admin = renderer.create(
//     <MuiThemeProvider>
//     <Header title={"Test"}/>
//     </MuiThemeProvider>
//   );
//   let non_admin_tree = non_admin.toJSON();
//   expect(admin_tree).not.toEqual(non_admin_tree);
// });

test('Complete Cancel top button redirects properly', () => {
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const header = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  header.find('#ccbutton').simulate('click');
  expect(window.location.pathname).toEqual(PATHS.COMPLETE_CANCEL);
});

test('Upcoming top button redirects properly', () => {
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const header = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  header.find('#upcombutton').simulate('click');
  expect(window.location.pathname).toEqual(PATHS.UPCOMING);
});

test('Planning top button redirects properly', () => {
  jsonwebtoken.decode.mockReturnValue({admin:true});
  const header = mount(
      <MuiThemeProvider>
        <Header title={"Test"}/>
      </MuiThemeProvider>
  );
  header.find('#planbutton').simulate('click');
  expect(window.location.pathname).toEqual(PATHS.PLAN);
});

// // Can't seem to get access a single MenuItem to check functionality :/ .first()
// test('Main Page menu button redirects properly', () => {
//   jsonwebtoken.decode.mockReturnValue({admin:true});
//   const header = mount(
//       <MuiThemeProvider>
//         <Header title={"Test"}/>
//       </MuiThemeProvider>
//   );
//   header.find(Drawer).simulate('click');
//   // console.log(header.find({primaryText:NAMES.MAIN}))
//   header.find('#main_menu_item').find('[primaryText='+NAMES.MAIN}).simulate('click');
//   expect(window.location.pathname).toEqual(PATHS.MAIN);
// });

// function clickChecker(check,url){
//   jsonwebtoken.decode.mockReturnValue({admin:true});
//   const header = mount(
//       <MuiThemeProvider>
//         <Header title={"Test"}/>
//       </MuiThemeProvider>
//   );
//   header.find(check).simulate('click');
//   expect(window.location.pathname).toEqual(url);
// }
