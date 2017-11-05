
// https://reacttraining.com/react-router/web/guides/quick-start
import { Redirect } from 'react-router'
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import About from './about';
import Game from './game';
import Maintenance from './maintenance'
import LoginApp from './LoginApp'
import './index.css';

//use function for chceking local storage if token is logged in
function isLoggedIn() {
  console.log("token " + localStorage.getItem("token"));
  if (localStorage.getItem("token") == null)
    return false;
  return true;
}
class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path={'/'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <Game />
                      )
                    )}/>
                    <Route path={'/login'} component={LoginApp}></Route>
                    <Route path={'/about'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <About />
                      )
                    )}/>
                    <Route path={'/maintenance'} render={() => (
                      !isLoggedIn() ? (
                        <Redirect to="/login"/>
                      ) : (
                        <Maintenance />
                      )
                    )}/>
                </div>
            </Router>
        );
    }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
