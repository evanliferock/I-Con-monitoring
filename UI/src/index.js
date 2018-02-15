
// https://reacttraining.com/react-router/web/guides/quick-start
import { Redirect, Switch } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import MaintenancePlanPage from './pages/MaintenancePlanPage';
import CompleteCancelPage from './pages/CompleteCancelPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';
import ProfileUserPage from './pages/ProfileUserPage';
import AdminUserPage from './pages/AdminUserPage';
import NoPagefound from './pages/NoPagefound';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotValidPermissionsPage from './pages/NotValidPermissionsPage';
import jwt from 'jsonwebtoken';
import './stylesheets/index.css';

// localStorage.removeItem("token");

function isTokenExpired() {
  if (localStorage.getItem("token")) {
    var decodedToken = jwt.decode(localStorage.getItem("token"));
    var dateNow = new Date();
    if (decodedToken.exp < dateNow.getTime())
      return false;
  }
  return true;
}


function isLoggedIn() {
  if (localStorage.getItem("token") == null || isTokenExpired())
    return false;
  return true;
}

class AdminPages extends React.Component {
  render(){
    if(localStorage.getItem('token') && jwt.decode(localStorage.getItem('token')).admin){
      return(
        <Switch>
          <Route path={"/AdminUser"} component={AdminUserPage} />
          <Route path={"/CreateUser"} component={CreateUserPage} />
          <Route path={"/EditUser"} component={EditUserPage} />
        </Switch>
      );
    } else {
      let defaultResponseComponent = NotValidPermissionsPage;
      return(
        <Switch>
          <Route path={"/AdminUser"} component={defaultResponseComponent} />
          <Route path={"/CreateUser"} component={defaultResponseComponent} />
          <Route path={"/EditUser"} component={defaultResponseComponent} />
        </Switch>
      );
    }
  }
}


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={"/Login"} render={() => (
            !isLoggedIn() ? (
              <LoginPage />
            ) : (
              <Redirect to={"/MainPage"} />
            )
          )} />
          <Route path={'/'} render={() => (
            !isLoggedIn() ? (
              <Redirect to={"/Login"} />
            ) : (
                <Switch>
                  <Route exact path={"/(|MainPage)"} component={MainPage} />
                  <Route path={"/MaintenancePlan"} component={MaintenancePlanPage} />
                  <Route path={"/CompleteCancel"} component={CompleteCancelPage} />
                  <Route path={"/UserProfile"} component={ProfileUserPage} />
                  <AdminPages/>
                  <Route component={NoPagefound} />
                </Switch>
              )
          )} />
        </Switch>
      </BrowserRouter>
    );
  }
}


ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,

  document.getElementById('root')
);
