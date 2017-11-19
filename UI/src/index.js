
// https://reacttraining.com/react-router/web/guides/quick-start
import { Redirect } from 'react-router'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import MainPage from './MainPage';
import Maintenance from './maintenance'
import LoginApp from './LoginApp'
import MaintenancePlanPage from './MaintenancePlanPage';
import CompleteCancelPage from './CompleteCancelPage';
import CreateUserPage from './CreateUserPage';
import EditUserPage from './EditUserPage';
import ProfileUserPage from './ProfileUserPage';
import AdminUserPage from './AdminUserPage';
import NoPagefound from './NoPagefound';

var jwt    = require('jsonwebtoken');



function isTokenExpired(){
  if (localStorage.getItem("token")){
    var decodedToken = jwt.decode(localStorage.getItem("token"));
    var dateNow = new Date();
    if(decodedToken.exp < dateNow.getTime())
      return false;
  }
  return true;
}

function isLoggedIn() {
  if (localStorage.getItem("token") == null || isTokenExpired())
    return false;
  return true;
}
class IndexApp extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path={'/'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <LoginApp />
                      )
                    )}/>
                    <Route path={'/login'} component={LoginApp}></Route>
                    <Route path={'/MainPage'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <MainPage />
                      )
                    )}/>
                    <Route path={'/MaintenancePlan'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <MaintenancePlanPage />
                      )
                    )}/>
                    <Route path={'/CompleteCancel'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <CompleteCancelPage />
                      )
                    )}/>
                    <Route path={'/CreateUser'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <CreateUserPage />
                      )
                    )}/>
                    <Route path={'/EditUser'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <EditUserPage />
                      )
                    )}/>
                    <Route path={'/UserProfile'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <ProfileUserPage />
                      )
                    )}/>
                    <Route path={'/AdminUser'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <AdminUserPage />
                      )
                    )}/>
                </div>
            </Router>
        );
    }
}

// ========================================

ReactDOM.render(
  <IndexApp />,
  document.getElementById('root')
);
