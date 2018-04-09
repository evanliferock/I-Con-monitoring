import React from 'react';
import AdminUserPage from '../src/pages/AdminUserPage';
import {shallow, mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PATHS from '../src/global/paths';

test('Create User button redirects properly', () => {
    const page = mount(
        <MuiThemeProvider>
            <AdminUserPage/>
        </MuiThemeProvider>
    );
    page.find('#create_user_button').simulate('click');
    expect(window.location.pathname).toBe(PATHS.ADMIN_PATHS.CREATE_USER);
});

test('Edit User button redirects properly', () => {
    const page = mount(
        <MuiThemeProvider>
            <AdminUserPage/>
        </MuiThemeProvider>
    );
    page.find('#edit_user_button').simulate('click');
    expect(window.location.pathname).toBe(PATHS.ADMIN_PATHS.EDIT_USER);
});
