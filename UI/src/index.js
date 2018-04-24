
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
import NotValidPermissionsPage from './pages/NotValidPermissionsPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import jwt from 'jsonwebtoken';
import PATHS from './global/paths';
import './stylesheets/index.css';

// Defines the material-ui theme
const muiTheme = getMuiTheme({
  palette:{
    // Sets the material-ui primary theme color (purple)
    primary1Color:"#6441A4",
    primary2Color: "#6441A4",
    primary3Color: "#6441A4",
  
    pickerHeaderColor: "#6441A4",
   
  }
});


 // localStorage.removeItem("token");

 // Checks if the users token is expired, if not return false, if it is return true
 // It will log the user out if it is expired
function isTokenExpired() {
  if (localStorage.getItem("token")) {
    var decodedToken = jwt.decode(localStorage.getItem("token"));
    var dateNow = new Date();
    if (decodedToken.exp >  dateNow.getTime()   / 1000 ) // Times a user out after certain amount of time logged in
      return false;
  }
  return true;
}

// Checks if the user is currently logged in with a non-expired token
function isLoggedIn() {
  if (localStorage.getItem("token") == null || isTokenExpired())
    return false; // User is not logged in
  return true;  // User is logged in
}

class AdminPages extends React.Component {
  render(){
    // Checks if the user has an admin token and normal token
    if(localStorage.getItem('token') && jwt.decode(localStorage.getItem('token')).admin){
      return(
        // Admin only pages routing if the user has an admin token
        <Switch>
          <Route path={PATHS.ADMIN_PATHS.ADMIN} component={AdminUserPage} />
          <Route path={PATHS.ADMIN_PATHS.CREATE_USER} component={CreateUserPage} />
          <Route path={PATHS.ADMIN_PATHS.EDIT_USER} component={EditUserPage} />
        </Switch>
      );
    } else {
      // If the user is not an admin, it will deny them access and re-route them
      let defaultResponseComponent = NotValidPermissionsPage;
      return(
        <Switch>
          <Route path={PATHS.ADMIN_PATHS.ADMIN} component={defaultResponseComponent} />
          <Route path={PATHS.ADMIN_PATHS.CREATE_USER} component={defaultResponseComponent} />
          <Route path={PATHS.ADMIN_PATHS.EDIT_USER} component={defaultResponseComponent} />
        </Switch>
      );
    }
  }
}

class App extends React.Component {
  render() {
    return (
      // Routing system
      <BrowserRouter>
        <Switch>
          <Route path={PATHS.LOGIN} render={() => (
            !isLoggedIn() ? (
              <LoginPage />   // If a user is not logged in, redirect to login page
            ) : (
              <Redirect to={PATHS.MAIN} />    // Otherwise redirects to main page
            )
          )} />
          <Route path={'/'} render={() => (
            !isLoggedIn() ? (
              <Redirect to={PATHS.LOGIN} />   // If a user is not logged in, redirect to login page
            ) : (
                // Else it will allow the user to re-route to the desired page
                // // Admin pages are still only accessible with an admin token
                <Switch>
                  <Route exact path={PATHS.MAIN_MATCHING} component={MainPage} />
                  <Route path={PATHS.PLAN} component={MaintenancePlanPage} />
                  <Route path={PATHS.COMPLETE_CANCEL} component={CompleteCancelPage} />
                  <Route path={PATHS.PROFILE} component={ProfileUserPage} />
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


// The ReactDOM will render the web application with material-ui theme applied
ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,

  document.getElementById('root')
);
