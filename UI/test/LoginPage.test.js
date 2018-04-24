import LoginPage from '../src/pages/LoginPage';
import React from 'react';
import {shallow, mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import dbapi from '../src/apirequests/dbapi';
import PATHS from '../src/global/paths';
import Alert from 'react-s-alert';

jest.mock('../src/apirequests/dbapi');
jest.mock('react-s-alert');

beforeEach(() => {
    localStorage.clear();
    dbapi.post= jest.fn();
    dbapi.defaults={headers:{}};
});

test('Login Page logs in successfully', async () => {
    Alert.success = jest.fn();
    let the_token ='test token';
    let the_refresh_token = 'test refresh token';
    let response = Promise.resolve({
        status: 201,
        data:{
            token:the_token,
            refresh_token:the_refresh_token,
        },
    });
    dbapi.post.mockReturnValue(response);
    const page = mount(
        <MuiThemeProvider>
            <LoginPage/>
        </MuiThemeProvider>
    );
    
    let username = 'unit';
    let password = 'test';
    page.find({hintText:"Enter your username"}).props().onChange('change',username);
    page.find({hintText:"Enter your password"}).props().onChange('change',password);
    page.find('#loginbutton').simulate('click');

    await response;
    expect(dbapi.post.mock.calls.length).toBe(1);
    expect(dbapi.post.mock.calls[0][1])
        .toEqual({
            "username": username,
            "password": password,
        });
    expect(Alert.success).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.__STORE__['token']).toBe(the_token);
    expect(localStorage.__STORE__['refresh_token']).toBe(the_refresh_token);
    expect(dbapi.defaults.headers.token).toBe(the_token);
    expect(window.location.pathname).toBe(PATHS.MAIN);
});

test('Login Page handles error properly', async () => {
    Alert.warning = jest.fn();
    let response = Promise.reject({
        response:{status: 401,},
    });
    dbapi.post.mockReturnValue(response);
    const page = mount(
        <MuiThemeProvider>
            <LoginPage/>
        </MuiThemeProvider>
    );
    
    page.find('#loginbutton').simulate('click');
    try{
        await response;
    } catch (e){}
    expect(dbapi.post.mock.calls.length).toBe(1);
    expect(Alert.warning).toHaveBeenCalledTimes(1);
});
