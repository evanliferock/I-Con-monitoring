
// https://reacttraining.com/react-router/web/guides/quick-start
import { Redirect, Switch } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import MaintenancePlanPage from './pages/MaintenancePlanPage';
import UpcomingMaintenancePage from './pages/UpcomingMaintenancePage';
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

const muiTheme = getMuiTheme({
  palette:{
    primary1Color:"#6441A4",
   
    primary2Color: "#6441A4",
    primary3Color: "#6441A4",
  
    pickerHeaderColor: "#6441A4",
   
  }
});


 // localStorage.removeItem("token");

function isTokenExpired() {
  if (localStorage.getItem("token")) {
    var decodedToken = jwt.decode(localStorage.getItem("token"));
    var dateNow = new Date();
    if (decodedToken.exp >  dateNow.getTime()   / 1000 )
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
          <Route path={PATHS.ADMIN_PATHS.ADMIN} component={AdminUserPage} />
          <Route path={PATHS.ADMIN_PATHS.CREATE_USER} component={CreateUserPage} />
          <Route path={PATHS.ADMIN_PATHS.EDIT_USER} component={EditUserPage} />
        </Switch>
      );
    } else {
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
      <BrowserRouter>
        <Switch>
          <Route path={PATHS.LOGIN} render={() => (
            !isLoggedIn() ? (
              <LoginPage />
            ) : (
              <Redirect to={PATHS.MAIN} />
            )
          )} />
          <Route path={'/'} render={() => (
            !isLoggedIn() ? (
              <Redirect to={PATHS.LOGIN} />
            ) : (
                <Switch>
                  <Route exact path={PATHS.MAIN_MATCHING} component={MainPage} />
                  <Route path={PATHS.PLAN} component={MaintenancePlanPage} />
                  <Route path={PATHS.UPCOMING} component={UpcomingMaintenancePage} />
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



ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,

  document.getElementById('root')
);
