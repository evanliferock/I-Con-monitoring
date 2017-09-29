
// https://reacttraining.com/react-router/web/guides/quick-start
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import About from './about';
import Game from './game';
import Maintenance from './maintenance';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path={'/'} component={Game}></Route>
                    <Route path={'/about'} component={About}></Route>
                    <Route path={'/maintenance'} component={Maintenance}></Route>
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
