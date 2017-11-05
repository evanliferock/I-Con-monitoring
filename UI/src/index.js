
// https://reacttraining.com/react-router/web/guides/quick-start
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

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path={'/'} component={MainPage}></Route>
                    <Route path={'/login'} component={LoginApp}></Route>
                    <Route path={'/about'} component={About}></Route>
                    <Route path={'/maintenance'} component={Maintenance}></Route>
                    <Route path={'/game'} component={Game}></Route>
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
