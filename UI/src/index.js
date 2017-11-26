
// https://reacttraining.com/react-router/web/guides/quick-start
import { Redirect, Switch } from 'react-router'
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import MainPage from './pages/MainPage';
import Loginscreen from './pages/Loginscreen';
import MaintenancePlanPage from './pages/MaintenancePlanPage';
import CompleteCancelPage from './pages/CompleteCancelPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';
import ProfileUserPage from './pages/ProfileUserPage';
import AdminUserPage from './pages/AdminUserPage';
import NoPagefound from './pages/NoPagefound';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import jwt from 'jsonwebtoken';


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
    // return false;
    return true;
  return true;
}

class IndexApp extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={'/'} render={() => (
            !isLoggedIn() ? (
              <Redirect to="/login" />
            ) : (
                <Loginscreen />
              )
          )} />
          <Route path={'/login'} component={Loginscreen} />
          <Route path={'/MainPage'} render={() => (
            !isLoggedIn() ? (
              <Redirect to="/login" />
            ) : (
                <MainPage />
              )
          )} />
          <Route path={'/MaintenancePlan'} render={() => (
            !isLoggedIn() ? (
              <Redirect to="/login" />
            ) : (
                <MaintenancePlanPage />
              )
          )} />
          <Route path={'/CompleteCancel'} render={() => (
            !isLoggedIn() ? (
              <Redirect to="/login" />
            ) : (
                <CompleteCancelPage />
              )
          )} />
          <Route path={'/CreateUser'} render={() => (
            !isLoggedIn() ? (
              <Redirect to="/login" />
            ) : (
                <CreateUserPage />
              )
          )} />
          <Route path={'/EditUser'} render={() => (
            !isLoggedIn() ? (
              <Redirect to="/login" />
            ) : (
                <EditUserPage />
              )
          )} />
          <Route path={'/UserProfile'} render={() => (
            !isLoggedIn() ? (
              <Redirect to="/login" />
            ) : (
                <ProfileUserPage />
              )
          )} />
          <Route path={'/AdminUser'} render={() => (
            !isLoggedIn() ? (
              <Redirect to="/login" />
            ) : (
                <AdminUserPage />
              )
          )} />
          <Route component={NoPagefound}/>
        </Switch>
      </Router>
    );
  }
}

// ========================================

ReactDOM.render(
  <MuiThemeProvider>
    <IndexApp />
  </MuiThemeProvider>,

  document.getElementById('root')
);
