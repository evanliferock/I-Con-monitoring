import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import dbapi from '../apirequests/dbapi';
import Alert from 'react-s-alert';
import { Redirect } from 'react-router';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      loggedIn: false,
    };
  }

  handleClick(event) {
    console.log("click");
    let loginObject = this;
    var payload = {
      "username": this.state.username,
      "password": this.state.password,
    }
    dbapi.post('login', payload)
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          console.log("Login successful");
          Alert.success("Login successful", {
               position: 'bottom',
               effect: 'slide',
               beep: false,
               timeout: 1000,
               offset: 50
           });
          localStorage.setItem('token', response.data.token);
          loginObject.setState({ loggedIn: true });
        }
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          if (error.response.status === 401) {
            console.log("Username password do not match");
            Alert.warning("Username and password do not match", {
              position: 'top-left',
              effect: 'slide',
              beep: false,
              timeout: 5000,
              offset: 50
            });
          } else {
            console.log(error);
          }
        } else {
          console.log("Error on db api end: " + error);
        }
      })
  }

  handleClickForget(event) {

  }

  render() {
    if (this.state.loggedIn) {
      return (<Redirect to={"/MainPage"} />);
    } else {
      return (
        <div>
          <TextField
            hintText="Enter your username"
            floatingLabelText="Username"
            style={{ width: '100%' }}
            floatingLabelStyle={{ color: '#FFF' }}
            inputStyle={{ color: '#FFF' }}
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />
          <br />
          <TextField
            type="password"
            style={{ width: '100%' }}
            floatingLabelStyle={{ color: '#FFF' }}
            hintText="Enter your Password"
            inputStyle={{ color: '#FFF' }}
            floatingLabelText="Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <br />
          <RaisedButton label="Login" primary={true} style={{ margin: "55px 0px", width: "100%" }} onClick={(event) => this.handleClick(event)} />

          <div className="col-md-12">
            <div className="pull-left" style={{ width: '50%' }} >
              <RaisedButton label="Forget?" primary={true} style={{ width: '100%' }} onClick={(event) => this.handleClickForget(event)} />
            </div>
          </div>
        </div>
      );
    }
  }
}


class LoginPage extends Component {
  render() {
    return (
      <div style={{ position: "fixed", width: "100%", backgroundColor: '#00BCD4' }}>
        <div style={{}}>
          <AppBar
            titleStyle={{ textAlign: "center" }}
            title="NIOSH I-Con-monitoring Login"
            showMenuIconButton={false}
          />
        </div>
        <div className="" style={{
          position: "fixed",
          padding: "0px", margin: "0px", height: "100%", width: "100%",
          background: 'url("https://www.parks.ca.gov/pages/499/images/img_5012.jpg") no-repeat center center fixed', backgroundSize: "cover"
        }}>
          <div className="col-md-4 loginscreen" style={{ position: "fixed", height: "100%", backgroundColor: '#00BCD4', padding: '20px', paddingBottom: '40px' }}>
            <div style={{ marginTop: '100px' }}>
              <Login />
            </div>
          </div>
        </div>
        <Alert stack={{ limit: 3 }} />
      </div>
    );

  }
}

export default LoginPage;
