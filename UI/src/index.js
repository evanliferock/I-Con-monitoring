
// https://reacttraining.com/react-router/web/guides/quick-start
import { Redirect, Switch } from 'react-router'
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import About from './about';
import Game from './game';
import MainPage from './main';
import Maintenance from './maintenance'
import LoginApp from './LoginApp'
import './index.css';
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
class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                <Route path={"/login"} component={LoginApp}/>
                    <Route path={'/'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to={"/login"}/>
                      ) : (
                        <div>
                          <Route exact path={"/"} component={MainPage}/>
                          <Route path={"/about"} component={About}/>
                          <Route path={"/game"} component={Game}/>
                          <Route path={"/maintenance"} component={Maintenance}/>
                        </div>
                      )
                    )}/>
                </Switch>
            </Router>
        );
    }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
