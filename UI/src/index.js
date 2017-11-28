
// https://reacttraining.com/react-router/web/guides/quick-start
import { Redirect, Switch } from 'react-router'
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
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
import jwt from 'jsonwebtoken';
import './stylesheets/index.css';


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
class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                <Route path={"/login"} component={LoginPage}/>
                    <Route path={'/'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to={"/login"}/>
                      ) : (
                        <div>
                          <Route exact path={"/MainPage"} component={MainPage}/>
                          <Route path={"/MaintenancePlan"} component={MaintenancePlanPage}/>
                          <Route path={"/CompleteCancel"} component={CompleteCancelPage}/>
                          <Route path={"/CreateUser"} component={CreateUserPage}/>
                          <Route path={"/EditUser"} component={EditUserPage}/>
                          <Route path={"/UserProfile"} component={ProfileUserPage}/>
                          <Route path={"/AdminUser"} component={AdminUserPage}/>
                          <Route component={NoPagefound}/>
                        </div>
                      )
                    )}/>
                </Switch>
            </Router>
        );
    }
}


ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,

  document.getElementById('root')
);
