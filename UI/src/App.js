import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

//contains theme and route , where the content render
class App extends Component {

  render() {
    return (
      <div className="App">
      <MuiThemeProvider>
      </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default App;
